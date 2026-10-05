import React from 'react';
import { Sparkles, Diamond, Crown, HeartHandshake } from 'lucide-react';

export const WhyFloraLuxe: React.FC = () => {
  const features = [
    {
      number: '01',
      icon: Sparkles,
      title: 'CURATED WITH CARE',
      description: 'Thoughtfully selected pieces for your personal style.',
    },
    {
      number: '02',
      icon: Diamond,
      title: 'TIMELESS ELEGANCE',
      description: 'Designed around beauty that never goes out of style.',
    },
    {
      number: '03',
      icon: Crown,
      title: 'PREMIUM EXPERIENCE',
      description: 'Every interaction should feel as beautiful as the products.',
    },
    {
      number: '04',
      icon: HeartHandshake,
      title: 'MADE FOR YOU',
      description: 'Pieces created to complement your individuality.',
    },
  ];

  return (
    <section className="py-24 bg-[#FFF9FC] relative border-t border-[#F1D6E2]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[12px] sm:text-[13px] font-bold tracking-[0.18em] uppercase text-[#E94F91] block mb-2">
            THE MAISON DIFFERENCE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#241B20] tracking-[-0.03em] uppercase">
            WHY FLORA LUXE
          </h2>
          <div className="w-16 h-[2px] bg-[#E94F91] mx-auto mt-4 rounded-full" />
        </div>

        {/* 4 Elegant Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.number}
                className="group relative rounded-[28px] bg-white border border-[#F1D6E2] p-8 text-left transition-all duration-300 hover:shadow-[0_16px_40px_rgba(233,79,145,0.18)] hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  {/* Top row: Number and minimal line icon with pink accent */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-sm font-black tracking-widest text-[#E94F91] font-mono">
                      {feat.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#FFF0F6] border border-[#F1D6E2] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <Icon className="w-6 h-6 text-[#E94F91]" strokeWidth={1.8} />
                    </div>
                  </div>

                  <h3 className="text-base font-black tracking-[0.14em] uppercase text-[#241B20] mb-3">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#806F77] font-medium leading-[1.6]">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
