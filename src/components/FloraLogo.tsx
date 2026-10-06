import React, { useState } from 'react';
import officialLogoImg from '../assets/images/flora_official_logo.jpg';

interface FloraLogoProps {
  variant?: 'full' | 'horizontal' | 'compact' | 'icon-only' | 'badge';
  className?: string;
  imageClassName?: string;
  textClassName?: string;
  theme?: 'pink' | 'charcoal' | 'white';
}

export const FloraFlowerIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-8 h-8',
  color = 'currentColor',
}) => {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="FLORA Lotus Emblem"
    >
      <g stroke={color} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M100 28 C90 55 82 85 100 115 C118 85 110 55 100 28 Z" fill={color} fillOpacity="0.08" />
        <path d="M100 38 C97 60 97 88 100 112" strokeWidth="2" strokeOpacity="0.7" />
        <path d="M96 55 C92 70 94 90 98 105" strokeWidth="1.5" strokeOpacity="0.5" />
        <path d="M104 55 C108 70 106 90 102 105" strokeWidth="1.5" strokeOpacity="0.5" />

        <path d="M92 48 C72 62 62 88 88 116" />
        <path d="M85 64 C76 76 74 94 88 108" strokeWidth="1.6" strokeOpacity="0.6" />

        <path d="M108 48 C128 62 138 88 112 116" />
        <path d="M115 64 C124 76 126 94 112 108" strokeWidth="1.6" strokeOpacity="0.6" />

        <path d="M74 38 C55 58 52 82 80 112" />
        <path d="M70 52 C60 68 62 88 78 104" strokeWidth="1.6" strokeOpacity="0.6" />

        <path d="M126 38 C145 58 148 82 120 112" />
        <path d="M130 52 C140 68 138 88 122 104" strokeWidth="1.6" strokeOpacity="0.6" />

        <path d="M56 70 C48 84 52 100 82 115" />
        <path d="M54 78 C54 88 62 98 78 106" strokeWidth="1.4" strokeOpacity="0.5" />

        <path d="M144 70 C152 84 148 100 118 115" />
        <path d="M146 78 C146 88 138 98 122 106" strokeWidth="1.4" strokeOpacity="0.5" />

        <path d="M96 118 C78 116 64 125 72 142 C82 146 95 136 98 126 Z" fill={color} fillOpacity="0.08" />
        <path d="M74 132 C82 132 90 128 96 124" strokeWidth="1.6" strokeOpacity="0.6" />

        <path d="M104 118 C122 116 136 125 128 142 C118 146 105 136 102 126 Z" fill={color} fillOpacity="0.08" />
        <path d="M126 132 C118 132 110 128 104 124" strokeWidth="1.6" strokeOpacity="0.6" />

        <path d="M98 122 C99 135 97 148 100 162" strokeWidth="3" />
      </g>
    </svg>
  );
};

export const FloraLogo: React.FC<FloraLogoProps> = ({
  variant = 'horizontal',
  className = '',
  imageClassName = '',
  textClassName = '',
  theme = 'charcoal',
}) => {
  const [imgError, setImgError] = useState(false);

  // Full official framed logo mark (used in Welcome Experience / Intro Logo)
  if (variant === 'full') {
    return (
      <div
        className={`relative inline-flex flex-col items-center justify-center p-2.5 sm:p-3 bg-[#FFF3F6] border-2 border-[#D97995] rounded-3xl shadow-2xl overflow-hidden ${className}`}
      >
        <div className="border border-[#D97995] rounded-2xl p-2 sm:p-2.5 bg-white/60 flex flex-col items-center justify-center">
          {!imgError ? (
            <img
              src={officialLogoImg}
              alt="FLORA - bloom your beauty"
              onError={() => setImgError(true)}
              className="w-64 h-64 sm:w-80 sm:h-80 object-contain rounded-xl"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex flex-col items-center text-center p-8 w-64 sm:w-80">
              <FloraFlowerIcon className="w-24 h-24 mb-3" color="#B74D6C" />
              <span className="text-4xl font-serif font-black tracking-[0.2em] text-[#B74D6C] uppercase">
                FLORA
              </span>
              <div className="flex items-center gap-2 my-2.5 w-36 justify-center">
                <div className="h-[1px] bg-[#B74D6C]/50 flex-1" />
                <span className="text-xs text-[#B74D6C]">✤</span>
                <div className="h-[1px] bg-[#B74D6C]/50 flex-1" />
              </div>
              <span className="text-sm font-serif tracking-[0.24em] text-[#B74D6C] lowercase">
                bloom your beauty
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Icon only
  if (variant === 'icon-only') {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        {!imgError ? (
          <img
            src={officialLogoImg}
            alt="FLORA Emblem"
            onError={() => setImgError(true)}
            className={`object-cover rounded-full border border-[#fce7f3] ${imageClassName || 'w-10 h-10'}`}
            referrerPolicy="no-referrer"
          />
        ) : (
          <FloraFlowerIcon className={imageClassName || 'w-8 h-8'} color="#B75573" />
        )}
      </div>
    );
  }

  // Horizontal variant for Navbar & Footer
  return (
    <div className={`inline-flex items-center gap-3 sm:gap-3.5 ${className}`}>
      {/* Official Instagram Profile / Logo Mark */}
      <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full overflow-hidden border-2 border-[#F6BDCC] shadow-sm shrink-0 bg-[#FFF5F7] group-hover:scale-105 transition-transform duration-300">
        {!imgError ? (
          <img
            src={officialLogoImg}
            alt="FLORA Official Logo"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FloraFlowerIcon className="w-7 h-7" color="#B75573" />
          </div>
        )}
      </div>

      {/* Brand Bold Typography */}
      <div className="flex flex-col text-left">
        <div className="flex items-baseline gap-1.5">
          <span
            className={`text-xl sm:text-2xl lg:text-[26px] font-serif font-black tracking-[0.18em] uppercase leading-none ${
              theme === 'white' ? 'text-white' : 'text-[#121212]'
            } ${textClassName}`}
          >
            FLORA
          </span>
          <span className="text-[10px] sm:text-[11px] font-sans font-black tracking-[0.22em] uppercase text-[#B75573] leading-none">
            LUXE
          </span>
        </div>
        <span className="text-[9px] sm:text-[10px] font-serif tracking-[0.22em] text-[#B75573] font-bold lowercase leading-tight mt-1">
          bloom your beauty
        </span>
      </div>
    </div>
  );
};
