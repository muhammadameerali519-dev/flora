import React, { useState } from 'react';
import { MessageCircle, Mail, Phone, Instagram, Send, CheckCircle2 } from 'lucide-react';
import { FloraLogo } from './FloraLogo';
import { useShop } from '../context/ShopContext';

const TikTokIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.33 6.33 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.8a8.28 8.28 0 0 0 4.77 1.48V7.83a4.85 4.85 0 0 1-1-.45z" />
  </svg>
);

export const ContactSection: React.FC = () => {
  const { addInquiry } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    addInquiry({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
    });
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const whatsappDirectUrl = `https://wa.me/923264238154?text=${encodeURIComponent(
    formData.name
      ? `Hello FLORA LUXE, my name is ${formData.name}. ${formData.message || 'I would like to inquire about your collections.'}`
      : 'Hello FLORA LUXE Concierge, I would like to inquire about your collections.'
  )}`;

  return (
    <section id="contact" className="py-24 bg-white relative border-t border-[#F1D6E2]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[12px] sm:text-[13px] font-bold tracking-[0.18em] uppercase text-[#E94F91] block mb-2">
            CONCIERGE & INQUIRIES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#241B20] tracking-[-0.03em] uppercase">
            LET'S CONNECT
          </h2>
          <div className="w-16 h-[2.5px] bg-[#E94F91] mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-sm text-[#806F77] font-medium">
            Our private client concierge is ready to assist with sizing, bespoke styling, or order guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Channels & WhatsApp Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* VIP WhatsApp Card */}
            <div className="p-8 rounded-[28px] bg-gradient-to-br from-[#FFF0F6] to-[#FDE7F1] border border-[#F1D6E2] shadow-sm relative overflow-hidden">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-white/60 text-[#25D366] text-[11px] tracking-wider uppercase font-bold mb-4 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  Instant Direct WhatsApp
                </div>

                <h3 className="text-2xl font-black text-[#241B20] tracking-tight mb-2">
                  Immediate Concierge
                </h3>

                <p className="text-xs sm:text-sm text-[#806F77] font-medium mb-6">
                  Chat directly with our styling advisors for immediate stock availability and bespoke orders.
                </p>

                <div className="text-base font-black text-[#241B20] tracking-wider mb-6 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#E94F91]" />
                  <span>+92 326 4238154</span>
                </div>

                <a
                  href="https://wa.me/923264238154?text=Hi%20FLORA%20LUXE,%20I%20would%20like%20to%20connect%20with%20your%20concierge."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 w-full py-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold tracking-[0.18em] uppercase shadow-[0_8px_25px_rgba(37,211,102,0.35)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>CHAT ON WHATSAPP</span>
                </a>
              </div>
            </div>

            {/* Official Channels Card */}
            <div className="p-8 rounded-[28px] bg-white border border-[#F1D6E2] shadow-sm space-y-5">
              <h4 className="text-xs font-black tracking-[0.2em] uppercase text-[#241B20] pb-3 border-b border-[#F1D6E2]">
                OFFICIAL CHANNELS
              </h4>

              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-[#806F77] font-medium flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-[#E94F91]" />
                  Instagram
                </span>
                <a
                  href="https://instagram.com/flora.luxe44"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#241B20] hover:text-[#E94F91] transition-colors"
                >
                  @flora.luxe44
                </a>
              </div>

              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-[#806F77] font-medium flex items-center gap-2">
                  <TikTokIcon className="w-4 h-4 text-[#241B20]" />
                  TikTok
                </span>
                <a
                  href="https://www.tiktok.com/@flora.luxe44"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#241B20] hover:text-[#E94F91] transition-colors"
                >
                  @flora.luxe44
                </a>
              </div>

              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-[#806F77] font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#E94F91]" />
                  Executive Office
                </span>
                <span className="font-bold text-[#241B20]">
                  CEO Noor Fatima Office
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-[28px] bg-white border border-[#F1D6E2] shadow-[0_10px_35px_rgba(241,214,226,0.3)]">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#FFF0F6] border border-[#F1D6E2] flex items-center justify-center mx-auto mb-4 text-[#E94F91]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-[#241B20] mb-2 uppercase tracking-wide">
                    Thank You, {formData.name || 'Valued Guest'}
                  </h3>
                  <p className="text-sm text-[#806F77] max-w-sm mx-auto mb-6">
                    Your inquiry has been relayed to our concierge team. We will review your message and reply promptly.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <a
                      href={whatsappDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 rounded-full bg-[#25D366] text-white text-xs font-bold tracking-wider uppercase inline-flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Forward to WhatsApp Now
                    </a>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', phone: '', email: '', message: '' });
                      }}
                      className="px-6 py-3.5 rounded-full bg-[#FFF0F6] text-[#E94F91] text-xs font-bold tracking-wider uppercase"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-black text-[#241B20] mb-1 uppercase tracking-tight">
                      Maison Inquiry
                    </h3>
                    <p className="text-xs text-[#806F77] font-medium">
                      Please provide your details below and our team will be in touch.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#241B20] mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sophia Montgomery"
                        className="w-full px-4 py-3.5 rounded-xl border border-[#F1D6E2] bg-[#FFF9FC] text-xs text-[#241B20] focus:outline-none focus:border-[#E94F91] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#241B20] mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+92 300 0000000"
                        className="w-full px-4 py-3.5 rounded-xl border border-[#F1D6E2] bg-[#FFF9FC] text-xs text-[#241B20] focus:outline-none focus:border-[#E94F91] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#241B20] mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sophia@example.com"
                      className="w-full px-4 py-3.5 rounded-xl border border-[#F1D6E2] bg-[#FFF9FC] text-xs text-[#241B20] focus:outline-none focus:border-[#E94F91] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#241B20] mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about the pieces you are interested in or bespoke requirements..."
                      className="w-full px-4 py-3.5 rounded-xl border border-[#F1D6E2] bg-[#FFF9FC] text-xs text-[#241B20] focus:outline-none focus:border-[#E94F91] transition-colors resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-4 rounded-full bg-[#E94F91] hover:bg-[#C93673] text-white text-xs font-bold tracking-[0.2em] uppercase shadow-[0_8px_20px_rgba(233,79,145,0.35)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>TRANSMITTING INQUIRY...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>SEND MESSAGE</span>
                        </>
                      )}
                    </button>

                    <a
                      href={whatsappDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-4 rounded-full bg-white text-[#241B20] border border-[#F1D6E2] hover:bg-[#FFF0F6] text-xs font-bold tracking-[0.16em] uppercase text-center transition-colors shadow-sm"
                    >
                      CHAT ON WHATSAPP
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
