import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag, Eye } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';

export const BestsellersCarousel: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { products, addToCart, toggleWishlist, isInWishlist, setSelectedProduct } = useShop();

  const bestsellers = products.filter((p) => p.isBestseller || p.isFeatured);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (bestsellers.length === 0) {
    return (
      <section className="py-16 bg-[#FFF9FC] border-t border-[#F1D6E2]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[12px] font-bold tracking-[0.18em] uppercase text-[#E94F91] block mb-2">
            BESTSELLERS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#241B20] uppercase">
            THE FLORA EDIT
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#806F77] font-medium max-w-md mx-auto">
            New curated collections are arriving soon. Inquire directly with our Concierge on WhatsApp for bespoke orders.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-[#FFF9FC] relative border-t border-[#F1D6E2]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[12px] sm:text-[13px] font-bold tracking-[0.18em] uppercase text-[#E94F91] block mb-2">
              BESTSELLERS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#241B20] tracking-[-0.03em] uppercase">
              THE FLORA EDIT
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#806F77] font-medium">
              Pieces chosen to make every look feel unforgettable.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="p-3 rounded-full border border-[#F1D6E2] bg-white hover:bg-[#FDE7F1] text-[#241B20] transition-colors shadow-sm focus-visible:outline-none"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="p-3 rounded-full border border-[#F1D6E2] bg-white hover:bg-[#FDE7F1] text-[#241B20] transition-colors shadow-sm focus-visible:outline-none"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* Product Carousel: Mobile horizontal swipe, Desktop 4 visible cards */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory scroll-smooth"
        >
          {bestsellers.map((product) => {
            const isSaved = isInWishlist(product.id);

            return (
              <div
                key={product.id}
                className="group relative flex-none w-[270px] sm:w-[290px] md:w-[calc(25%-18px)] snap-start rounded-[24px] bg-white border border-[#F1D6E2] p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_16px_40px_rgba(233,79,145,0.18)] hover:-translate-y-1"
              >
                <div>
                  {/* Image Container with Badges */}
                  <div className="relative aspect-[3/4] w-full rounded-[18px] overflow-hidden bg-[#FFF0F6] mb-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 cursor-pointer"
                      onClick={() => setSelectedProduct(product)}
                      referrerPolicy="no-referrer"
                    />

                    {/* Wishlist Heart */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
                      className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all shadow-sm ${
                        isSaved
                          ? 'bg-[#E94F91] text-white'
                          : 'bg-white/85 hover:bg-white text-[#241B20] hover:text-[#E94F91]'
                      }`}
                    >
                      <Heart className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                    </button>

                    {/* Quick View overlay */}
                    <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="flex-1 py-2 px-3 rounded-full bg-white/95 text-[#241B20] hover:bg-white text-[11px] font-bold tracking-[0.14em] uppercase backdrop-blur-md shadow-md transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Quick View
                      </button>
                    </div>
                  </div>

                  {/* Metadata */}
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#E94F91] block mb-1">
                    {product.category}
                  </span>

                  <h3
                    onClick={() => setSelectedProduct(product)}
                    className="text-base font-bold text-[#241B20] leading-snug line-clamp-1 hover:text-[#E94F91] transition-colors cursor-pointer"
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-[#806F77] line-clamp-1 mt-1 font-medium">
                    {product.tagline}
                  </p>
                </div>

                {/* Price & Add to Bag */}
                <div className="mt-4 pt-3 border-t border-[#F1D6E2] flex items-center justify-between">
                  <span className="text-base font-black text-[#241B20] tabular-nums">
                    Rs. {product.price.toLocaleString()}
                  </span>

                  <button
                    onClick={() => addToCart(product, 1)}
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[#E94F91] hover:bg-[#C93673] text-white text-[11px] font-bold tracking-[0.14em] uppercase shadow-sm transition-all hover:scale-105 active:scale-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
