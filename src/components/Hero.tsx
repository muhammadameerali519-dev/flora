import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Volume2, VolumeX, Play, Pause, ExternalLink } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { FloraLogo } from './FloraLogo';
import floraReelVideo from '../assets/flora_reel_video.mp4';

export const Hero: React.FC = () => {
  const { setActiveTab } = useShop();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleShopCollection = () => {
    setActiveTab('shop');
    const el = document.getElementById('shop');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreNewArrivals = () => {
    setActiveTab('new-arrivals');
    const el = document.getElementById('shop');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#FFF9FC] py-12 lg:py-20">
      {/* Background ambient blush atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-12 left-10 w-96 h-96 rounded-full bg-[#FDE7F1]/70 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-[#F8C9DC]/40 blur-3xl" />

        {/* Subtle floating petals */}
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="absolute text-[#E94F91]/30 text-lg animate-float-petal select-none"
            style={{
              top: `${15 + i * 14}%`,
              left: `${8 + (i * 17) % 85}%`,
              animationDelay: `${i * 1.2}s`,
            }}
          >
            ❀
          </span>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Two-column layout on desktop; Mobile: Video first, text second */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Column 1: Editorial Content (Text on Left on Desktop, Second on Mobile) */}
          <div className="lg:col-span-6 order-2 lg:order-1 text-left">
            {/* Small label: Official Emblem Brand Pill */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/95 border border-[#FCD7E3] backdrop-blur-md mb-6 shadow-sm"
            >
              <FloraLogo variant="icon-only" imageClassName="w-6 h-6 rounded-full" />
              <span className="text-[11px] font-black tracking-[0.22em] uppercase text-[#E94F91]">
                FLORA · BLOOM YOUR BEAUTY
              </span>
            </motion.div>

            {/* Main Headline: "Elegance, Made Personal." */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 70, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-black text-[#241B20] tracking-[-0.04em] leading-[0.92] text-[48px] sm:text-[64px] lg:text-[76px] xl:text-[90px]"
              >
                <span>Elegance,</span>
                <br />
                <span className="font-serif font-normal italic text-[#E94F91] tracking-normal">
                  Made Personal.
                </span>
              </motion.h1>
            </div>

            {/* Subline */}
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mt-6 text-base sm:text-[17px] text-[#806F77] font-medium leading-[1.6] max-w-xl"
            >
              Discover beautifully curated pieces designed to bring softness, confidence and timeless elegance to every moment.
            </motion.p>

            {/* Primary & Secondary Buttons */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              {/* Primary button: SHOP COLLECTION */}
              <button
                onClick={handleShopCollection}
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full text-xs font-bold tracking-[0.18em] uppercase text-white bg-[#E94F91] hover:bg-[#C93673] shadow-[0_8px_25px_rgba(233,79,145,0.35)] hover:shadow-[0_12px_32px_rgba(233,79,145,0.45)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
              >
                <span className="absolute inset-0 w-1/2 h-full bg-white/25 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out" />
                <span className="relative flex items-center gap-2">
                  SHOP COLLECTION
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              {/* Secondary button: EXPLORE NEW ARRIVALS */}
              <button
                onClick={handleExploreNewArrivals}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-xs font-bold tracking-[0.18em] uppercase text-[#241B20] bg-white hover:bg-[#FFF0F6] border border-[#F1D6E2] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                EXPLORE NEW ARRIVALS
              </button>
            </motion.div>

            {/* Small Trust Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 pt-8 border-t border-[#F1D6E2] flex flex-wrap items-center gap-4 sm:gap-6 text-xs uppercase tracking-[0.12em] font-bold text-[#806F77]"
            >
              <span className="text-[#241B20]">DELIVERY ACROSS PAKISTAN</span>
              <span className="text-[#F1D6E2]">·</span>
              <span className="text-[#241B20]">PREMIUM BESPOKE PACKAGING</span>
              <span className="text-[#F1D6E2]">·</span>
              <span className="text-[#241B20]">MADE FOR YOU</span>
            </motion.div>
          </div>

          {/* Column 2: 9. HERO VIDEO CARD (First on Mobile, Right on Desktop) */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto max-w-lg lg:max-w-none"
            >
              {/* Subtle pink glow behind card */}
              <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-tr from-[#E94F91]/25 via-[#F8C9DC]/35 to-transparent blur-2xl pointer-events-none" />

              {/* Main Card with border-radius: 28px */}
              <div className="group relative rounded-[28px] overflow-hidden bg-black border border-[#F1D6E2] shadow-[0_20px_50px_rgba(241,214,226,0.5)] aspect-[4/5] w-full">
                {!hasError ? (
                  <video
                    ref={videoRef}
                    src={floraReelVideo}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    onError={() => setHasError(true)}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#FFF8FA] p-8 text-center">
                    <FloraLogo variant="full" />
                  </div>
                )}

                {/* Subtle soft gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

                {/* Top Left Floating White Glass Card: NEW ARRIVAL */}
                <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-white/60 shadow-md flex items-center gap-1.5 pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-[#E94F91] animate-pulse" />
                  <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#E94F91]">
                    NEW REEL
                  </span>
                </div>

                {/* Top Right Controls: Sound & Play/Pause */}
                <div className="absolute top-6 right-6 flex items-center gap-2 z-20">
                  {/* Sound Toggle Button */}
                  <button
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                    className="p-2.5 rounded-full bg-white/90 hover:bg-white text-[#241B20] hover:text-[#E94F91] backdrop-blur-md shadow-md transition-all active:scale-90"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  {/* Play / Pause Toggle Button */}
                  <button
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    className="p-2.5 rounded-full bg-white/90 hover:bg-white text-[#241B20] hover:text-[#E94F91] backdrop-blur-md shadow-md transition-all active:scale-90"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                </div>

                {/* Bottom Bar: Reel Title, View on Instagram Link & FLORA EDIT badge */}
                <div className="absolute bottom-6 inset-x-6 flex items-center justify-between z-20">
                  <a
                    href="https://www.instagram.com/reel/Dcc_yb5o07e/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 hover:bg-white text-[#241B20] hover:text-[#E94F91] text-[11px] font-bold tracking-[0.14em] uppercase backdrop-blur-md shadow-md transition-all active:scale-95"
                  >
                    <span>Watch on Instagram</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {/* Small floating white glass card: FLORA EDIT */}
                  <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-white/60 shadow-md">
                    <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#241B20]">
                      FLORA EDIT 2026
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
