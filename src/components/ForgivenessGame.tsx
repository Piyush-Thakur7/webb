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
    "Hey! That button is clearly broken! 😂",
    "Nice try! But you love Piyush too much! 💖",
    "You can't resist this boy! Click YES! 🥰",
    "Warning: Clicking NO causes extreme Chole Kulche shortage! 🫓",
    "Look at the big shiny YES button instead! 👉",
  ];

  const dodgeNoButton = () => {
    soundFX.playBoing();
    setNoCount((prev) => prev + 1);
    setTauntText(taunts[noCount % taunts.length]);

    // Random safe offsets within bounded area
    const randomX = (Math.random() - 0.5) * 260;
    const randomY = (Math.random() - 0.5) * 160;

    setNoButtonPosition({
      x: randomX,
      y: randomY,
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
    <section className="my-16 px-4 max-w-3xl mx-auto" ref={containerRef}>
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-pink-200 text-center relative overflow-hidden">
        {/* Floating background decorations */}
        <div className="absolute top-2 right-4 text-3xl opacity-20 select-none">🐼</div>
        <div className="absolute bottom-2 left-4 text-3xl opacity-20 select-none">💖</div>

        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>The Ultimate Question</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-black text-gray-800 mb-4 font-bubble">
          Will You Forgive Me, Matko? 🥺❤️
        </h2>

        <p className="text-base text-gray-600 max-w-md mx-auto mb-8 font-medium">
          Choose wisely! One button brings endless love and treats, the other seems to have a mind of its own...
        </p>

        {/* Playful Taunt Bubble */}
        {tauntText && !isForgiven && (
          <div className="mb-6 inline-block bg-rose-50 border border-rose-300 px-4 py-2 rounded-2xl shadow-sm text-sm font-handwriting text-rose-700 font-bold text-lg animate-bounce">
            "{tauntText}"
          </div>
        )}

        {/* Buttons Container */}
        {!isForgiven ? (
          <div className="relative min-h-[140px] flex items-center justify-center gap-6 flex-wrap">
            {/* YES Button (Expands slightly with each failed attempt) */}
            <button
              onClick={handleYesClick}
              style={{
                transform: `scale(${Math.min(1 + noCount * 0.08, 1.4)})`,
              }}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-lg md:text-xl rounded-2xl shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 flex items-center gap-2 cursor-pointer z-10 animate-pulse-slow"
            >
              <CheckCircle2 className="w-6 h-6" />
              <span>YES, I Forgive You! 🥰</span>
              <Heart className="w-6 h-6 fill-white" />
            </button>

            {/* Runaway NO Button */}
            <button
              onMouseEnter={dodgeNoButton}
              onTouchStart={dodgeNoButton}
              onClick={dodgeNoButton}
              style={
                noButtonPosition
                  ? {
                      transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                      transition: 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }
                  : {}
              }
              className="px-6 py-3.5 bg-gray-200 hover:bg-rose-100 text-gray-600 hover:text-rose-600 font-bold text-base rounded-2xl shadow transition-all duration-150 flex items-center gap-2 cursor-pointer select-none"
            >
              <XCircle className="w-5 h-5" />
              <span>No, Still Angy 😤</span>
            </button>
          </div>
        ) : (
          /* Forgiven Success State */
          <div className="py-6 animate-fadeIn">
            <div className="text-7xl mb-4 animate-bounce">🎉🐼💖</div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-emerald-600 font-bubble mb-2">
              YAYYY! BEST DAY EVER!
            </h3>
            <p className="text-gray-700 font-medium max-w-md mx-auto">
              You just made Piyush the happiest boy in the world! Your exclusive <strong>Matko VIP Love Coupons</strong> have now unlocked below! 👇
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
