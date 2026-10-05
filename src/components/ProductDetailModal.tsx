import React, { useState } from 'react';
import { X, Heart, ShoppingBag, MessageCircle, Check, Share2, ShieldCheck, Truck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsCheckoutOpen,
    showToast,
    products,
  } = useShop();

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  if (!selectedProduct) return null;

  const product = selectedProduct;
  const isSaved = isInWishlist(product.id);
  const activeColor = selectedColor || (product.colors && product.colors[0]?.name);
  const activeSize = selectedSize || (product.sizes && product.sizes[0]);

  // Exact WhatsApp order URL from prompt
  const whatsappOrderUrl = `https://wa.me/923264238154?text=${encodeURIComponent(
    `Hi FLORA LUXE, I would like to order ${product.name}.`
  )}`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, activeColor, activeSize);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.tagline,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied', 'Product link copied to clipboard');
    }
  };

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-[28px] max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#F1D6E2] relative">
        {/* Sticky Header with Close button */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#F1D6E2] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] tracking-[0.2em] uppercase font-bold text-[#E94F91]">
              FLORA LUXE · {product.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              aria-label="Share product"
              className="p-2 rounded-full text-[#806F77] hover:bg-[#FFF0F6] hover:text-[#E94F91] transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
              className={`p-2 rounded-full transition-colors ${
                isSaved ? 'text-[#E94F91]' : 'text-[#806F77] hover:text-[#E94F91]'
              }`}
            >
              <Heart className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={() => setSelectedProduct(null)}
              aria-label="Close modal"
              className="p-2 rounded-full text-[#806F77] hover:bg-[#FFF0F6] hover:text-[#241B20] transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Image Gallery & Zoom */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* Main Image with Zoom on Hover */}
              <div
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
                className="relative aspect-[4/5] w-full rounded-[24px] overflow-hidden bg-[#FFF0F6] border border-[#F1D6E2] cursor-crosshair select-none"
              >
                <img
                  src={product.images[selectedImgIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform duration-200"
                  style={{
                    transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                    transform: isZoomed ? 'scale(1.8)' : 'scale(1)',
                  }}
                  referrerPolicy="no-referrer"
                />

                <div className="absolute bottom-3 right-3 text-[10px] tracking-wider text-white bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full pointer-events-none">
                  Hover to zoom
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImgIndex(idx)}
                      className={`relative w-20 h-24 rounded-2xl overflow-hidden border-2 transition-all ${
                        selectedImgIndex === idx
                          ? 'border-[#E94F91] shadow-md'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${idx + 1}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Purchasing Module */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#E94F91] block mb-1">
                  {product.category}
                </span>

                <h1 className="text-2xl sm:text-3xl font-black text-[#241B20] tracking-tight">
                  {product.name}
                </h1>

                <p className="mt-1 text-xs text-[#806F77] font-medium">
                  {product.tagline}
                </p>

                {/* Price Display */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-3xl font-black text-[#241B20] tabular-nums">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#806F77] line-through tabular-nums font-semibold">
                      Rs. {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-xs text-[#059669] font-bold bg-[#ECFDF5] px-2.5 py-0.5 rounded-full">
                    Complimentary VIP Packaging
                  </span>
                </div>

                <div className="w-full h-[1px] bg-[#F1D6E2] my-6" />

                {/* Description */}
                <p className="text-sm text-[#806F77] font-medium leading-[1.6]">
                  {product.description}
                </p>

                {/* Color Selector */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mt-6">
                    <span className="text-xs tracking-wider uppercase font-bold text-[#241B20] block mb-2">
                      Tone / Finish: <span className="font-medium text-[#806F77]">{activeColor}</span>
                    </span>
                    <div className="flex items-center gap-3">
                      {product.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c.name)}
                          className={`p-1 rounded-full transition-all ${
                            activeColor === c.name
                              ? 'ring-2 ring-[#E94F91] ring-offset-2'
                              : 'hover:scale-105'
                          }`}
                        >
                          <span
                            className="w-6 h-6 rounded-full block border border-black/10 shadow-inner"
                            style={{ backgroundColor: c.hex }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mt-6">
                    <span className="text-xs tracking-wider uppercase font-bold text-[#241B20] block mb-2">
                      Dimension / Size:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`px-4 py-2 text-xs rounded-xl font-bold tracking-wide transition-all ${
                            activeSize === s
                              ? 'bg-[#241B20] text-white'
                              : 'bg-[#FFF0F6] text-[#241B20] hover:bg-[#FDE7F1] border border-[#F1D6E2]'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="mt-6 flex items-center gap-4">
                  <span className="text-xs tracking-wider uppercase font-bold text-[#241B20]">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-[#F1D6E2] rounded-full bg-[#FFF9FC] px-2 py-0.5">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-2.5 py-1 text-sm font-bold hover:text-[#E94F91]"
                    >
                      -
                    </button>
                    <span className="px-2.5 text-xs font-black tabular-nums text-[#241B20]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-2.5 py-1 text-sm font-bold hover:text-[#E94F91]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons with Elegant Pink Palette */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={() => addToCart(product, quantity, activeColor, activeSize)}
                  className="w-full py-4 rounded-full bg-[#E94F91] hover:bg-[#C93673] text-white text-xs font-bold tracking-[0.2em] uppercase shadow-[0_8px_25px_rgba(233,79,145,0.35)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Bag (Rs. ${(product.price * quantity).toLocaleString()})
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 rounded-full bg-[#241B20] hover:bg-black text-white text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300"
                >
                  Buy Now · Immediate Dispatch
                </button>

                {/* ORDER VIA WHATSAPP Button */}
                <a
                  href={whatsappOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#128C7E] text-xs font-bold tracking-[0.16em] uppercase transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                  ORDER VIA WHATSAPP
                </a>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 pt-6 border-t border-[#F1D6E2] grid grid-cols-2 gap-4 text-left">
                <div className="flex items-start gap-2 text-xs text-[#806F77] font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#E94F91] shrink-0 mt-0.5" />
                  <span>100% Authentic Handcrafted Quality</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-[#806F77] font-medium">
                  <Truck className="w-4 h-4 text-[#E94F91] shrink-0 mt-0.5" />
                  <span>Insured Global Tracked Delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* YOU MAY ALSO LIKE Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-14 pt-8 border-t border-[#F1D6E2]">
              <h2 className="text-xl font-black uppercase tracking-tight text-[#241B20] mb-6">
                YOU MAY ALSO LIKE
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      setSelectedProduct(rel);
                      setSelectedImgIndex(0);
                    }}
                    className="group cursor-pointer rounded-[24px] bg-white border border-[#F1D6E2] p-3.5 transition-all hover:shadow-lg"
                  >
                    <div className="relative aspect-[3/4] w-full rounded-[18px] overflow-hidden bg-[#FFF0F6] mb-3">
                      <img
                        src={rel.images[0]}
                        alt={rel.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-[#E94F91] font-bold block">
                      {rel.category}
                    </span>
                    <h3 className="text-sm font-bold text-[#241B20] line-clamp-1 mt-0.5 group-hover:text-[#E94F91] transition-colors">
                      {rel.name}
                    </h3>
                    <span className="text-sm font-black text-[#241B20] tabular-nums mt-1 block">
                      Rs. {rel.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
