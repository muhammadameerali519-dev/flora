import React from 'react';
import { motion } from 'motion/react';

export const BrandStatement: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden border-y border-[#F1D6E2]/60">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FFF0F6] rounded-full blur-3xl opacity-70 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Small label: ABOUT FLORA LUXE */}
        <span className="text-[12px] sm:text-[13px] font-bold tracking-[0.18em] uppercase text-[#E94F91] block mb-4">
          ABOUT FLORA LUXE
        </span>

        {/* Heading: Beauty Lives In The Details */}
        <div className="relative inline-block mb-8">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#241B20] tracking-[-0.03em] leading-[1.05] uppercase">
            Beauty Lives{' '}
            <span className="font-serif font-normal italic lowercase text-[#E94F91] tracking-normal">
              in the details.
            </span>
          </h2>

          {/* Thin luxury pink underline animation sweeping scaleX(0) -> scaleX(1) */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-32 sm:w-48 h-[2.5px] bg-[#E94F91] mx-auto mt-4 origin-center rounded-full"
          />
        </div>

        {/* Paragraph */}
        <p className="text-lg sm:text-xl md:text-2xl text-[#806F77] font-medium leading-[1.6] max-w-3xl mx-auto">
          FLORA LUXE brings together modern femininity, timeless elegance and carefully curated pieces created to complement your individuality.
        </p>

        {/* Subtle trust markers */}
        <div className="mt-12 flex items-center justify-center gap-6 sm:gap-10 text-xs font-bold tracking-[0.18em] uppercase text-[#806F77]">
          <span>PARIS</span>
          <span className="text-[#F1D6E2]">·</span>
          <span>MILAN</span>
          <span className="text-[#F1D6E2]">·</span>
          <span>NEW YORK</span>
          <span className="text-[#F1D6E2]">·</span>
          <span>LONDON</span>
        </div>
      </div>
    </section>
  );
};
