import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Attempt gentle autoplay on first user interaction anywhere on the screen
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Autoplay policy prevented immediate playback
        });
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isPlaying]);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Audio playback error:", err);
      });
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Hidden native audio element playing the actual song */}
      <audio
        ref={audioRef}
        src="./media/i_wanna_be_yours.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div 
        onClick={toggleMusic}
        className="flex items-center gap-3 px-4 py-2.5 bg-white/95 backdrop-blur-md rounded-full shadow-xl border-2 border-pink-200 cursor-pointer hover:scale-105 transition-all duration-300 group hover:shadow-pink-300/50"
      >
        <div className="relative">
          <Disc className={`w-7 h-7 text-pink-500 transition-all ${isPlaying ? 'animate-spin' : ''}`} />
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500"></span>
            </span>
          )}
        </div>

        <div className="flex flex-col text-left">
          <span className="text-xs font-extrabold text-pink-700 flex items-center gap-1 font-bubble">
            <Music className="w-3.5 h-3.5 text-pink-500" />
            I Wanna Be Yours 🎶
          </span>
          <span className="text-[10px] text-gray-500 font-medium">
            {isPlaying ? "♪ Playing for Matko... (Tap to Pause) ♪" : "Tap to Play Song ❤️"}
          </span>
        </div>

        <div className="p-1.5 rounded-full bg-pink-100 text-pink-600 group-hover:bg-pink-200 transition-colors">
          {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </div>
      </div>
    </div>
  );
};
