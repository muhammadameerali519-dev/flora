import React, { useRef, useState } from 'react';
import { Sparkles, Award, Heart, Shield, Volume2, VolumeX, Play, Pause, ExternalLink, Instagram } from 'lucide-react';
import floraReelVideo from '../assets/videos/flora_reel_video.mp4';
import floraReelSecond from '../assets/videos/flora_reel_second.mp4';

export const AboutSection: React.FC = () => {
  // First video states (Reel 1: https://www.instagram.com/reel/Dd1TV6_S4VA/)
  const [isPlaying1, setIsPlaying1] = useState(true);
  const [isMuted1, setIsMuted1] = useState(true);
  const videoRef1 = useRef<HTMLVideoElement>(null);

  const togglePlay1 = () => {
    if (videoRef1.current) {
      if (isPlaying1) {
        videoRef1.current.pause();
        setIsPlaying1(false);
      } else {
        videoRef1.current.play();
        setIsPlaying1(true);
      }
    }
  };

  const toggleMute1 = () => {
    if (videoRef1.current) {
      videoRef1.current.muted = !isMuted1;
      setIsMuted1(!isMuted1);
    }
  };

  // Second video states (Reel 2: https://www.instagram.com/reel/DciXFSvImWV/)
  const [isPlaying2, setIsPlaying2] = useState(true);
  const [isMuted2, setIsMuted2] = useState(true);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  const togglePlay2 = () => {
    if (videoRef2.current) {
      if (isPlaying2) {
        videoRef2.current.pause();
        setIsPlaying2(false);
      } else {
        videoRef2.current.play();
        setIsPlaying2(true);
      }
    }
  };

  const toggleMute2 = () => {
    if (videoRef2.current) {
      videoRef2.current.muted = !isMuted2;
      setIsMuted2(!isMuted2);
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
          {/* Left Column: Two Official Instagram Reel Videos */}
          <div className="lg:col-span-5 flex flex-col items-center gap-6">
            {/* Reel Video 1 (Replaces the logo) */}
            <div className="w-full max-w-sm relative group">
              <div className="relative aspect-[9/15] sm:aspect-[9/16] w-full rounded-[30px] overflow-hidden shadow-2xl border-4 border-white bg-black ring-1 ring-[#F1D6E2]">
                <video
                  ref={videoRef1}
                  src={floraReelVideo}
                  autoPlay
                  loop
                  muted={isMuted1}
                  playsInline
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={togglePlay1}
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
                    title="Watch on Instagram"
                  >
                    <Instagram className="w-3 h-3" />
                    <span>Watch Reel</span>
                  </a>
                </div>

                {/* Bottom Video Controls Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={togglePlay1}
                      aria-label={isPlaying1 ? 'Pause video' : 'Play video'}
                      className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 transition-all hover:scale-105 shadow-md"
                    >
                      {isPlaying1 ? (
                        <Pause className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current" />
                      )}
                    </button>

                    <button
                      onClick={toggleMute1}
                      aria-label={isMuted1 ? 'Unmute sound' : 'Mute sound'}
                      className="px-3 py-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 transition-all hover:scale-105 shadow-md flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase"
                    >
                      {isMuted1 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span>{isMuted1 ? 'Muted' : 'Sound On'}</span>
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

            {/* Reel Video 2 (Replaces the jewelry image right beneath it) */}
            <div className="w-full max-w-sm relative group">
              <div className="relative aspect-[9/15] sm:aspect-[9/16] w-full rounded-[30px] overflow-hidden shadow-2xl border-4 border-white bg-black ring-1 ring-[#F1D6E2]">
                <video
                  ref={videoRef2}
                  src={floraReelSecond}
                  autoPlay
                  loop
                  muted={isMuted2}
                  playsInline
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={togglePlay2}
                />

                {/* Top Overlay Badge with Instagram link */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold tracking-[0.16em] uppercase text-white border border-white/20 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#E94F91] animate-pulse" />
                    JEWELRY EDIT
                  </span>

                  <a
                    href="https://www.instagram.com/reel/DciXFSvImWV/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto px-3 py-1 rounded-full bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] text-white text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-lg hover:scale-105 transition-transform"
                    title="Watch on Instagram"
                  >
                    <Instagram className="w-3 h-3" />
                    <span>Watch Reel</span>
                  </a>
                </div>

                {/* Bottom Video Controls Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={togglePlay2}
                      aria-label={isPlaying2 ? 'Pause video' : 'Play video'}
                      className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 transition-all hover:scale-105 shadow-md"
                    >
                      {isPlaying2 ? (
                        <Pause className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current" />
                      )}
                    </button>

                    <button
                      onClick={toggleMute2}
                      aria-label={isMuted2 ? 'Unmute sound' : 'Mute sound'}
                      className="px-3 py-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 transition-all hover:scale-105 shadow-md flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase"
                    >
                      {isMuted2 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span>{isMuted2 ? 'Muted' : 'Sound On'}</span>
                    </button>
                  </div>

                  <a
                    href="https://www.instagram.com/reel/DciXFSvImWV/"
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

            {/* CEO Noor Bajwa Quote Block */}
            <div className="p-6 sm:p-8 rounded-[24px] bg-white border border-[#F1D6E2] shadow-sm my-8">
              <p className="text-base sm:text-lg font-serif italic text-[#241B20] leading-relaxed mb-4">
                &ldquo;Every woman deserves pieces that mirror her innate grace and resilience. FLORA LUXE is our tribute to timeless style—soft yet powerful, modern yet enduring.&rdquo;
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-[#F1D6E2]">
                <div>
                  <h4 className="text-base font-black text-[#241B20] tracking-wider uppercase">
                    NOOR BAJWA
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
