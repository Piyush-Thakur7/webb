import type { FC } from 'react';
import { Heart, Sparkles, AlertCircle } from 'lucide-react';

interface HeroProps {
  angerLevel: number;
}

export const HeroSection: FC<HeroProps> = ({ angerLevel }) => {
  // Determine panda mood based on anger level
  const getPandaExpression = () => {
    if (angerLevel > 70) {
      return {
        face: '😤',
        status: 'CURRENT MOOD: Super Angy & Giving Silent Treatment!',
        subtext: '"Achha! Ab yaad aayi meri? Tum toh mujhe time hi nahi dete!"',
        bg: 'from-rose-500 to-pink-500',
        badge: 'Warning: 99% Chubby Rage',
      };
    } else if (angerLevel > 30) {
      return {
        face: '🥺',
        status: 'CURRENT MOOD: Softening up a bit...',
        subtext: '"Hmm... smell of Chole Kulche is weakening my anger defense..."',
        bg: 'from-amber-400 to-pink-500',
        badge: 'Status: Pout Deflating',
      };
    } else {
      return {
        face: '🥰',
        status: 'CURRENT MOOD: 100% Loved & Ready for Cuddles!',
        subtext: '"Okay fine silly Piyush... I forgive you, but you owe me infinite hugs!"',
        bg: 'from-emerald-400 to-teal-500',
        badge: 'Mission Accomplished: Sweet Matko is Smiling!',
      };
    }
  };

  const currentMood = getPandaExpression();

  return (
    <header className="relative pt-10 pb-8 px-4 text-center max-w-4xl mx-auto">
      {/* Top playful emergency badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-100 border border-rose-200 text-rose-700 text-[10px] sm:text-xs md:text-sm font-bold shadow-sm animate-pulse-slow mb-4 sm:mb-6 max-w-[95%]">
        <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
        <span className="truncate">CODE RED: MATKO IS SAD & ANGRY AT PIYUSH</span>
        <Sparkles className="w-3 h-3 text-pink-500 shrink-0" />
      </div>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-800 tracking-tight mb-3">
        Operation: Cheer Up{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 font-bubble">
          Matko 🐼
        </span>
      </h1>

      <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto mb-8 font-medium">
        Dedicated to the sweetest, chubbiest, and most precious girl in the entire universe. Made with 100% love, regret, and butter.
      </p>

      {/* Interactive Chubby Panda Avatar Card */}
      <div className="relative inline-block mx-auto">
        <div className="w-48 h-48 md:w-56 md:h-56 mx-auto rounded-full bg-gradient-to-b from-pink-100 to-rose-50 p-2 shadow-xl border-4 border-white flex items-center justify-center relative group">
          {/* Animated Panda Face */}
          <div className="text-7xl md:text-8xl select-none animate-float transition-transform duration-500">
            {currentMood.face}
          </div>

          {/* Floating heart badge */}
          <div className="absolute -bottom-2 -right-2 bg-pink-500 text-white p-2.5 rounded-full shadow-lg border-2 border-white animate-wiggle">
            <Heart className="w-5 h-5 fill-white" />
          </div>
        </div>

        {/* Cuteness status pill */}
        <div className="mt-4">
          <span className="inline-block px-4 py-1 bg-white rounded-full text-xs font-bold text-gray-700 shadow-md border border-pink-100">
            {currentMood.badge}
          </span>
        </div>
      </div>

      {/* Anger-O-Meter progress bar */}
      <div className="mt-8 max-w-md mx-auto bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-md border border-pink-100">
        <div className="flex justify-between items-center text-xs font-bold text-gray-600 mb-2">
          <span className="flex items-center gap-1">
            😤 Matko Anger Meter
          </span>
          <span className={angerLevel > 50 ? 'text-rose-600' : 'text-emerald-600'}>
            {angerLevel}%
          </span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden p-0.5 border border-gray-200">
          <div
            className={`h-full rounded-full transition-all duration-700 bg-gradient-to-r ${currentMood.bg}`}
            style={{ width: `${angerLevel}%` }}
          />
        </div>

        {/* Live quote */}
        <p className="mt-3 text-xs md:text-sm font-handwriting text-pink-700 font-bold tracking-wide">
          {currentMood.subtext}
        </p>
      </div>
    </header>
  );
};
