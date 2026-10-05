import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { FloraLogo } from './FloraLogo';

interface WelcomeExperienceProps {
  onComplete: () => void;
  forceShow?: boolean;
}

export const WelcomeExperience: React.FC<WelcomeExperienceProps> = ({ onComplete, forceShow }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // If not forced and already seen in this session, skip quickly unless forceShow
    if (!forceShow && sessionStorage.getItem('flora_luxe_welcomed') === 'true') {
      setIsVisible(false);
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            handleDismiss();
          }, 350);
          return 100;
        }
        return prev + 4;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [forceShow]);

  const handleDismiss = () => {
    try {
      sessionStorage.setItem('flora_luxe_welcomed', 'true');
    } catch {
      // ignore
    }
    setIsVisible(false);
    setTimeout(onComplete, 500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#FFF5F7] via-[#FFF9FA] to-[#FFFFFF] overflow-hidden select-none"
        >
          {/* Subtle floating petals / light orbs background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/5 w-72 h-72 rounded-full bg-[#fce7f3]/50 blur-3xl" />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[#ffd6e4]/40 blur-3xl" />

            {/* Delicate animated petals */}
            {[...Array(9)].map((_, i) => (
              <span
                key={i}
                className="absolute text-[#B75573]/35 text-lg animate-float-petal-slow pointer-events-none select-none"
                style={{
                  top: `${15 + i * 9}%`,
                  left: `${10 + ((i * 11) % 80)}%`,
                  animationDelay: `${i * 0.4}s`,
                  fontSize: `${14 + (i % 3) * 6}px`,
                }}
              >
                ❀
              </span>
            ))}
          </div>

          {/* Central Logo Lockup matching the user's official framed logo */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <FloraLogo variant="full" className="shadow-2xl" />
            </motion.div>

            {/* Secondary tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-6 text-xs sm:text-sm tracking-[0.25em] uppercase text-[#737373] font-bold"
            >
              Elegance, Curated for You.
            </motion.p>

            {/* Progress indicator */}
            <div className="w-56 h-[2.5px] bg-[#f5d0dc] rounded-full mt-8 overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#F47C9E] via-[#B75573] to-[#8C3A53]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            {/* Quick Skip button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={handleDismiss}
              className="mt-8 inline-flex items-center gap-2 text-xs tracking-widest uppercase font-bold text-[#B75573] hover:text-[#121212] transition-colors py-2.5 px-6 rounded-full border border-[#fbcfe8] hover:border-[#B75573] bg-white/80 backdrop-blur-sm shadow-sm"
            >
              <span>Enter Maison</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
