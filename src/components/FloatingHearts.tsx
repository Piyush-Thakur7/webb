import { useEffect, useState } from 'react';
import { soundFX } from '../utils/audio';

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export const FloatingHearts = () => {
  const [particles, setParticles] = useState<SparkleParticle[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      soundFX.playSparkle();
      const emojis = ['💖', '✨', '🐼', '🌸', '🫓', '💕', '🍓'];
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      
      const newParticle: SparkleParticle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        emoji: randomEmoji,
      };

      setParticles((prev) => [...prev.slice(-15), newParticle]);

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 1200);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-40">
      {/* Background drifting ambient hearts */}
      <div className="absolute top-[10%] left-[8%] text-2xl animate-float opacity-30 select-none">🐼</div>
      <div className="absolute top-[25%] right-[12%] text-3xl animate-float-reverse opacity-40 select-none">💖</div>
      <div className="absolute top-[50%] left-[5%] text-2xl animate-float opacity-35 select-none">🌸</div>
      <div className="absolute top-[75%] right-[7%] text-2xl animate-float-reverse opacity-30 select-none">✨</div>
      <div className="absolute top-[85%] left-[15%] text-3xl animate-float opacity-40 select-none">💕</div>
      <div className="absolute top-[40%] right-[4%] text-2xl animate-float opacity-30 select-none">🫓</div>

      {/* Dynamic click sparkles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute text-2xl select-none animate-bounce"
          style={{
            left: `${p.x}px`,
            top: `${p.y - 20}px`,
            transition: 'all 1s cubic-bezier(0, 0, 0.2, 1)',
            transform: 'translate(-50%, -50%) scale(1.4)',
            opacity: 0,
            animation: 'float 1s ease-out forwards',
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
};
