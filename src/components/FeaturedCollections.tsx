import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { COLLECTIONS } from '../data/products';
import { useShop } from '../context/ShopContext';

export const FeaturedCollections: React.FC = () => {
  const { navigateToShopCategory } = useShop();

  return (
    <section id="collections" className="py-24 bg-[#FFF9FC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[12px] sm:text-[13px] font-bold tracking-[0.18em] uppercase text-[#E94F91] block mb-2">
            CURATED CHAPTERS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#241B20] tracking-[-0.03em] uppercase">
            EXPLORE THE COLLECTION
          </h2>
          <div className="w-16 h-[2px] bg-[#E94F91] mx-auto mt-4 rounded-full" />
        </div>

        {/* 4 Collection Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {COLLECTIONS.map((col) => (
            <div
              key={col.id}
              onClick={() => navigateToShopCategory(col.category)}
              className="group relative rounded-[28px] overflow-hidden bg-white border border-[#F1D6E2] shadow-[0_10px_35px_rgba(241,214,226,0.4)] cursor-pointer transition-all duration-500 hover:shadow-[0_20px_50px_rgba(233,79,145,0.22)] hover:-translate-y-1.5"
            >
              {/* Image Container with Zoom */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FFF0F6]">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Gradient Scrim for Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300" />
                <div className="absolute inset-0 bg-[#E94F91]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-color" />
              </div>

              {/* Text & Action Overlay */}
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#FDE7F1] mb-1">
                  CATEGORY · {col.itemCount} PIECES
                </span>

                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase mb-2">
                  {col.title}
                </h3>

                <p className="text-xs sm:text-sm text-white/90 font-medium max-w-sm mb-6 leading-relaxed">
                  {col.tagline}
                </p>

                {/* EXPLORE Button that slides upward on hover */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase py-2.5 px-6 rounded-full bg-white text-[#241B20] hover:bg-[#E94F91] hover:text-white shadow-md transition-all duration-300 group-hover:-translate-y-1">
                    EXPLORE
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
