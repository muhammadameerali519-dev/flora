/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShopProvider } from './context/ShopContext';
import { WelcomeExperience } from './components/WelcomeExperience';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandStatement } from './components/BrandStatement';
import { FeaturedCollections } from './components/FeaturedCollections';
import { BestsellersCarousel } from './components/BestsellersCarousel';
import { NewArrivalsGrid } from './components/NewArrivalsGrid';
import { LuxuryPromotion } from './components/LuxuryPromotion';
import { WhyFloraLuxe } from './components/WhyFloraLuxe';
import { SocialSection } from './components/SocialSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { CheckoutModal } from './components/CheckoutModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ToastContainer } from './components/ToastContainer';
import { AdminPortal } from './components/AdminPortal';

export default function App() {
  const [welcomeComplete, setWelcomeComplete] = useState(false);
  const [forceWelcome, setForceWelcome] = useState(false);

  const handleReplayWelcome = () => {
    setForceWelcome(true);
    setWelcomeComplete(false);
  };

  return (
    <ShopProvider>
      <div className="min-h-screen bg-white text-[#1a1a1a] flex flex-col font-sans selection:bg-[#fce7f3] selection:text-[#9f1239] pb-16 lg:pb-0">
        {/* Cinematic Welcome Experience */}
        {!welcomeComplete && (
          <WelcomeExperience
            onComplete={() => {
              setWelcomeComplete(true);
              setForceWelcome(false);
            }}
            forceShow={forceWelcome}
          />
        )}

        {/* Global Navigation */}
        <Navbar onReplayWelcome={handleReplayWelcome} />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 1. Hero Section */}
          <Hero />

          {/* 2. Brand Statement */}
          <BrandStatement />

          {/* 3. Featured Collections */}
          <FeaturedCollections />

          {/* 4. Bestsellers Carousel ("THE FLORA EDIT") */}
          <BestsellersCarousel />

          {/* 5. New Arrivals Grid with Smooth Filtering */}
          <NewArrivalsGrid />

          {/* 6. Luxury Promotion Banner */}
          <LuxuryPromotion />

          {/* 7. Why FLORA LUXE */}
          <WhyFloraLuxe />

          {/* 8. Social Media Section & Instagram Gallery */}
          <SocialSection />

          {/* 9. About FLORA LUXE (Heritage & CEO Noor Bajwa) */}
          <AboutSection />

          {/* 10. Contact Section & Direct WhatsApp Inquiries */}
          <ContactSection />
        </main>

        {/* Minimalist Luxury Footer */}
        <Footer />

        {/* Floating WhatsApp Button */}
        <WhatsAppFloatingButton />

        {/* Mobile iOS-style Bottom Navigation */}
        <MobileBottomNav />

        {/* Interactive Modals & Drawers */}
        <ProductDetailModal />
        <CartDrawer />
        <WishlistDrawer />
        <SearchModal />
        <CheckoutModal />
        <AdminPortal />

        {/* Toast Notification Container */}
        <ToastContainer />
      </div>
    </ShopProvider>
  );
}
