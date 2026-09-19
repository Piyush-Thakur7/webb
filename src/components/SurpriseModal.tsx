import { useState, type FC } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/audio';

interface SurpriseModalProps {
  onOpen: () => void;
}

export const SurpriseModal: FC<SurpriseModalProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenBox = () => {
    soundFX.playCelebration();
    setIsOpening(true);

    // Initial burst of sweet confetti
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#fda4af', '#fde047'],
    });

    onOpen();

    setTimeout(() => {
      setIsOpen(true);
    }, 600);
  };

  if (isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-b from-[#FFF0F4]/95 via-[#FFE4EC]/95 to-[#FFD8E4]/95 backdrop-blur-md transition-all duration-700 ${
        isOpening ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background ambient floating sparkles */}
      <div className="absolute top-10 left-10 text-3xl animate-float opacity-40 select-none">🐼</div>
      <div className="absolute top-16 right-12 text-3xl animate-float-reverse opacity-40 select-none">💖</div>
      <div className="absolute bottom-16 left-12 text-3xl animate-float opacity-40 select-none">🌸</div>
      <div className="absolute bottom-12 right-16 text-3xl animate-float-reverse opacity-40 select-none">✨</div>

      {/* Main Surprise Gift Box Card */}
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 sm:p-12 shadow-2xl border-4 border-pink-200 text-center max-w-md w-full relative overflow-hidden transform transition-all">
        {/* Top Tag */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>Special Delivery For Aishwarya</span>
        </div>

        {/* Animated Gift Box Emoji */}
        <div 
          onClick={handleOpenBox}
          className="relative w-36 h-36 mx-auto my-2 cursor-pointer group flex items-center justify-center select-none"
        >
          <div className="text-7xl sm:text-8xl filter drop-shadow-xl group-hover:scale-110 group-active:scale-95 transition-transform duration-300 animate-wiggle">
            🎁
          </div>
          <span className="absolute -top-2 -right-2 text-2xl animate-bounce">🐼</span>
          <span className="absolute -bottom-1 -left-2 text-2xl animate-ping">✨</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 font-bubble mb-2">
          A Surprise for Matko ❤️
        </h2>

        {/* Sweet message */}
        <p className="font-handwriting text-xl sm:text-2xl text-rose-600 font-bold mb-3">
          "I know you're angry at me, but please open this box first? 🥺"
        </p>

        <p className="text-xs sm:text-sm text-gray-500 mb-6 font-medium">
          Prepared with 100% love, Chole Kulche promises, and your favorite song.
        </p>

        {/* Open Button */}
        <button
          onClick={handleOpenBox}
          className="w-full py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold text-base sm:text-lg rounded-2xl shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 transform active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer animate-pulse-slow"
        >
          <span>🎁 Tap to Open Your Surprise ✨</span>
          <Heart className="w-5 h-5 fill-white" />
        </button>
      </div>
    </div>
  );
};
