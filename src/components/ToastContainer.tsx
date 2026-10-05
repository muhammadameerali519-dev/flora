import React from 'react';
import { Sparkles, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ToastContainer: React.FC = () => {
  const { toasts } = useShop();

  if (toasts.length === 0) return null;

  return (
    <aside aria-label="Notifications" className="fixed top-24 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-white/95 backdrop-blur-md border border-[#fce7f3] shadow-[0_10px_30px_rgba(244,124,158,0.25)] rounded-2xl p-4 flex items-start gap-3 animate-in slide-in-from-top-2 duration-300"
        >
          <div className="w-7 h-7 rounded-full bg-[#FFF0F5] border border-[#fce7f3] flex items-center justify-center text-[#C8728D] shrink-0 mt-0.5">
            <Check className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#121212]">
              {toast.message}
            </h4>
            {toast.subtext && (
              <p className="text-[11px] text-[#737373] mt-0.5 font-light truncate">
                {toast.subtext}
              </p>
            )}
          </div>
          <Sparkles className="w-3.5 h-3.5 text-[#F47C9E] shrink-0" />
        </div>
      ))}
    </aside>
  );
};
