import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const MobileBottomNav: React.FC = () => {
  const { setActiveTab } = useShop();

  const handleShopNow = () => {
    setActiveTab('shop');
    const el = document.getElementById('shop');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Mobile shopping actions"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#F1D6E2] px-4 py-3 shadow-[0_-4px_20px_rgba(241,214,226,0.3)]"
    >
      <div className="flex items-center gap-3">
        {/* SHOP NOW Button */}
        <button
          onClick={handleShopNow}
          className="flex-1 py-3 px-4 rounded-full bg-[#E94F91] hover:bg-[#C93673] text-white text-xs font-black tracking-[0.16em] uppercase shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all"
        >
          <span>SHOP NOW</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {/* WHATSAPP Button */}
        <a
          href="https://wa.me/923264238154"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 px-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-black tracking-[0.16em] uppercase shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>WHATSAPP</span>
        </a>
      </div>
    </aside>
  );
};
