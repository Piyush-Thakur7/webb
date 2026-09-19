import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Fade out indicator once user scrolls past 200px
      if (window.scrollY > 200) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed z-40 transition-all duration-500 select-none pointer-events-none sm:pointer-events-auto
        /* On mobile: centered above the bottom music player so they never collide */
        bottom-16 left-1/2 -translate-x-1/2 
        /* On desktop: anchored safely in bottom-left corner */
        sm:bottom-5 sm:left-5 sm:translate-x-0
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}
      `}
    >
      <div className="flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-white/95 backdrop-blur-md rounded-full shadow-lg border-2 border-pink-300 text-pink-700 animate-pulse-slow">
        <span className="text-sm sm:text-base animate-bounce">🐼</span>
        <span className="text-[11px] sm:text-xs font-extrabold tracking-wide font-bubble flex items-center gap-1 whitespace-nowrap">
          <span>Scroll down for more, Matko!</span>
          <ChevronDown className="w-3.5 h-3.5 text-pink-500 animate-bounce shrink-0" />
        </span>
      </div>
    </div>
  );
};
