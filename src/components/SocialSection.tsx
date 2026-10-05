import React, { useState } from 'react';
import { Heart, ExternalLink, Instagram } from 'lucide-react';
import { SOCIAL_POSTS } from '../data/products';
import { FloraLogo } from './FloraLogo';

const TikTokIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.33 6.33 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.8a8.28 8.28 0 0 0 4.77 1.48V7.83a4.85 4.85 0 0 1-1-.45z" />
  </svg>
);

export const SocialSection: React.FC = () => {
  const [activeModalPost, setActiveModalPost] = useState<typeof SOCIAL_POSTS[0] | null>(null);

  // Ensure exactly 9 posts for the 3x3 gallery
  const galleryPosts = SOCIAL_POSTS.slice(0, 9);

  return (
    <section className="py-24 bg-white relative border-t border-[#F1D6E2]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading & Subheading */}
        <span className="text-[12px] sm:text-[13px] font-bold tracking-[0.18em] uppercase text-[#E94F91] block mb-2">
          JOIN OUR WORLD
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#241B20] tracking-[-0.03em] uppercase mb-3">
          FOLLOW THE FLORA LIFESTYLE
        </h2>
        <p className="text-sm sm:text-base text-[#806F77] font-medium max-w-md mx-auto mb-10">
          Discover inspiration, new arrivals and everyday elegance.
        </p>

        {/* Buttons: FOLLOW ON INSTAGRAM and FOLLOW ON TIKTOK */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <a
            href="https://instagram.com/flora.luxe44"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#E94F91] hover:bg-[#C93673] text-white text-xs font-bold tracking-[0.16em] uppercase shadow-[0_8px_20px_rgba(233,79,145,0.35)] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Instagram className="w-4 h-4" />
            <span>FOLLOW ON INSTAGRAM</span>
            <ExternalLink className="w-3.5 h-3.5 text-white/80" />
          </a>

          <a
            href="https://www.tiktok.com/@flora.luxe44"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#241B20] hover:bg-black text-white text-xs font-bold tracking-[0.16em] uppercase shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <TikTokIcon className="w-4 h-4 text-white" />
            <span>FOLLOW ON TIKTOK</span>
            <ExternalLink className="w-3.5 h-3.5 text-white/80" />
          </a>
        </div>

        {/* 3x3 Social-Style Image Gallery (9 Images) with Rounded Corners */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {galleryPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setActiveModalPost(post)}
              className="group relative aspect-square rounded-[20px] overflow-hidden bg-[#FFF0F6] cursor-pointer border border-[#F1D6E2] shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                referrerPolicy="no-referrer"
              />

              {/* Hover: Image zoom, pink overlay, social icon appears */}
              <div className="absolute inset-0 bg-[#E94F91]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-white backdrop-blur-[2px]">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-2 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <Instagram className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold tabular-nums">
                  <Heart className="w-4 h-4 fill-white text-white" />
                  <span>{post.likes}</span>
                </div>
                <p className="text-[11px] text-white/95 line-clamp-2 mt-2 font-medium text-center leading-snug">
                  {post.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Post Modal */}
      {activeModalPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-[28px] overflow-hidden max-w-md w-full shadow-2xl border border-[#F1D6E2] relative">
            <div className="relative aspect-square w-full bg-[#FFF0F6]">
              <img
                src={activeModalPost.image}
                alt={activeModalPost.caption}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <FloraLogo variant="icon-only" imageClassName="w-8 h-8 rounded-full" />
                  <div>
                    <span className="text-xs font-bold text-[#241B20] block">
                      flora.luxe44
                    </span>
                    <span className="text-[10px] text-[#806F77] font-medium">FLORA LUXE</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-[#E94F91]">
                  <Heart className="w-4 h-4 fill-[#E94F91]" />
                  <span>{activeModalPost.likes}</span>
                </div>
              </div>
              <p className="text-xs text-[#241B20] leading-relaxed mb-6 font-medium">
                {activeModalPost.caption}
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com/flora.luxe44"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-full bg-[#E94F91] hover:bg-[#C93673] text-white text-xs font-bold tracking-wider uppercase text-center transition-colors shadow-sm"
                >
                  View on Instagram
                </a>
                <button
                  onClick={() => setActiveModalPost(null)}
                  className="px-6 py-3 rounded-full bg-white text-[#241B20] border border-[#F1D6E2] hover:bg-[#FFF0F6] text-xs font-bold tracking-wider uppercase transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
