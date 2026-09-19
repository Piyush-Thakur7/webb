import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25); // Default soft, soothing background volume (25%)
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasStartedRef = useRef(false);

  // Smooth fade-in function to make the music blend like a dream
  const fadeInAudio = (audio: HTMLAudioElement, targetVol = 0.25, duration = 2000) => {
    audio.volume = 0.02;
    audio.play().then(() => {
      setIsPlaying(true);
      const stepTime = 100;
      const stepCount = duration / stepTime;
      const volumeStep = (targetVol - 0.02) / stepCount;

      const fadeInterval = setInterval(() => {
        if (!audio || audio.paused) {
          clearInterval(fadeInterval);
          return;
        }
        if (audio.volume + volumeStep >= targetVol) {
          audio.volume = targetVol;
          clearInterval(fadeInterval);
        } else {
          audio.volume = Math.min(1, audio.volume + volumeStep);
        }
      }, stepTime);
    }).catch(() => {
      // Browser autoplay policy prevented start until explicit interaction
    });
  };

  useEffect(() => {
    // Start playback at low volume on ANY user gesture (scroll, touch, click, mouse movement)
    const triggerBackgroundMusic = () => {
      if (hasStartedRef.current || !audioRef.current) return;
      hasStartedRef.current = true;
      fadeInAudio(audioRef.current, volume);
    };

    const events = ['scroll', 'click', 'touchstart', 'wheel', 'keydown'];
    events.forEach((evt) => {
      window.addEventListener(evt, triggerBackgroundMusic, { once: true, passive: true });
    });

    return () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, triggerBackgroundMusic);
      });
    };
  }, [volume]);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = volume;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Audio playback error:", err);
      });
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Background audio element */}
      <audio
        ref={audioRef}
        src="./media/i_wanna_be_yours.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="flex items-center gap-3 px-4 py-2.5 bg-white/95 backdrop-blur-md rounded-full shadow-xl border-2 border-pink-200 transition-all duration-300 hover:shadow-pink-300/50">
        {/* Clickable Vinyl Disc toggle */}
        <button
          onClick={toggleMusic}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          className="relative cursor-pointer focus:outline-none flex items-center justify-center"
        >
          <Disc className={`w-7 h-7 text-pink-500 transition-transform ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500"></span>
            </span>
          )}
        </button>

        {/* Track info */}
        <div className="flex flex-col text-left select-none" onClick={toggleMusic}>
          <span className="text-xs font-extrabold text-pink-700 flex items-center gap-1 font-bubble cursor-pointer">
            <Music className="w-3.5 h-3.5 text-pink-500" />
            I Wanna Be Yours
          </span>
          <span className="text-[10px] text-gray-500 font-medium">
            {isPlaying ? "♪ Ambient background vibe ♪" : "Tap to Play Song ❤️"}
          </span>
        </div>

        {/* Soft Volume Slider */}
        <div className="flex items-center gap-1.5 pl-2 border-l border-pink-100">
          <button onClick={toggleMusic} className="text-pink-600 hover:text-pink-700 cursor-pointer">
            {isPlaying && volume > 0 ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isPlaying ? volume : 0}
            onChange={handleVolumeChange}
            aria-label="Volume slider"
            className="w-14 h-1.5 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-pink-500"
          />
        </div>
      </div>
    </div>
  );
};
