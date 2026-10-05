import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    setSelectedProduct,
  } = useShop();

  if (!isWishlistOpen) return null;

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#fce7f3]">
          {/* Header */}
          <div className="p-6 border-b border-[#fce7f3] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#C8728D] fill-[#C8728D]" />
              <h2 className="text-base font-serif font-medium tracking-[0.16em] uppercase text-[#121212]">
                WISHLIST ({savedProducts.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              aria-label="Close wishlist"
              className="p-2 rounded-full text-[#4A4A4A] hover:bg-[#FFF0F5] hover:text-[#121212] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {savedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[#FFF0F5] border border-[#fce7f3] flex items-center justify-center mb-4 text-[#C8728D]">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-base font-serif text-[#121212] mb-1">
                  Your wishlist is empty
                </h3>
                <p className="text-xs text-[#737373] max-w-xs mb-6 font-light">
                  Tap the heart icon on any piece to save it for later review.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-6 py-3 rounded-full bg-[#121212] text-white text-xs font-semibold tracking-wider uppercase"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              savedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 rounded-2xl bg-[#FFFBFD] border border-[#fce7f3]/80"
                >
                  {/* Thumbnail */}
                  <div
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsWishlistOpen(false);
                    }}
                    className="w-20 h-24 rounded-xl overflow-hidden bg-[#FFF5F7] shrink-0 cursor-pointer"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] uppercase tracking-wider text-[#C8728D] font-medium">
                          {product.category}
                        </span>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          aria-label="Remove from wishlist"
                          className="text-[#a3a3a3] hover:text-[#9f1239] transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsWishlistOpen(false);
                        }}
                        className="text-xs font-serif font-medium text-[#121212] line-clamp-1 cursor-pointer hover:text-[#C8728D]"
                      >
                        {product.name}
                      </h4>

                      <span className="text-xs font-semibold text-[#121212] tabular-nums mt-1 block">
                        Rs. {product.price.toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-[#9f1239] hover:text-[#121212] transition-colors pt-2"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Move to Bag +
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
