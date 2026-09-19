import { useState, type FC } from 'react';
import { Gift, Check, Sparkles, Heart, Utensils, MessageSquareHeart, Award, ShieldCheck } from 'lucide-react';
import { soundFX } from '../utils/audio';

export const LoveCoupons: FC = () => {
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
    soundFX.playSparkle();
    setClaimed((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="my-16 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
          <Gift className="w-3.5 h-3.5 text-emerald-500" />
          <span>Exclusive Perks for Aishwarya</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 font-bubble">
          Matko's VIP Forgiveness Coupons 🎟️✨
        </h2>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          These coupons never expire! Click to claim each one—they are legally binding in the court of Piyush & Matko.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coupons.map((c) => {
          const Icon = c.icon;
          const isClaimed = claimed[c.id];

          return (
            <div
              key={c.id}
              className="bg-white rounded-3xl p-6 shadow-xl border-2 border-dashed border-pink-200 relative overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col justify-between"
            >
              {/* Top Accent Gradient Bar */}
              <div className={`h-2.5 w-full bg-gradient-to-r ${c.color} absolute top-0 left-0`} />

              <div>
                <div className="flex justify-between items-start mb-3 pt-2">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${c.color} text-white shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                    {c.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2 font-bubble">
                  {c.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6 font-medium">
                  {c.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Guaranteed by Piyush
                </span>

                <button
                  onClick={() => handleClaim(c.id)}
                  disabled={isClaimed}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isClaimed
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                      : 'bg-pink-500 hover:bg-pink-600 text-white shadow hover:shadow-pink-300/50 transform active:scale-95'
                  }`}
                >
                  {isClaimed ? (
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
