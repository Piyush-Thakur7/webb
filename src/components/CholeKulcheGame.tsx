import { useState, type FC } from 'react';
import { Utensils, Heart, Sparkles, Award } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface CholeKulcheProps {
  angerLevel: number;
  setAngerLevel: React.Dispatch<React.SetStateAction<number>>;
}

export const CholeKulcheGame: FC<CholeKulcheProps> = ({ angerLevel, setAngerLevel }) => {
  const [bitesTaken, setBitesTaken] = useState(0);
  const [isMunching, setIsMunching] = useState(false);
  const [lastQuote, setLastQuote] = useState("Chole Kulche is ready! Matko is staring at the plate with angry curious eyes...");

  const feedBite = () => {
    soundFX.playChomp();
    setIsMunching(true);
    setTimeout(() => setIsMunching(false), 500);

    const nextBites = bitesTaken + 1;
    setBitesTaken(nextBites);

    // Reduce anger
    setAngerLevel((prev) => Math.max(0, prev - 25));

    // Dynamic cute quotes
    const quotes = [
      "Mmm... buttery kulche! Okay it's delicious, but I'm STILL mad at you! 😤",
      "Why did you bring extra pickled onions?! You know me too well... hmph! 🥺",
      "Alright, you're slightly forgiven, but you still argued earlier! 🫓",
      "My tummy is full of Chole Kulche and my heart is soft again. You win this round, Piyush! 🥰",
    ];
    setLastQuote(quotes[Math.min(nextBites - 1, quotes.length - 1)]);
  };

  return (
    <section className="my-12 px-4 max-w-3xl mx-auto">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border-2 border-pink-200 text-center relative overflow-hidden">
        {/* Cute Ribbon Tag */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-400 to-amber-500 text-white px-5 py-1 rounded-full text-xs md:text-sm font-bold shadow-md flex items-center gap-1.5">
          <Utensils className="w-4 h-4" />
          <span>Matko's Emergency Comfort Food Station</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mt-2 mb-2 font-bubble">
          The Chole Kulche Peace Offering 🫓🍲
        </h2>
        <p className="text-sm text-gray-600 max-w-lg mx-auto mb-6">
          Scientists prove that no chubby panda named Matko can stay mad after hot, buttery Chole Kulche. Feed her to lower her rage meter!
        </p>

        {/* The Food Display Plate */}
        <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto mb-6 bg-gradient-to-b from-amber-100 to-orange-50 rounded-full border-4 border-dashed border-amber-300 flex items-center justify-center p-4 shadow-inner">
          <div className={`text-6xl md:text-7xl transition-all ${isMunching ? 'animate-chomp' : 'animate-wiggle'}`}>
            {bitesTaken >= 4 ? '✨🐼✨' : '🫓🍲'}
          </div>

          {/* Steam / sparkles */}
          <div className="absolute top-2 right-6 animate-pulse text-xl">♨️</div>
          <div className="absolute top-4 left-6 animate-pulse text-lg">♨️</div>

          {isMunching && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-3xl animate-ping">💖</span>
            </div>
          )}
        </div>

        {/* Feeding status message */}
        <div className="bg-pink-50 border border-pink-200 rounded-2xl p-3 mb-6 max-w-md mx-auto">
          <p className="text-sm font-handwriting text-pink-800 font-bold text-lg">
            "{lastQuote}"
          </p>
        </div>

        {/* Action Button */}
        {angerLevel > 0 ? (
          <button
            onClick={feedBite}
            className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/30 transform active:scale-95 transition-all flex items-center gap-2 mx-auto cursor-pointer"
          >
            <Sparkles className="w-5 h-5" />
            <span>Feed Matko A Bite of Chole Kulche ({4 - bitesTaken > 0 ? `${4 - bitesTaken} bites left` : 'Finished!'})</span>
            <Heart className="w-5 h-5 fill-white" />
          </button>
        ) : (
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-2xl font-bold">
            <Award className="w-5 h-5 text-emerald-600" />
            <span>Anger Defeated! Matko's tummy is full and happy! 🥳</span>
          </div>
        )}
      </div>
    </section>
  );
};
