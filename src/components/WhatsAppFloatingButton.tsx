import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappUrl = 'https://wa.me/923264238154?text=Hi%20FLORA%20LUXE,%20I%20would%20like%20to%20connect%20with%20your%20concierge.';

  return (
    <aside
      aria-label="WhatsApp Concierge"
      className="fixed bottom-20 md:bottom-8 right-6 z-40 flex items-center"
    >
      {/* Tooltip */}
      <div
        className={`absolute right-16 mr-3 transition-all duration-300 pointer-events-none whitespace-nowrap ${
          showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
      >
        <div className="bg-[#241B20] text-white text-[12px] font-bold tracking-wider px-4 py-2 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E94F91] animate-pulse" />
          <span>Chat with FLORA LUXE</span>
        </div>
      </div>

      {/* Button: White circular/squircle button, luxury pink outer glow, WhatsApp icon */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with FLORA LUXE on WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="group relative w-14 h-14 rounded-2xl bg-white border-2 border-[#F1D6E2] text-[#25D366] shadow-[0_0_30px_rgba(233,79,145,0.45)] hover:shadow-[0_0_40px_rgba(233,79,145,0.65)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
      >
        {/* Subtle Luxury Pink Ping */}
        <span className="absolute inset-0 rounded-2xl bg-[#E94F91] opacity-25 animate-ping group-hover:opacity-0 pointer-events-none" />

        {/* WhatsApp Icon */}
        <MessageCircle className="w-7 h-7 text-[#25D366] fill-[#25D366] transition-transform group-hover:rotate-6" />

        {/* Tiny Luxury Pink Badge */}
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#E94F91] rounded-full border-2 border-white" />
      </a>
    </aside>
  );
};
