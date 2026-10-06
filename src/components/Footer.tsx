import React from 'react';
import { Instagram, MessageCircle, Lock } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { FloraLogo } from './FloraLogo';

const TikTokIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.33 6.33 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.8a8.28 8.28 0 0 0 4.77 1.48V7.83a4.85 4.85 0 0 1-1-.45z" />
  </svg>
);

export const Footer: React.FC = () => {
  const { setActiveTab, setIsAdminOpen } = useShop();

  const handleNav = (tab: string, id: string) => {
    setActiveTab(tab);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#241B20] text-white pt-20 pb-12 relative overflow-hidden">
      {/* Subtle pink atmosphere in dark footer */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E94F91]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <FloraLogo variant="horizontal" theme="white" />
            <p className="text-sm font-serif italic text-[#F8C9DC] mt-2">
              &ldquo;Elegance, Curated for You.&rdquo;
            </p>
            <p className="text-xs text-[#806F77] font-medium max-w-sm leading-relaxed text-gray-300">
              An international luxury maison dedicated to celebrating feminine grace through fine jewelry, haute accessories, and curated beauty.
            </p>
            <div className="pt-2">
              <span className="text-[11px] tracking-wider uppercase text-[#E94F91] font-bold block">
                CEO & FOUNDER: NOOR BAJWA
              </span>
            </div>
          </div>

          {/* Column 1: SHOP */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black tracking-[0.2em] uppercase text-white mb-4">
              SHOP
            </h4>
            <div className="flex flex-col gap-2.5 text-xs text-gray-300">
              <button
                onClick={() => handleNav('collections', 'collections')}
                className="text-left hover:text-[#E94F91] transition-colors"
              >
                Collections
              </button>
              <button
                onClick={() => handleNav('new-arrivals', 'shop')}
                className="text-left hover:text-[#E94F91] transition-colors"
              >
                New Arrivals
              </button>
              <button
                onClick={() => handleNav('shop', 'shop')}
                className="text-left hover:text-[#E94F91] transition-colors"
              >
                Best Sellers
              </button>
              <button
                onClick={() => handleNav('collections', 'collections')}
                className="text-left hover:text-[#E94F91] transition-colors"
              >
                Accessories
              </button>
            </div>
          </div>

          {/* Column 2: COMPANY */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black tracking-[0.2em] uppercase text-white mb-4">
              COMPANY
            </h4>
            <div className="flex flex-col gap-2.5 text-xs text-gray-300">
              <button
                onClick={() => handleNav('about', 'about')}
                className="text-left hover:text-[#E94F91] transition-colors"
              >
                About
              </button>
              <button
                onClick={() => handleNav('contact', 'contact')}
                className="text-left hover:text-[#E94F91] transition-colors"
              >
                Contact
              </button>
              <button
                onClick={() => setIsAdminOpen(true)}
                className="text-left hover:text-[#E94F91] transition-colors flex items-center gap-1.5 text-[#F8C9DC]"
              >
                <Lock className="w-3 h-3" />
                <span>Admin Portal</span>
              </button>
              <span className="text-left text-gray-400 hover:text-white cursor-pointer">
                Privacy Policy
              </span>
              <span className="text-left text-gray-400 hover:text-white cursor-pointer">
                Terms & Conditions
              </span>
            </div>
          </div>

          {/* Column 3: FOLLOW */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-black tracking-[0.2em] uppercase text-white mb-4">
              FOLLOW
            </h4>
            <div className="flex flex-col gap-3 text-xs text-gray-300">
              <a
                href="https://instagram.com/flora.luxe44"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#E94F91] transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#E94F91]" />
                <span>Instagram</span>
              </a>

              <a
                href="https://www.tiktok.com/@flora.luxe44"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#E94F91] transition-colors"
              >
                <TikTokIcon className="w-4 h-4 text-white" />
                <span>TikTok</span>
              </a>

              <a
                href="https://wa.me/923264238154"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#25D366] font-bold hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: © 2026 FLORA LUXE. All Rights Reserved. */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 font-medium gap-4">
          <p>© 2026 FLORA LUXE. All Rights Reserved.</p>
          <p className="tracking-wide">
            Under the Creative Direction of CEO Noor Bajwa · International Luxury House
          </p>
        </div>
      </div>
    </footer>
  );
};
