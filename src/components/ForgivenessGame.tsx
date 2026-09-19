import { useState, useRef, type FC } from 'react';
import confetti from 'canvas-confetti';
import { Heart, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface ForgivenessGameProps {
  isForgiven: boolean;
  setIsForgiven: (val: boolean) => void;
  setAngerLevel: React.Dispatch<React.SetStateAction<number>>;
}

export const ForgivenessGame: FC<ForgivenessGameProps> = ({ isForgiven, setIsForgiven, setAngerLevel }) => {
  const [noButtonPosition, setNoButtonPosition] = useState<{ x: number; y: number } | null>(null);
  const [noCount, setNoCount] = useState(0);
  const [tauntText, setTauntText] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const taunts = [
    "Oops! Too slow, Matko! 😜",
    "Error 404: 'NO' not allowed! 🚫",
    "Hey! That button has legs! 😂",
    "Nice try! But you love Piyush too much! 💖",
    "You can't resist this boy! Click YES! 🥰",
    "Warning: Clicking NO causes Chole Kulche shortage! 🫓",
    "Look at the big shiny YES button instead! 👉",
    "Piyush is too cute to be rejected! 🐼",
    "Stop chasing the NO button silly! 🏃‍♀️💨",
  ];

  const dodgeNoButton = (e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Gentle mobile haptic feedback if supported
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(40);
      } catch {
        // ignore
      }
    }

    soundFX.playBoing();
    setNoCount((prev) => prev + 1);
    setTauntText(taunts[noCount % taunts.length]);

    // Responsive boundaries tailored for mobile and desktop screens
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const maxBoundX = isMobile ? 85 : 160;
    const maxBoundY = isMobile ? 70 : 120;

    // Pick a new spot that is noticeably different from the current spot
    const newX = (Math.random() - 0.5) * (maxBoundX * 2);
    const newY = (Math.random() - 0.5) * (maxBoundY * 2);

    setNoButtonPosition({
      x: Math.round(newX),
      y: Math.round(newY),
    });
  };

  const handleYesClick = () => {
    soundFX.playCelebration();
    setIsForgiven(true);
    setAngerLevel(0);

    // Full screen romantic confetti burst
    const end = Date.now() + 3.5 * 1000;
    const colors = ['#f43f5e', '#ec4899', '#fb7185', '#fda4af', '#fde047'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <section className="my-12 sm:my-16 px-3 sm:px-4 max-w-3xl mx-auto w-full" ref={containerRef}>
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl border-2 border-pink-200 text-center relative overflow-hidden">
        {/* Floating background decorations */}
        <div className="absolute top-2 right-4 text-2xl sm:text-3xl opacity-20 select-none">🐼</div>
        <div className="absolute bottom-2 left-4 text-2xl sm:text-3xl opacity-20 select-none">💖</div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>The Ultimate Question</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-gray-800 mb-2 font-bubble leading-tight">
          Will You Forgive Me, Matko? 🥺❤️
        </h2>

        <p className="font-handwriting text-2xl sm:text-3xl text-rose-600 font-bold mb-3">
          "I am truly, deeply sorry Matko... please look at your silly boy?" 🥺
        </p>

        <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-md mx-auto mb-6 sm:mb-8 font-medium">
          Choose wisely! One button brings endless love and treats, the other seems completely impossible to touch...
        </p>

        {/* Playful Taunt Bubble */}
        {tauntText && !isForgiven && (
          <div className="mb-4 sm:mb-6 inline-block bg-rose-50 border border-rose-300 px-4 py-2 rounded-2xl shadow-sm text-sm sm:text-base font-handwriting text-rose-700 font-bold animate-bounce max-w-xs sm:max-w-md">
            "{tauntText}"
          </div>
        )}

        {/* Buttons Container */}
        {!isForgiven ? (
          <div className="relative min-h-[160px] sm:min-h-[150px] flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 py-2">
            {/* YES Button (Expands slightly with each failed attempt) */}
            <button
              onClick={handleYesClick}
              style={{
                transform: `scale(${Math.min(1 + noCount * 0.07, 1.35)})`,
              }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-base sm:text-lg md:text-xl rounded-2xl shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-transform duration-300 flex items-center justify-center gap-2 cursor-pointer z-20 animate-pulse-slow active:scale-95"
            >
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
              <span>YES, I Forgive You! 🥰</span>
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-white shrink-0" />
            </button>

            {/* Runaway NO Button: Instant mobile touch and pointer evasion */}
            <div
              style={
                noButtonPosition
                  ? {
                      transform: `translate3d(${noButtonPosition.x}px, ${noButtonPosition.y}px, 0)`,
                      transition: 'transform 0.08s ease-out',
                    }
                  : {}
              }
              className="relative z-10 transition-transform touch-none select-none"
            >
              <button
                type="button"
                onMouseEnter={dodgeNoButton}
                onTouchStart={dodgeNoButton}
                onPointerDown={dodgeNoButton}
                onMouseDown={dodgeNoButton}
                onClick={dodgeNoButton}
                className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 bg-gray-200 active:bg-rose-200 text-gray-700 active:text-rose-700 font-bold text-sm sm:text-base rounded-2xl shadow transition-colors flex items-center justify-center gap-2 cursor-pointer select-none touch-manipulation"
              >
                <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                <span>No, Still Angy 😤</span>
              </button>
            </div>
          </div>
        ) : (
          /* Forgiven Success State */
          <div className="py-6 animate-fadeIn">
            <div className="text-6xl sm:text-7xl mb-4 animate-bounce">🎉🐼💖</div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-emerald-600 font-bubble mb-2">
              YAYYY! BEST DAY EVER!
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-700 font-medium max-w-md mx-auto">
              You just made Piyush the happiest boy in the world! Your exclusive <strong>Matko VIP Love Coupons</strong> have now unlocked below! 👇
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
