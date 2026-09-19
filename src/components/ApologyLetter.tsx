import { useState } from 'react';
import { Mail, MailOpen, Heart, Sparkles } from 'lucide-react';
import { soundFX } from '../utils/audio';

export const ApologyLetter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleLetter = () => {
    soundFX.playSparkle();
    setIsOpen(!isOpen);
  };

  return (
    <section className="my-12 px-4 max-w-3xl mx-auto">
      <div className="bg-gradient-to-br from-rose-50 via-white to-pink-50 rounded-3xl p-6 md:p-10 shadow-xl border-2 border-rose-200 relative overflow-hidden">
        {/* Header Ribbon */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
            From Piyush's Heart to Matko
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 font-bubble">
            A Sincere Letter: "Sorry Matko" 💌🥺
          </h2>
          <p className="text-sm text-gray-500">
            Click the envelope below to read what I should have told you earlier.
          </p>
        </div>

        {/* Envelope / Letter toggle */}
        <div className="text-center">
          <button
            onClick={toggleLetter}
            className="group relative inline-flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all transform active:scale-95 cursor-pointer"
          >
            {isOpen ? <MailOpen className="w-5 h-5" /> : <Mail className="w-5 h-5 animate-wiggle" />}
            <span>{isOpen ? 'Fold Letter Away' : 'Open: "I Am So Sorry Matko" 💌'}</span>
            <Sparkles className="w-4 h-4 text-pink-200" />
          </button>
        </div>

        {/* The Unfolded Heartfelt Letter */}
        {isOpen && (
          <div className="mt-8 bg-[#FFFDF9] border-2 border-amber-200/80 rounded-2xl p-6 md:p-8 shadow-inner relative animate-fadeIn transition-all duration-500">
            {/* Vintage paper texture decorations */}
            <div className="absolute top-3 left-4 text-xs font-handwriting text-gray-400">
              For: My Chubby Panda, Matko ❤️
            </div>
            <div className="absolute top-3 right-4 text-xs font-handwriting text-gray-400">
              Date: Today & Forever
            </div>

            <div className="mt-6 space-y-4 text-gray-700 leading-relaxed font-['Quicksand'] text-sm md:text-base text-left">
              <p className="font-bold text-rose-600 text-base md:text-lg">
                My sweetest Matko (Aishwarya),
              </p>

              <p>
                I am writing this because my heart genuinely hurts knowing that I made you feel sad, unloved, or ignored. 
              </p>

              <p>
                You told me that <strong>I don't give you enough time</strong>, that <strong>I'm always arguing with you</strong> instead of just listening, and that made you feel like I don't care. Looking back at how I acted, you are <strong>100% right</strong>, and I was being a complete idiot.
              </p>

              <p>
                When you got rude or gave me the silent treatment, I know it wasn't because you wanted to fight—it was because you were hurt. You wanted me to understand you, hold your hand, and simply listen, but instead my foolish ego started debating. That was so unfair to you.
              </p>

              <div className="p-4 bg-rose-50/80 rounded-xl border-l-4 border-rose-400 my-4">
                <p className="text-rose-800 font-medium italic text-sm">
                  "You are the most precious, adorable chubby panda in my world. No argument, no distraction, and no busy schedule is ever more important than your smile and your happiness."
                </p>
              </div>

              <p>
                I promise you from the bottom of my heart:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 font-medium text-gray-800">
                <li>I will listen to you with all my attention before speaking.</li>
                <li>I will dedicate real, uninterrupted time just for us.</li>
                <li>I will never let a silly argument make you doubt how deeply in love with you I am.</li>
              </ul>

              <p className="pt-2">
                I am so deeply sorry for making my favorite girl cry or frown. Please forgive your silly boy?
              </p>

              <div className="pt-4 border-t border-amber-200 flex justify-between items-center">
                <span className="font-handwriting text-xl text-rose-600 font-bold">
                  Yours always and forever, <br />Piyush
                </span>
                <span className="text-3xl">🐼❤️</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
