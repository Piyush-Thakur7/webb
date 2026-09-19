import { useState, type FC } from 'react';
import { Check, Sparkles, Heart, Utensils, MessageSquareHeart, Award, ShieldCheck, Lock, Unlock } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface LoveCouponsProps {
  isForgiven: boolean;
}

export const LoveCoupons: FC<LoveCouponsProps> = ({ isForgiven }) => {
  const [claimed, setClaimed] = useState<{ [key: number]: boolean }>({});

  const coupons = [
    {
      id: 1,
      title: 'Unlimited Chole Kulche Date',
      desc: 'Valid for a lavish Chole Kulche feast. Piyush pays the bill, brings extra onions, and offers zero complaints.',
      icon: Utensils,
      color: 'from-amber-400 to-orange-500',
      badge: 'Foodie VIP',
    },
    {
      id: 2,
      title: '100% Attentive Listening Pass',
      desc: 'Piyush will completely shut up, listen to every single word, hold your hand, and agree with everything you say.',
      icon: MessageSquareHeart,
      color: 'from-pink-400 to-rose-500',
      badge: 'Zero Arguments',
    },
    {
      id: 3,
      title: 'Giant Panda Bear Hug',
      desc: 'One extra tight, warm, squeezy bear hug redeemable whenever you feel tired, cold, or just need cuddles.',
      icon: Heart,
      color: 'from-purple-400 to-indigo-500',
      badge: 'Instant Warmth',
    },
    {
      id: 4,
      title: 'Matko is Always Right Card',
      desc: 'Use this card in any debate or disagreement to automatically win with 100% judicial authority. Non-negotiable.',
      icon: ShieldCheck,
      color: 'from-emerald-400 to-teal-500',
      badge: 'Supreme Power',
    },
  ];

  const handleClaim = (id: number) => {
    if (!isForgiven) {
      soundFX.playBoing();
      return;
    }
    soundFX.playSparkle();
    setClaimed((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="my-14 sm:my-16 px-4 max-w-5xl mx-auto w-full transition-all duration-500">
      <div className="text-center mb-10">
        {/* Top Status Pill */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-3 transition-all duration-500 shadow-sm"
          style={{
            backgroundColor: isForgiven ? '#d1fae5' : '#fee2e2',
            color: isForgiven ? '#065f46' : '#991b1b',
            border: `1px solid ${isForgiven ? '#6ee7b7' : '#fca5a5'}`,
          }}
        >
          {isForgiven ? (
            <>
              <Unlock className="w-4 h-4 text-emerald-600 animate-bounce" />
              <span>UNLOCKED: Ready to Claim, Matko! 🎉</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 text-rose-600 animate-wiggle" />
              <span>LOCKED: Requires Forgiveness First 🔒</span>
            </>
          )}
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 font-bubble">
          Matko's VIP Forgiveness Coupons 🎟️✨
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-lg mx-auto font-medium mt-1">
          {isForgiven ? (
            <span className="text-emerald-700 font-bold">
              Congratulations! All 4 lifetime coupons are unlocked! Tap below to claim each one.
            </span>
          ) : (
            <span className="text-rose-600 font-semibold">
              🔒 Locked! Click <strong className="underline">"YES, I Forgive You! 🥰"</strong> in the section above to unlock these rewards!
            </span>
          )}
        </p>
      </div>

      {/* Grid of Coupons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {coupons.map((c) => {
          const Icon = c.icon;
          const isClaimed = claimed[c.id];

          return (
            <div
              key={c.id}
              className={`bg-white rounded-3xl p-6 shadow-xl border-2 transition-all duration-500 relative overflow-hidden flex flex-col justify-between ${
                isForgiven
                  ? 'border-pink-200 hover:shadow-2xl hover:scale-[1.01]'
                  : 'border-gray-200 bg-gray-50/70 opacity-80'
              }`}
            >
              {/* Top Accent Gradient Bar */}
              <div className={`h-2.5 w-full bg-gradient-to-r ${isForgiven ? c.color : 'from-gray-300 to-gray-400'} absolute top-0 left-0`} />

              <div>
                <div className="flex justify-between items-start mb-3 pt-2">
                  <div className={`p-3 rounded-2xl shadow-md text-white ${
                    isForgiven ? `bg-gradient-to-br ${c.color}` : 'bg-gray-400'
                  }`}>
                    {isForgiven ? <Icon className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                  </div>
                  
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                    isForgiven ? 'bg-gray-100 text-gray-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {isForgiven ? c.badge : '🔒 Locked'}
                  </span>
                </div>

                <h3 className={`text-xl font-bold mb-2 font-bubble ${isForgiven ? 'text-gray-800' : 'text-gray-500'}`}>
                  {c.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-6 font-medium ${isForgiven ? 'text-gray-600' : 'text-gray-400'}`}>
                  {c.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Guaranteed by Piyush
                </span>

                <button
                  onClick={() => handleClaim(c.id)}
                  disabled={!isForgiven || isClaimed}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    !isForgiven
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : isClaimed
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-300 cursor-default'
                      : 'bg-pink-500 hover:bg-pink-600 text-white shadow hover:shadow-pink-300/50 transform active:scale-95 cursor-pointer'
                  }`}
                >
                  {!isForgiven ? (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Forgive to Unlock</span>
                    </>
                  ) : isClaimed ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>CLAIMED & ACTIVE</span>
                    </>
                  ) : (
                    <>
                      <Award className="w-3.5 h-3.5" />
                      <span>Claim Coupon</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
