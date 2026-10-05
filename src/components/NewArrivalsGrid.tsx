import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const NewArrivalsGrid: React.FC = () => {
  const {
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSelectedProduct,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
  } = useShop();

  const [filter, setFilter] = useState<string>(selectedCategoryFilter || 'ALL');

  const activeFilter = selectedCategoryFilter !== 'All' && selectedCategoryFilter !== 'ALL'
    ? selectedCategoryFilter
    : filter;

  const categories = ['ALL', 'JEWELRY', 'ACCESSORIES', 'BEAUTY', 'FEATURED'];

  const filteredProducts = products.filter((p) => {
    if (activeFilter.toUpperCase() === 'ALL') return true;
    if (activeFilter.toUpperCase() === 'FEATURED') return p.isFeatured;
    return p.category.toUpperCase() === activeFilter.toUpperCase();
  });

  const handleFilterChange = (cat: string) => {
    setFilter(cat);
    setSelectedCategoryFilter(cat);
  };

  return (
    <section id="shop" className="py-24 bg-white relative border-t border-[#F1D6E2]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[12px] sm:text-[13px] font-bold tracking-[0.18em] uppercase text-[#E94F91] block mb-2">
            FRESH CURATIONS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#241B20] tracking-[-0.03em] uppercase">
            NEW ARRIVALS
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#806F77] font-medium">
            Fresh pieces. Timeless elegance.
          </p>

          {/* Animated Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#FFF0F6] border border-[#F1D6E2] rounded-full max-w-fit mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                className={`relative px-5 py-2 text-xs font-bold tracking-[0.16em] uppercase rounded-full transition-all duration-300 whitespace-nowrap ${
                  activeFilter.toUpperCase() === cat.toUpperCase()
                    ? 'text-white'
                    : 'text-[#806F77] hover:text-[#241B20]'
                }`}
              >
                {activeFilter.toUpperCase() === cat.toUpperCase() && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 bg-[#E94F91] rounded-full shadow-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid or Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 px-6 text-center rounded-[28px] bg-[#FFF9FC] border border-dashed border-[#F1D6E2] max-w-lg mx-auto">
            <ShoppingBag className="w-10 h-10 text-[#E94F91] mx-auto mb-3 opacity-60" />
            <h3 className="text-base font-bold uppercase tracking-wider text-[#241B20]">
              New Collections Arriving Soon
            </h3>
            <p className="mt-1 text-xs text-[#806F77] leading-relaxed">
              Our atelier is curating new bespoke jewelry and luxury accessories. Contact our Concierge directly on WhatsApp for custom orders.
            </p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <AnimatePresence>
              {filteredProducts.map((product) => {
                const isSaved = isInWishlist(product.id);

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    key={product.id}
                    className="group relative rounded-[24px] bg-white border border-[#F1D6E2] p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_16px_40px_rgba(233,79,145,0.18)] hover:-translate-y-1.5"
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
                              ? 'bg-[#E94F91] text-white shadow-md'
                              : 'bg-white/85 text-[#241B20] hover:text-[#E94F91] hover:bg-white'
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isSaved ? 'fill-current scale-110' : ''
                            }`}
                          />
                        </button>

                        {/* Badge */}
                        {product.badge && (
                          <div className="absolute top-3 left-3 bg-[#E94F91] text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                            {product.badge}
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <span className="text-[10px] uppercase tracking-wider text-[#E94F91] font-bold block mb-1">
                        {product.category}
                      </span>

                      <h3
                        onClick={() => setSelectedProduct(product)}
                        className="text-base font-bold text-[#241B20] line-clamp-1 cursor-pointer group-hover:text-[#E94F91] transition-colors"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-[#806F77] line-clamp-1 mt-1 font-medium">
                        {product.materials}
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
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};
