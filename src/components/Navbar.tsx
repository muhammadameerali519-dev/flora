import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, Sparkles, ArrowRight, Lock } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { FloraLogo } from './FloraLogo';

interface NavbarProps {
  onReplayWelcome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onReplayWelcome }) => {
  const {
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    setIsSearchOpen,
    activeTab,
    setActiveTab,
    setIsAdminOpen,
    isAdminLoggedIn,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', tab: 'home', href: '#home' },
    { label: 'Shop', tab: 'shop', href: '#shop' },
    { label: 'Collections', tab: 'collections', href: '#collections' },
    { label: 'New Arrivals', tab: 'new-arrivals', href: '#new-arrivals' },
    { label: 'About', tab: 'about', href: '#about' },
    { label: 'Contact', tab: 'contact', href: '#contact' },
  ];

  const handleNavClick = (tab: string, href: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShopNow = () => {
    setActiveTab('shop');
    setMobileMenuOpen(false);
    const element = document.getElementById('shop');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all">
      {/* 6. TOP ANNOUNCEMENT BAR: Exact spec height: 40px, Luxury Rose Pink #E94F91, White text */}
      <div className="h-10 bg-[#E94F91] text-white flex items-center justify-center px-4 text-center text-xs tracking-[0.16em] uppercase font-bold shadow-sm">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-white/90 shrink-0" />
          <span>NEW COLLECTION · DISCOVER THE FLORA EDIT · DELIVERY EXCLUSIVELY ACROSS PAKISTAN</span>
        </div>
      </div>

      {/* 7. NAVBAR: White with slight transparency, glass effect, thin pink border, smooth shadow */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-[#F1D6E2] shadow-[0_4px_20px_rgba(241,214,226,0.25)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Left: FLORA LUXE Logo */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick('home', '#home')}
              className="group flex items-center focus-visible:outline-none"
              aria-label="FLORA LUXE Home"
            >
              <FloraLogo variant="horizontal" />
            </button>
          </div>

          {/* Center Navigation: Home, Shop, Collections, New Arrivals, About, Contact */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.tab, link.href)}
                className={`text-xs xl:text-[13px] tracking-[0.18em] uppercase transition-all relative py-1 focus-visible:outline-none whitespace-nowrap ${
                  activeTab === link.tab
                    ? 'text-[#E94F91] font-black'
                    : 'text-[#241B20] font-bold hover:text-[#E94F91]'
                }`}
              >
                {link.label}
                {activeTab === link.tab && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-[#E94F91] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Right: Search, Wishlist, Bag, and Luxury Pink Button "SHOP NOW" */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search collection"
              className="p-2.5 text-[#241B20] hover:text-[#E94F91] hover:bg-[#FDE7F1] rounded-full transition-all focus-visible:ring-2 focus-visible:ring-[#E94F91]"
            >
              <Search className="w-5 h-5 stroke-[2.2]" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              aria-label="View saved items"
              className="p-2.5 text-[#241B20] hover:text-[#E94F91] hover:bg-[#FDE7F1] rounded-full transition-all relative focus-visible:ring-2 focus-visible:ring-[#E94F91]"
            >
              <Heart className="w-5 h-5 stroke-[2.2]" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#E94F91] text-white text-[9px] font-black flex items-center justify-center rounded-full tabular-nums shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping bag"
              className="p-2.5 text-[#241B20] hover:text-[#E94F91] hover:bg-[#FDE7F1] rounded-full transition-all relative focus-visible:ring-2 focus-visible:ring-[#E94F91]"
            >
              <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#241B20] text-white text-[9px] font-black flex items-center justify-center rounded-full tabular-nums animate-pulse shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Portal Button */}
            <button
              onClick={() => setIsAdminOpen(true)}
              aria-label="Admin Portal"
              title="Admin Portal"
              className={`p-2.5 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-[#E94F91] relative ${
                isAdminLoggedIn
                  ? 'text-[#E94F91] bg-[#FFF0F6] border border-[#F1D6E2]'
                  : 'text-[#241B20] hover:text-[#E94F91] hover:bg-[#FDE7F1]'
              }`}
            >
              <Lock className="w-5 h-5 stroke-[2.2]" />
              {isAdminLoggedIn && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#059669] rounded-full ring-2 ring-white" />
              )}
            </button>

            {/* Luxury Pink Button: SHOP NOW */}
            <button
              onClick={handleShopNow}
              className="hidden sm:inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#E94F91] hover:bg-[#C93673] text-white text-xs font-bold tracking-[0.16em] uppercase shadow-[0_4px_16px_rgba(233,79,145,0.35)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>SHOP NOW</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              className="lg:hidden p-2 text-[#241B20] hover:text-[#E94F91] rounded-full transition-colors ml-1"
            >
              <Menu className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu with Soft Baby-Pink Background */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#FDE7F1] flex flex-col p-6 overflow-y-auto animate-in fade-in duration-200">
          {/* Top Bar inside Mobile Menu */}
          <div className="flex items-center justify-between pb-6 border-b border-[#F1D6E2]">
            <FloraLogo variant="horizontal" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close mobile menu"
              className="p-2.5 rounded-full bg-white text-[#241B20] hover:text-[#E94F91] shadow-sm"
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 py-8 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.tab, link.href)}
                className={`text-left text-2xl font-black uppercase tracking-[0.12em] py-2 transition-colors ${
                  activeTab === link.tab
                    ? 'text-[#E94F91] border-l-4 border-l-[#E94F91] pl-3'
                    : 'text-[#241B20] hover:text-[#E94F91]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Bottom Actions inside Mobile Menu */}
          <div className="pt-6 border-t border-[#F1D6E2] space-y-3">
            <button
              onClick={handleShopNow}
              className="w-full py-4 rounded-full bg-[#E94F91] text-white text-xs font-black tracking-[0.2em] uppercase shadow-lg flex items-center justify-center gap-2"
            >
              <span>SHOP NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/923264238154"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-full bg-white text-[#241B20] border border-[#F1D6E2] text-xs font-bold tracking-[0.18em] uppercase text-center block shadow-sm"
            >
              WhatsApp Concierge
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAdminOpen(true);
              }}
              className="w-full py-3.5 rounded-full bg-[#FFF0F6] text-[#E94F91] border border-[#F1D6E2] text-xs font-bold tracking-[0.18em] uppercase flex items-center justify-center gap-2 shadow-sm"
            >
              <Lock className="w-4 h-4" />
              <span>Admin Portal Login</span>
            </button>

            {onReplayWelcome && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onReplayWelcome();
                }}
                className="w-full text-center text-xs font-bold text-[#806F77] py-2 flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E94F91]" />
                <span>Replay Brand Welcome Experience</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
