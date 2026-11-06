import React from 'react';
import { FloraLogo } from './FloraLogo';
import { MessageCircle, Lock, ShieldAlert, Sparkles, ExternalLink, Instagram } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const StoreDisabledNotice: React.FC = () => {
  const { setIsAdminOpen } = useShop();

  const handleWhatsAppContact = () => {
    const text = encodeURIComponent(
      'Hello FLORA LUXE Concierge, I am visiting the website and would like to inquire about placing an order or private atelier booking.'
    );
    window.open(`https://wa.me/923264238154?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FFF9FC] flex flex-col justify-between items-center relative overflow-hidden px-4 py-8 sm:py-12 select-none">
      {/* Subtle Luxury Gradient Background & Delicate Petal Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#FDE7F1]/60 blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-[#F8C9DC]/40 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] rounded-full bg-[#FFF0F6] blur-2xl" />

        {/* Delicate floating background petals */}
        <div className="absolute top-16 left-[15%] w-3 h-5 rounded-full bg-[#D97995]/20 rotate-45 animate-float-petal" />
        <div className="absolute top-1/3 right-[18%] w-4 h-6 rounded-full bg-[#D97995]/25 -rotate-12 animate-float-petal" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-24 left-[22%] w-3 h-5 rounded-full bg-[#D97995]/15 rotate-12 animate-float-petal" style={{ animationDelay: '6s' }} />
      </div>

      {/* Top Discreet Bar: Status Tag & Admin Access */}
      <header className="w-full max-w-5xl flex items-center justify-between relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-[#F1D6E2] shadow-sm backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-montserrat-extrabold uppercase tracking-widest text-[#241B20]">
            System Notice
          </span>
        </div>

        {/* Discreet Staff & Owner Login Button */}
        <button
          onClick={() => setIsAdminOpen(true)}
          className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/70 hover:bg-white border border-[#F1D6E2] text-xs font-montserrat tracking-wider font-semibold text-[#806F77] hover:text-[#241B20] transition-all shadow-sm"
          title="Maison Staff & Owner Portal"
        >
          <Lock className="w-3.5 h-3.5 text-[#D97995] group-hover:scale-110 transition-transform" />
          <span>Maison Login</span>
        </button>
      </header>

      {/* Center Notice Card with Transparent Logo */}
      <main className="w-full max-w-2xl text-center relative z-10 my-auto py-6">
        <div className="relative p-6 sm:p-12 rounded-[32px] bg-white/85 backdrop-blur-md border border-[#F1D6E2] shadow-[0_20px_60px_-15px_rgba(217,121,149,0.18)]">
          {/* Transparent Logo Component */}
          <div className="flex justify-center mb-6">
            <FloraLogo
              variant="transparent"
              theme="pink"
              imageClassName="w-28 h-28 sm:w-36 sm:h-36 drop-shadow-md"
            />
          </div>

          {/* Requested Disabled Headline using Montserrat ExtraBold */}
          <div className="space-y-3 mt-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0F6] border border-[#F1D6E2] text-[#D97995] text-[11px] font-montserrat font-bold uppercase tracking-widest">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Temporary Maintenance & Private Catalog Curation</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-[42px] font-montserrat-extrabold text-[#241B20] uppercase tracking-wide leading-tight">
              THIS STORE HAS BEEN DISABLED
            </h2>

            <div className="w-16 h-1 bg-[#D97995] mx-auto rounded-full my-4" />

            <p className="text-xs sm:text-sm text-[#66545F] max-w-lg mx-auto leading-relaxed font-sans font-medium">
              The FLORA LUXE online ordering portal is currently paused by executive administration. All digital checkout operations are momentarily inactive while our atelier restocks exclusive pieces.
            </p>
          </div>

          {/* Direct Concierge Contact Options */}
          <div className="mt-8 pt-6 border-t border-[#F1D6E2] flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleWhatsAppContact}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-montserrat-extrabold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Contact Concierge (+92 326 4238154)</span>
            </button>

            <a
              href="https://instagram.com/flora.luxe44"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#FFF0F6] hover:bg-[#FDE7F1] border border-[#F1D6E2] text-[#241B20] text-xs sm:text-sm font-montserrat font-bold uppercase tracking-wider transition-all"
            >
              <Instagram className="w-4 h-4 text-[#D97995]" />
              <span>@flora.luxe44</span>
              <ExternalLink className="w-3 h-3 text-[#806F77]" />
            </a>
          </div>

          <div className="mt-6 text-[11px] text-[#806F77] font-medium">
            For bespoke orders, wholesale curation, or urgent inquiries, kindly reach our 24/7 WhatsApp concierge.
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="w-full max-w-5xl text-center relative z-10 pt-4">
        <p className="text-[11px] font-montserrat tracking-[0.18em] text-[#806F77] uppercase font-semibold">
          FLORA LUXE · Executive Maison · Founder & CEO Noor Bajwa
        </p>
        <p className="text-[10px] text-[#A898A1] mt-1 font-sans">
          © {new Date().getFullYear()} FLORA LUXE. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};
