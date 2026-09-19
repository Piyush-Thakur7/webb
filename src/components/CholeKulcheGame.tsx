import { useState, type FC } from 'react';
import { Utensils, Heart, Sparkles, Award, Flame, Smile } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface CholeKulcheProps {
  angerLevel: number;
  setAngerLevel: React.Dispatch<React.SetStateAction<number>>;
}

export const CholeKulcheGame: FC<CholeKulcheProps> = ({ angerLevel, setAngerLevel }) => {
  const [bitesTaken, setBitesTaken] = useState(0);
  const [isMunching, setIsMunching] = useState(false);
  const [extraButter, setExtraButter] = useState(false);
  const [extraOnions, setExtraOnions] = useState(false);
  const [extraChutney, setExtraChutney] = useState(false);
  const [lastQuote, setLastQuote] = useState("Chole Kulche feast is served! Matko is eyeing the platter suspiciously...");

  const feedBite = () => {
    soundFX.playChomp();
    setIsMunching(true);
    setTimeout(() => setIsMunching(false), 600);

    const nextBites = bitesTaken + 1;
    setBitesTaken(nextBites);

    // Reduce anger
    setAngerLevel((prev) => Math.max(0, prev - 25));

    // Dynamic cute quotes
    const quotes = [
      "Mmm... buttery warm kulcha! Okay it's delicious, but I'm STILL mad at you! 😤",
      "Why did you bring extra pickled onions?! You know me too well... hmph! 🥺",
      "Alright, you're slightly forgiven, but you still argued earlier! 🫓",
      "My tummy is 100% full of Chole Kulche, I can't stay angry anymore. Come give me cuddles, Piyush! 🥰",
    ];
    setLastQuote(quotes[Math.min(nextBites - 1, quotes.length - 1)]);
  };

  const fullness = Math.min(100, bitesTaken * 25);

  return (
    <section className="my-16 px-4 max-w-5xl mx-auto w-full">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-2xl border-2 border-pink-200 relative overflow-hidden">
        {/* Top Header Ribbon */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 text-white px-6 py-2 rounded-full text-xs md:text-sm font-extrabold shadow-md uppercase tracking-wider">
            <Utensils className="w-4 h-4" />
            <span>Matko's Royal Chole Kulche Grand Feast</span>
            <Flame className="w-4 h-4 text-yellow-300 fill-yellow-300" />
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2 font-bubble">
            The Ultimate Peace Offering Platter 🫓🍲
          </h2>
          <p className="text-sm md:text-base text-gray-600 font-medium">
            A full-course, hot Amritsari Chole Kulche thali prepared exclusively to melt Matko's anger into pure happiness!
          </p>
        </div>

        {/* Grand 2-Column Feast Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
          {/* Left: The Lavish Indian Platter (7 cols) */}
          <div className="lg:col-span-7 bg-gradient-to-br from-amber-50/90 via-orange-50/70 to-pink-50/60 rounded-3xl p-6 border-2 border-dashed border-amber-300 relative shadow-inner">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold px-3 py-1 bg-amber-200 text-amber-900 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600" /> Special Order for Aishwarya
              </span>
              <span className="text-xs font-semibold text-gray-500">
                Fresh & Steaming ♨️
              </span>
            </div>

            {/* Visual Grand Platter Display */}
            <div className="relative bg-gradient-to-b from-stone-100 to-amber-100/50 rounded-full border-4 border-amber-300/80 p-8 shadow-xl mx-auto max-w-md aspect-square flex flex-col items-center justify-center">
              {/* Steaming Aroma indicators */}
              <div className="absolute top-4 left-1/4 animate-bounce text-2xl select-none">♨️</div>
              <div className="absolute top-2 right-1/4 animate-bounce text-xl select-none" style={{ animationDelay: '0.3s' }}>♨️</div>

              {/* Main Food Items Layout */}
              <div className={`relative w-full h-full flex flex-col items-center justify-center transition-transform duration-300 ${isMunching ? 'animate-chomp' : ''}`}>
                {/* Top: 2 Golden Kulchas */}
                <div className="flex items-center justify-center gap-3 relative z-10 mb-2">
                  <div className="relative group">
                    <div className="text-6xl md:text-7xl filter drop-shadow-md select-none transform -rotate-6">🫓</div>
                    {extraButter && (
                      <span className="absolute -top-1 -right-1 text-2xl animate-bounce">🧈</span>
                    )}
                  </div>
                  <div className="text-6xl md:text-7xl filter drop-shadow-md select-none transform rotate-12 -ml-6">🫓</div>
                </div>

                {/* Center: Handi of Spicy Punjabi Chole */}
                <div className="relative z-10">
                  <div className="text-6xl md:text-7xl filter drop-shadow-lg select-none animate-wiggle">🍲</div>
                  <div className="text-[11px] font-extrabold text-amber-900 bg-amber-200/90 px-2 py-0.5 rounded-full text-center mt-1 border border-amber-300">
                    Spicy Amritsari Chole
                  </div>
                </div>

                {/* Bottom Sides: Laccha Pyaz, Chutney, Green Chili */}
                <div className="flex items-center justify-center gap-4 mt-3 z-10">
                  <div className="text-center">
                    <span className="text-3xl filter drop-shadow select-none">🧅</span>
                    <p className="text-[10px] font-bold text-gray-600">Laccha Pyaz</p>
                  </div>
                  <div className="text-center">
                    <span className="text-3xl filter drop-shadow select-none">🍋</span>
                    <p className="text-[10px] font-bold text-gray-600">Lemon</p>
                  </div>
                  <div className="text-center">
                    <span className="text-3xl filter drop-shadow select-none">🌶️</span>
                    <p className="text-[10px] font-bold text-gray-600">Mirchi</p>
                  </div>
                  {extraChutney && (
                    <div className="text-center animate-fadeIn">
                      <span className="text-3xl filter drop-shadow select-none">🌿</span>
                      <p className="text-[10px] font-bold text-emerald-700">Chutney</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Munching Heart Blast */}
              {isMunching && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                  <span className="text-5xl animate-ping">💖</span>
                </div>
              )}
            </div>

            {/* Custom Interactive Toppings */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => { soundFX.playSparkle(); setExtraButter(!extraButter); }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer flex items-center gap-1 ${
                  extraButter ? 'bg-amber-400 text-amber-950 border-amber-500 shadow' : 'bg-white text-gray-700 border-amber-200 hover:bg-amber-50'
                }`}
              >
                <span>🧈 Extra Melting Butter</span>
              </button>

              <button
                onClick={() => { soundFX.playSparkle(); setExtraOnions(!extraOnions); }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer flex items-center gap-1 ${
                  extraOnions ? 'bg-rose-400 text-white border-rose-500 shadow' : 'bg-white text-gray-700 border-rose-200 hover:bg-rose-50'
                }`}
              >
                <span>🧅 Extra Spiced Onions</span>
              </button>

              <button
                onClick={() => { soundFX.playSparkle(); setExtraChutney(!extraChutney); }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer flex items-center gap-1 ${
                  extraChutney ? 'bg-emerald-400 text-emerald-950 border-emerald-500 shadow' : 'bg-white text-gray-700 border-emerald-200 hover:bg-emerald-50'
                }`}
              >
                <span>🌿 Spicy Green Chutney</span>
              </button>
            </div>
          </div>

          {/* Right: Matko's Live Reaction & Tummy Fullness (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full bg-pink-50/70 rounded-3xl p-6 border border-pink-200">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-pink-700 flex items-center gap-1">
                  <Smile className="w-3.5 h-3.5" /> Chubby Panda Satisfaction
                </span>
                <span className="text-xs font-extrabold text-pink-600 bg-white px-2.5 py-0.5 rounded-full border border-pink-200">
                  {fullness}% Full
                </span>
              </div>

              {/* Chubby Panda Reaction Avatar */}
              <div className="text-center my-4">
                <div className="w-28 h-28 mx-auto rounded-full bg-white shadow-lg border-2 border-pink-200 flex items-center justify-center text-6xl select-none animate-float">
                  {fullness >= 100 ? '🥰' : fullness >= 50 ? '😋' : '😤'}
                </div>
                <p className="mt-2 text-xs font-bold text-gray-700">
                  {fullness >= 100 ? 'Matko: Totally Stuffed & Happy Panda!' : fullness >= 50 ? 'Matko: Chewing with soft eyes...' : 'Matko: Pouting at Piyush'}
                </p>
              </div>

              {/* Tummy Fullness Progress Bar */}
              <div className="space-y-1 mb-4">
                <div className="flex justify-between text-[11px] font-bold text-gray-500">
                  <span>Hungry & Grumpy</span>
                  <span>Full & In Love</span>
                </div>
                <div className="w-full h-3.5 bg-gray-200 rounded-full overflow-hidden p-0.5 border border-pink-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 transition-all duration-500"
                    style={{ width: `${fullness}%` }}
                  />
                </div>
              </div>

              {/* Speech Bubble */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-pink-200 relative mb-6">
                <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-t border-l border-pink-200 transform rotate-45" />
                <p className="text-sm font-handwriting text-pink-800 font-bold text-base leading-snug">
                  "{lastQuote}"
                </p>
              </div>
            </div>

            {/* Action Feeding Button */}
            <div>
              {angerLevel > 0 ? (
                <button
                  onClick={feedBite}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-base md:text-lg rounded-2xl shadow-xl shadow-orange-500/30 transform active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-yellow-200" />
                  <span>Feed Matko A Bite ({4 - bitesTaken > 0 ? `${4 - bitesTaken} bites left` : 'Finished!'})</span>
                  <Heart className="w-5 h-5 fill-white" />
                </button>
              ) : (
                <div className="w-full py-4 bg-emerald-100 border-2 border-emerald-300 text-emerald-800 rounded-2xl font-extrabold text-center flex items-center justify-center gap-2">
                  <Award className="w-6 h-6 text-emerald-600" />
                  <span>Feast Complete! Matko's Anger is 0%! 🥳</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
