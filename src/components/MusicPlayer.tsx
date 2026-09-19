import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isLoopingRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  // Gentle romantic chord progression reminiscent of soft indie romance ("I Wanna Be Yours" warm synth vibe)
  const playRomanticChords = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Chord progressions: Cm, Fm, G, Ab
      const chords = [
        [261.63, 311.13, 392.00], // C minor (C4, Eb4, G4)
        [349.23, 415.30, 523.25], // F minor (F4, Ab4, C5)
        [392.00, 493.88, 587.33], // G major (G4, B4, D5)
        [415.30, 523.25, 622.25], // Ab major (Ab4, C5, Eb5)
      ];

      let chordIndex = 0;

      const scheduleChord = () => {
        if (!isLoopingRef.current || !audioCtxRef.current) return;
        const currentChord = chords[chordIndex];
        const now = ctx.currentTime;

        currentChord.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          // Warm pad envelope
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(0.04, now + 0.8);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 2.9);
        });

        chordIndex = (chordIndex + 1) % chords.length;
        timerRef.current = window.setTimeout(scheduleChord, 2600);
      };

      scheduleChord();
    } catch {
      // AudioContext error
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      isLoopingRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend();
      }
      setIsPlaying(false);
    } else {
      isLoopingRef.current = true;
      playRomanticChords();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      isLoopingRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div 
        onClick={toggleMusic}
        className="flex items-center gap-3 px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-pink-200 cursor-pointer hover:scale-105 transition-all duration-300 group hover:shadow-pink-300/40"
      >
        <div className="relative">
          <Disc className={`w-6 h-6 text-pink-500 transition-all ${isPlaying ? 'animate-spin' : ''}`} />
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500"></span>
            </span>
          )}
        </div>

        <div className="flex flex-col text-left">
          <span className="text-xs font-bold text-pink-700 flex items-center gap-1">
            <Music className="w-3 h-3" />
            Matko's Romantic Lo-Fi
          </span>
          <span className="text-[10px] text-gray-500 font-medium">
            {isPlaying ? "♪ I Wanna Be Yours vibes ♪" : "Click to play song ❤️"}
          </span>
        </div>

        <div className="p-1 rounded-full bg-pink-100 text-pink-600 group-hover:bg-pink-200 transition-colors">
          {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </div>
      </div>
    </div>
  );
};
