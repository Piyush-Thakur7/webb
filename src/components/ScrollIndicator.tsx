import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Fade out indicator once user scrolls past 300px
      if (window.scrollY > 300) {
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
      className={`fixed bottom-3 left-3 sm:bottom-5 sm:left-5 z-40 transition-all duration-500 select-none ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg border-2 border-pink-200 text-pink-700 hover:shadow-pink-300/40">
        <span className="text-base sm:text-lg animate-bounce">🐼</span>
        <span className="text-[10px] sm:text-xs font-extrabold tracking-wide font-bubble flex items-center gap-1">
          <span>Scroll down for more, Matko!</span>
          <ChevronDown className="w-3.5 h-3.5 text-pink-500 animate-bounce shrink-0" />
        </span>
      </div>
    </div>
  );
};
