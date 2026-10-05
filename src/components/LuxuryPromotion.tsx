import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import pinterestImg from '../assets/images/your_style_moment_pinterest.jpg';

export const LuxuryPromotion: React.FC = () => {
  const { setActiveTab } = useShop();

  const handleShopCollection = () => {
    setActiveTab('shop');
    const el = document.getElementById('shop');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-r from-[#FDE7F1] via-[#FFF0F6] to-white border border-[#F1D6E2] shadow-[0_20px_50px_rgba(241,214,226,0.5)] p-8 sm:p-12 md:p-16 lg:p-20">
          {/* Subtle floating petals */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="absolute text-[#E94F91]/25 text-base animate-float-petal select-none"
                style={{
                  top: `${20 + i * 16}%`,
                  left: `${15 + (i * 20) % 70}%`,
                  animationDelay: `${i * 1.5}s`,
                }}
              >
                ❀
              </span>
            ))}
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Typography */}
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#F1D6E2] mb-6 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#E94F91]" />
                <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#E94F91]">
                  SEASONAL CAMPAIGN
                </span>
              </div>

              {/* Headline: Archivo 900 large typography */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#241B20] tracking-[-0.04em] leading-[0.94] uppercase">
                YOUR STYLE.<br />
                <span className="text-[#E94F91]">YOUR MOMENT.</span>
              </h2>

              {/* Description */}
              <p className="mt-6 text-base sm:text-lg md:text-xl text-[#806F77] font-medium leading-[1.6] max-w-lg">
                Because the smallest details can create the most unforgettable look.
              </p>

              {/* Button: SHOP THE COLLECTION */}
              <div className="mt-10">
                <button
                  onClick={handleShopCollection}
                  className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full text-xs font-bold tracking-[0.18em] uppercase text-white bg-[#E94F91] hover:bg-[#C93673] shadow-[0_8px_25px_rgba(233,79,145,0.35)] hover:shadow-[0_12px_32px_rgba(233,79,145,0.45)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
                >
                  <span className="absolute inset-0 w-1/2 h-full bg-white/25 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out" />
                  <span className="relative flex items-center gap-2">
                    SHOP THE COLLECTION
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>

            {/* Right Column: Hero Showcase with Requested Pinterest Image */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-[28px] overflow-hidden shadow-2xl border-4 border-white max-w-sm mx-auto group">
                <img
                  src={pinterestImg}
                  alt="FLORA LUXE — Your Style. Your Moment."
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#FDE7F1] block mb-1">
                    FLORA LUXE SIGNATURE
                  </span>
                  <span className="text-sm font-serif italic">
                    &ldquo;Elegance in every glance.&rdquo;
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
