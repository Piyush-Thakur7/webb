import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.22); // Soft, dreamy background volume
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);

  const startAudio = () => {
    if (startedRef.current || !audioRef.current) return;
    startedRef.current = true;
    
    audioRef.current.volume = volume;
    audioRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      // Browser strictly required interaction - keep listening
      startedRef.current = false;
    });
  };

  useEffect(() => {
    // 1. Try immediate autoplay on mount
    startAudio();

    // 2. Immediate trigger on literally any user interaction (touch, tap, scroll, click, swipe)
    const triggerEvents = ['touchstart', 'touchend', 'click', 'scroll', 'pointerdown', 'mousemove', 'wheel', 'keydown'];
    
    const handleGesture = () => {
      startAudio();
      triggerEvents.forEach((evt) => {
        window.removeEventListener(evt, handleGesture);
        document.removeEventListener(evt, handleGesture);
      });
    };

    triggerEvents.forEach((evt) => {
      window.addEventListener(evt, handleGesture, { passive: true });
      document.addEventListener(evt, handleGesture, { passive: true });
    });

    return () => {
      triggerEvents.forEach((evt) => {
        window.removeEventListener(evt, handleGesture);
        document.removeEventListener(evt, handleGesture);
      });
    };
  }, [volume]);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      startedRef.current = true;
      audioRef.current.volume = volume;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Audio play error:", err);
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
    <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-50 select-none">
      {/* Background audio element */}
      <audio
        ref={audioRef}
        src="./media/i_wanna_be_yours.mp3"
        loop
        preload="auto"
        autoPlay
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2.5 bg-white/95 backdrop-blur-md rounded-full shadow-lg border-2 border-pink-200 transition-all duration-300 hover:shadow-pink-300/50">
        {/* Clickable Vinyl Disc toggle */}
        <button
          onClick={toggleMusic}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          className="relative cursor-pointer focus:outline-none flex items-center justify-center shrink-0"
        >
          <Disc 
            className={`w-6 h-6 sm:w-7 sm:h-7 text-pink-500 transition-transform ${isPlaying ? 'animate-spin' : ''}`} 
            style={{ animationDuration: '6s' }} 
          />
          {isPlaying && (
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
            </span>
          )}
        </button>

        {/* Track info */}
        <div className="flex flex-col text-left cursor-pointer max-w-[130px] sm:max-w-none" onClick={toggleMusic}>
          <span className="text-[11px] sm:text-xs font-extrabold text-pink-700 flex items-center gap-1 font-bubble truncate">
            <Music className="w-3 h-3 text-pink-500 shrink-0" />
            I Wanna Be Yours
          </span>
          <span className="text-[9px] sm:text-[10px] text-gray-500 font-medium truncate">
            {isPlaying ? "♪ Soft background vibe ♪" : "Tap to Play ❤️"}
          </span>
        </div>

        {/* Volume Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 pl-1.5 sm:pl-2 border-l border-pink-100">
          <button onClick={toggleMusic} className="text-pink-600 hover:text-pink-700 cursor-pointer p-0.5">
            {isPlaying && volume > 0 ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isPlaying ? volume : 0}
            onChange={handleVolumeChange}
            aria-label="Volume slider"
            className="w-10 sm:w-14 h-1 sm:h-1.5 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-pink-500"
          />
        </div>
      </div>
    </div>
  );
};
