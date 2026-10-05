import React, { useRef, useState } from 'react';
import { Sparkles, Award, Heart, Shield, Volume2, VolumeX, Play, Pause, ExternalLink, Instagram } from 'lucide-react';
import { jewelryImg } from '../data/products';
import floraReelVideo from '../assets/videos/flora_reel_video.mp4';

export const AboutSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
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

  return (
    <section id="about" className="py-24 bg-[#FFF9FC] relative border-t border-[#F1D6E2]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: THE WORLD OF FLORA LUXE */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[12px] sm:text-[13px] font-bold tracking-[0.18em] uppercase text-[#E94F91] block mb-2">
            MAISON HERITAGE & VISION
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#241B20] tracking-[-0.03em] uppercase leading-tight">
            THE WORLD OF<br />
            <span className="text-[#E94F91]">FLORA LUXE</span>
          </h2>
          <div className="w-16 h-[2.5px] bg-[#E94F91] mx-auto mt-4 rounded-full" />
        </div>

        {/* Editorial Story Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Official Instagram Reel Video & Fine Jewelry Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Instagram Reel Video Player (Replaces the logo as requested) */}
            <div className="w-full max-w-sm mb-6 relative group">
              <div className="relative aspect-[9/15] sm:aspect-[9/16] w-full rounded-[30px] overflow-hidden shadow-2xl border-4 border-white bg-black ring-1 ring-[#F1D6E2]">
                <video
                  ref={videoRef}
                  src={floraReelVideo}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={togglePlay}
                />

                {/* Top Overlay Badge with Instagram link */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold tracking-[0.16em] uppercase text-white border border-white/20 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#E94F91] animate-pulse" />
                    MAISON REEL
                  </span>

                  <a
                    href="https://www.instagram.com/reel/Dd1TV6_S4VA/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto px-3 py-1 rounded-full bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] text-white text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-lg hover:scale-105 transition-transform"
                    title="Watch original reel on Instagram"
                  >
                    <Instagram className="w-3 h-3" />
                    <span>Watch Reel</span>
                  </a>
                </div>

                {/* Bottom Video Controls Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={togglePlay}
                      aria-label={isPlaying ? 'Pause video' : 'Play video'}
                      className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 transition-all hover:scale-105 shadow-md"
                    >
                      {isPlaying ? (
                        <Pause className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current" />
                      )}
                    </button>

                    <button
                      onClick={toggleMute}
                      aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
                      className="px-3 py-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 transition-all hover:scale-105 shadow-md flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span>{isMuted ? 'Muted' : 'Sound On'}</span>
                    </button>
                  </div>

                  <a
                    href="https://www.instagram.com/reel/Dd1TV6_S4VA/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white transition-all border border-white/10"
                    title="Open on Instagram"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Fine Craftsmanship Showcase Card */}
            <div className="relative aspect-[4/3] w-full max-w-sm rounded-[28px] overflow-hidden shadow-xl border-4 border-white">
              <img
                src={jewelryImg}
                alt="FLORA LUXE Fine Craftsmanship"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#FDE7F1] block mb-0.5">
                  FLORA LUXE ATELIER
                </span>
                <span className="text-sm font-serif italic">
                  &ldquo;A dedication to feminine poise and enduring luxury.&rdquo;
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: OUR PHILOSOPHY & Narrative */}
          <div className="lg:col-span-7 space-y-6 text-[#241B20] leading-relaxed">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0F6] border border-[#F1D6E2] text-[#E94F91] text-xs tracking-[0.16em] uppercase font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              OUR PHILOSOPHY
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-[#241B20] tracking-tight leading-snug">
              Celebrating Femininity, Confidence & Self-Expression
            </h3>

            <p className="text-base text-[#806F77] font-medium leading-[1.6]">
              FLORA LUXE was born from a desire to bring together modern femininity, timeless elegance, and carefully curated pieces created to complement your individuality. We envision luxury not as ostentation, but as soft confidence, exquisite tactile beauty, and everyday grace.
            </p>

            <p className="text-base text-[#806F77] font-medium leading-[1.6]">
              Each piece—from our hand-finished fine jewelry set in warm rose gold to Italian calfskin accessories and botanical beauty elixirs—is chosen to honor personal self-expression. We blend traditional craftsmanship with contemporary, wearable silhouettes that feel effortless from day to evening.
            </p>

            {/* CEO Emaan Fatima Quote Block */}
            <div className="p-6 sm:p-8 rounded-[24px] bg-white border border-[#F1D6E2] shadow-sm my-8">
              <p className="text-base sm:text-lg font-serif italic text-[#241B20] leading-relaxed mb-4">
                &ldquo;Every woman deserves pieces that mirror her innate grace and resilience. FLORA LUXE is our tribute to timeless style—soft yet powerful, modern yet enduring.&rdquo;
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-[#F1D6E2]">
                <div>
                  <h4 className="text-base font-black text-[#241B20] tracking-wider uppercase">
                    EMAAN FATIMA
                  </h4>
                  <span className="text-xs tracking-[0.16em] uppercase text-[#E94F91] font-bold block">
                    FOUNDER & CHIEF EXECUTIVE OFFICER
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] tracking-[0.14em] uppercase text-[#806F77] font-semibold block">
                    FLORA LUXE MAISON
                  </span>
                </div>
              </div>
            </div>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-left">
              <div className="p-4 rounded-2xl bg-white border border-[#F1D6E2]">
                <Heart className="w-5 h-5 text-[#E94F91] mb-2" />
                <span className="block text-xs font-black uppercase tracking-wider text-[#241B20] mb-1">
                  Confidence
                </span>
                <span className="text-xs text-[#806F77] leading-snug block">
                  Pieces crafted to inspire self-assurance and grace.
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#F1D6E2]">
                <Award className="w-5 h-5 text-[#E94F91] mb-2" />
                <span className="block text-xs font-black uppercase tracking-wider text-[#241B20] mb-1">
                  Quality
                </span>
                <span className="text-xs text-[#806F77] leading-snug block">
                  Authentic materials, delicate finishes, and enduring value.
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#F1D6E2]">
                <Shield className="w-5 h-5 text-[#E94F91] mb-2" />
                <span className="block text-xs font-black uppercase tracking-wider text-[#241B20] mb-1">
                  Modern Luxury
                </span>
                <span className="text-xs text-[#806F77] leading-snug block">
                  Soft baby-pink palettes, refined detail, and bespoke care.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
