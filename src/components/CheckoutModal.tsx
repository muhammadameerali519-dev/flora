import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Truck, MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    clearCart,
    lastConfirmedOrder,
    setLastConfirmedOrder,
    addCustomerOrder,
  } = useShop();

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    paymentMethod: 'Bank Wire / Online Transfer',
    specialInstructions: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `FL-${Math.floor(100000 + Math.random() * 900000)}`;
      addCustomerOrder({
        orderNumber: orderId,
        customerName: form.fullName,
        phone: form.phone,
        email: form.email,
        city: form.city,
        address: form.address,
        specialInstructions: form.specialInstructions,
        items: [...cart],
        total: cartSubtotal,
        paymentMethod: form.paymentMethod,
      });

      setLastConfirmedOrder({
        orderId,
        items: [...cart],
        total: cartSubtotal,
      });
      clearCart();
      setIsProcessing(false);
    }, 700);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setLastConfirmedOrder(null);
  };

  const confirmedOrder = lastConfirmedOrder;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#fce7f3] relative">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#fce7f3] flex items-center justify-between">
          <div>
            <h2 className="text-base font-serif font-medium tracking-[0.16em] uppercase text-[#121212]">
              {confirmedOrder ? 'ORDER CONFIRMED' : 'BESPOKE CHECKOUT'}
            </h2>
            <span className="text-[10px] text-[#737373] tracking-widest uppercase block">
              FLORA LUXE INTERNATIONAL MAISON
            </span>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close checkout"
            className="p-2 rounded-full text-[#4A4A4A] hover:bg-[#FFF0F5] hover:text-[#121212] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {confirmedOrder ? (
            /* Order Receipt View */
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-[#FFF0F5] border border-[#fce7f3] flex items-center justify-center mx-auto mb-4 text-[#C8728D]">
                <CheckCircle className="w-8 h-8" />
              </div>

              <span className="text-[11px] tracking-[0.2em] uppercase text-[#C8728D] font-semibold block mb-1">
                TRANSACTION COMPLETE
              </span>
              <h3 className="text-2xl font-serif text-[#121212] uppercase tracking-wide">
                Order #{confirmedOrder.orderId} Confirmed
              </h3>
              <p className="text-xs text-[#737373] max-w-md mx-auto mt-2 font-light">
                Thank you for selecting FLORA LUXE. Your bespoke parcel is being prepared by our atelier in our signature baby-pink keepsake box.
              </p>

              {/* Receipt Summary Box */}
              <div className="my-6 p-6 rounded-2xl bg-[#FFFBFD] border border-[#fce7f3] text-left max-w-md mx-auto space-y-3">
                <div className="flex justify-between text-xs text-[#737373] pb-2 border-b border-[#fce7f3]">
                  <span>Status</span>
                  <span className="font-medium text-[#059669]">Preparing Shipment</span>
                </div>
                <div className="flex justify-between text-xs text-[#737373] pb-2 border-b border-[#fce7f3]">
                  <span>Payment Selection</span>
                  <span className="font-medium text-[#121212]">{form.paymentMethod}</span>
                </div>
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#737373] block">
                    Itemized Order:
                  </span>
                  {confirmedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between text-xs text-[#121212] font-medium"
                    >
                      <span className="truncate pr-2">
                        {item.product.name} (x{item.quantity})
                      </span>
                      <span className="tabular-nums">
                        Rs. ${(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-sm font-serif font-bold text-[#121212] pt-3 border-t border-[#fce7f3]">
                  <span>Total Amount</span>
                  <span className="tabular-nums">Rs. {confirmedOrder.total.toLocaleString()}</span>
                </div>
              </div>

              {/* Concierge updates on WhatsApp */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/923264238154?text=${encodeURIComponent(
                    `Hi FLORA LUXE, I just placed Order #${confirmedOrder.orderId} for Rs. ${confirmedOrder.total.toLocaleString()}. Please confirm my shipment details.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-2 shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Receive WhatsApp Updates</span>
                </a>
                <button
                  onClick={handleClose}
                  className="px-6 py-3.5 rounded-full bg-[#121212] text-white text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form View */
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Order total header */}
              <div className="p-4 rounded-2xl bg-[#FFF0F6] border border-[#F1D6E2] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs text-[#806F77] block font-medium">Order Subtotal</span>
                  <span className="text-xl font-black text-[#241B20] tabular-nums">
                    Rs. {cartSubtotal.toLocaleString()}
                  </span>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs text-[#059669] font-bold bg-[#ECFDF5] px-3 py-1 rounded-full inline-block">
                    Free Delivery Across Pakistan
                  </span>
                  <span className="text-[10px] text-[#806F77] block mt-1 font-medium">
                    Delivery Exclusively in Pakistan (All Cities)
                  </span>
                </div>
              </div>

              {/* Customer Verification Form */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold tracking-[0.18em] uppercase text-[#241B20]">
                  1. Pakistan Shipping Address
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#241B20] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      placeholder="e.g. Ayesha Khan"
                      className="w-full px-4 py-3 rounded-xl border border-[#F1D6E2] text-xs focus:outline-none focus:border-[#E94F91]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#241B20] mb-1.5">
                      WhatsApp / Mobile (Pakistan) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+92 300 1234567"
                      className="w-full px-4 py-3 rounded-xl border border-[#F1D6E2] text-xs focus:outline-none focus:border-[#E94F91]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#241B20] mb-1.5">
                    Email Address (for Receipt) *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="ayesha@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#F1D6E2] text-xs focus:outline-none focus:border-[#E94F91]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#241B20] mb-1.5">
                      Destination Country
                    </label>
                    <input
                      type="text"
                      disabled
                      value="Pakistan (Nationwide Delivery)"
                      className="w-full px-4 py-3 rounded-xl border border-[#F1D6E2] bg-[#FFF0F6] text-xs text-[#241B20] font-bold cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#241B20] mb-1.5">
                      City in Pakistan *
                    </label>
                    <select
                      required
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#F1D6E2] text-xs focus:outline-none focus:border-[#E94F91] bg-white font-medium"
                    >
                      <option value="">Select City...</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Multan">Multan</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Sialkot">Sialkot</option>
                      <option value="Gujranwala">Gujranwala</option>
                      <option value="Quetta">Quetta</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Abbottabad">Abbottabad</option>
                      <option value="Other City in Pakistan">Other City in Pakistan</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#241B20] mb-1.5">
                    Delivery Address in Pakistan *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="House/Apartment #, Street, Sector / Area"
                    className="w-full px-4 py-3 rounded-xl border border-[#F1D6E2] text-xs focus:outline-none focus:border-[#E94F91]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#241B20] mb-1.5">
                    Gift Note / Special Delivery Instructions
                  </label>
                  <input
                    type="text"
                    value={form.specialInstructions}
                    onChange={(e) => setForm({ ...form, specialInstructions: e.target.value })}
                    placeholder="Optional message on ribbon / landmark..."
                    className="w-full px-4 py-3 rounded-xl border border-[#F1D6E2] text-xs focus:outline-none focus:border-[#E94F91]"
                  />
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-semibold tracking-[0.18em] uppercase text-[#121212]">
                  2. Select Payment Preference
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    'Bank Wire / Online Transfer',
                    'WhatsApp VIP Invoice',
                    'Debit / Credit Card',
                  ].map((method) => (
                    <button
                      type="button"
                      key={method}
                      onClick={() => setForm({ ...form, paymentMethod: method })}
                      className={`p-3 rounded-xl border text-xs font-medium text-left transition-all ${
                        form.paymentMethod === method
                          ? 'border-[#C8728D] bg-[#FFF0F5] text-[#9f1239] shadow-sm font-semibold'
                          : 'border-[#fce7f3] bg-white text-[#4A4A4A] hover:bg-[#FFFBFD]'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-[#fce7f3] space-y-3">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#F47C9E] via-[#E64E7A] to-[#C8728D] text-white text-xs font-semibold tracking-[0.2em] uppercase shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span>CONFIRMING BESPOKE ORDER...</span>
                  ) : (
                    <span>CONFIRM ORDER · Rs. {cartSubtotal.toLocaleString()}</span>
                  )}
                </button>

                <div className="flex items-center justify-center gap-6 text-[10px] text-[#737373] pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C8728D]" />
                    Insured Maison Packaging
                  </span>
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#C8728D]" />
                    Express Tracked Courier
                  </span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
