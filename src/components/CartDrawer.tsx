import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartCount,
    setIsCheckoutOpen,
  } = useShop();

  if (!isCartOpen) return null;

  // Build WhatsApp pre-filled order string
  const orderSummaryText = cart
    .map(
      (item) =>
        `- ${item.product.name} (Qty: ${item.quantity}${item.selectedColor ? `, Color: ${item.selectedColor}` : ''}${item.selectedSize ? `, Size: ${item.selectedSize}` : ''}) - Rs. ${(item.product.price * item.quantity).toLocaleString()}`
    )
    .join('\n');

  const whatsappCheckoutUrl = `https://wa.me/923264238154?text=${encodeURIComponent(
    `Hi FLORA LUXE, I would like to place an order for the following items:\n\n${orderSummaryText}\n\nSubtotal: Rs. ${cartSubtotal.toLocaleString()}\nPlease guide me with delivery and payment options.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#fce7f3]">
          {/* Header */}
          <div className="p-6 border-b border-[#fce7f3] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C8728D]" />
              <h2 className="text-base font-serif font-medium tracking-[0.16em] uppercase text-[#121212]">
                SHOPPING BAG ({cartCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart"
              className="p-2 rounded-full text-[#4A4A4A] hover:bg-[#FFF0F5] hover:text-[#121212] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary packaging banner */}
          <div className="bg-[#FFF5F7] px-6 py-2.5 border-b border-[#ffd6e4]/50 flex items-center gap-2 text-xs text-[#9f1239]">
            <Sparkles className="w-3.5 h-3.5 text-[#C8728D] shrink-0" />
            <span>Includes complimentary signature pink gift box & ribbon</span>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[#FFF0F5] border border-[#fce7f3] flex items-center justify-center mb-4 text-[#C8728D]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-serif text-[#121212] mb-1">
                  Your bag is empty
                </h3>
                <p className="text-xs text-[#737373] max-w-xs mb-6 font-light">
                  Explore our curated creations and find the perfect addition to your collection.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-3 rounded-full bg-[#121212] text-white text-xs font-semibold tracking-wider uppercase"
                >
                  Discover Collections
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${idx}`}
                  className="flex gap-4 p-3 rounded-2xl bg-[#FFFBFD] border border-[#fce7f3]/80"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 rounded-xl overflow-hidden bg-[#FFF5F7] shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-serif font-medium text-[#121212] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() =>
                            removeFromCart(item.product.id, item.selectedColor, item.selectedSize)
                          }
                          aria-label="Remove item"
                          className="text-[#a3a3a3] hover:text-[#9f1239] transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[10px] text-[#737373] mt-0.5 space-x-1">
                        {item.selectedColor && <span>Tone: {item.selectedColor}</span>}
                        {item.selectedSize && <span>· Size: {item.selectedSize}</span>}
                      </div>

                      <span className="text-xs font-semibold text-[#121212] tabular-nums mt-1 block">
                        Rs. {item.product.price.toLocaleString()}
                      </span>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#fce7f3] rounded-full bg-white px-2 py-0.5">
                        <button
                          onClick={() =>
                            updateCartQuantity(
                              item.product.id,
                              item.quantity - 1,
                              item.selectedColor,
                              item.selectedSize
                            )
                          }
                          className="text-xs px-1 text-[#737373] hover:text-[#121212]"
                        >
                          -
                        </button>
                        <span className="text-xs font-semibold px-2 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.selectedColor,
                              item.selectedSize
                            )
                          }
                          className="text-xs px-1 text-[#737373] hover:text-[#121212]"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-[#121212] tabular-nums">
                        Rs. {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Subtotal & Actions */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#fce7f3] bg-[#FFFDFE] space-y-3">
              <div className="flex items-center justify-between text-xs text-[#737373]">
                <span>Shipping</span>
                <span className="text-[#059669] font-medium">Complimentary Global</span>
              </div>

              <div className="flex items-baseline justify-between text-base font-serif font-medium text-[#121212] pt-2 border-t border-[#fce7f3]/60">
                <span>Total Estimated</span>
                <span className="text-xl tabular-nums font-semibold">Rs. {cartSubtotal.toLocaleString()}</span>
              </div>

              {/* Direct Checkout Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#F47C9E] via-[#E64E7A] to-[#C8728D] text-white text-xs font-semibold tracking-[0.2em] uppercase shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* WhatsApp Express Checkout Button */}
              <a
                href={whatsappCheckoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold tracking-[0.16em] uppercase shadow-md transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>CHECKOUT VIA WHATSAPP CONCIERGE</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
