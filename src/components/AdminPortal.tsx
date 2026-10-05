import React, { useState } from 'react';
import {
  X, Lock, ShieldCheck, ShoppingBag, DollarSign, Package,
  MessageCircle, ExternalLink, Plus, CheckCircle, Clock,
  Truck, Check, Eye, EyeOff, LogOut, ArrowLeft, RefreshCw, Trash2
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { FloraLogo } from './FloraLogo';
import { Product, OrderStatus } from '../types';

export const AdminPortal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    orders,
    updateOrderStatus,
    clearAllOrders,
    products,
    updateProduct,
    addProduct,
    deleteProduct,
    clearAllProducts,
    inquiries,
    updateInquiryStatus,
    showToast,
  } = useShop();

  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Dashboard state
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'inquiries' | 'settings'>('orders');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  // New product form
  const [newProd, setNewProd] = useState<Partial<Product>>({
    name: '',
    tagline: '',
    category: 'Jewelry',
    price: 12500,
    materials: '18K Rose Gold Plated',
    description: '',
    isNewArrival: true,
    isBestseller: false,
    rating: 5.0,
    reviewCount: 1,
  });

  if (!isAdminOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = adminLogin(username, password);
    if (!success) {
      setLoginError('Invalid administrator credentials. Please check username and password.');
    } else {
      setUsername('');
      setPassword('');
    }
  };

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length;

  const filteredOrders = orderStatusFilter === 'All'
    ? orders
    : orders.filter((o) => o.status === orderStatusFilter);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price) {
      showToast('Validation Error', 'Please specify product name and price');
      return;
    }

    const defaultImg = products[0]?.images[0] || '';
    const created: Product = {
      id: `fl-custom-${Date.now().toString().slice(-5)}`,
      name: newProd.name,
      tagline: newProd.tagline || 'Exclusive Flora Luxe Curation',
      category: (newProd.category as any) || 'Jewelry',
      price: Number(newProd.price),
      description: newProd.description || 'Handcrafted luxury piece designed for modern elegance.',
      details: ['Hand-inspected in our atelier', 'Includes luxury keepsake presentation box'],
      materials: newProd.materials || '18K Rose Gold Plated',
      images: [defaultImg],
      isNewArrival: !!newProd.isNewArrival,
      isBestseller: !!newProd.isBestseller,
      rating: 5.0,
      reviewCount: 1,
    };

    addProduct(created);
    setIsAddProductModalOpen(false);
    setNewProd({
      name: '',
      tagline: '',
      category: 'Jewelry',
      price: 150,
      materials: '18K Rose Gold Plated',
      description: '',
      isNewArrival: true,
      isBestseller: false,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-[28px] max-w-6xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#F1D6E2] relative flex flex-col">
        {/* Top Portal Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#F1D6E2] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FloraLogo variant="icon-only" imageClassName="w-8 h-8 rounded-full" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-[0.2em] uppercase text-[#241B20]">
                  FLORA LUXE · ADMIN PORTAL
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#FFF0F6] text-[#E94F91] border border-[#F1D6E2]">
                  Authorized Staff
                </span>
              </div>
              <span className="text-[10px] text-[#806F77] font-medium block">
                Exclusive Pakistan Logistics & Store Management
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdminLoggedIn && (
              <button
                onClick={() => adminLogout()}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#F1D6E2] text-xs font-bold text-[#806F77] hover:text-[#241B20] hover:bg-[#FFF0F6] transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              aria-label="Close portal"
              className="p-2 rounded-full text-[#806F77] hover:bg-[#FFF0F6] hover:text-[#241B20] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Portal Main Body */}
        <div className="p-6 sm:p-8 flex-1">
          {!isAdminLoggedIn ? (
            /* 1. LOGIN VIEW (Exact prompt requirement: no forget button!) */
            <div className="max-w-md mx-auto py-10">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-3xl bg-[#FFF0F6] border border-[#F1D6E2] flex items-center justify-center mx-auto mb-4 text-[#E94F91] shadow-sm">
                  <Lock className="w-8 h-8 stroke-[1.8]" />
                </div>
                <h2 className="text-2xl font-black text-[#241B20] tracking-tight uppercase">
                  Staff Authentication
                </h2>
                <p className="mt-1 text-xs text-[#806F77] font-medium">
                  Enter authorized administrator credentials to manage orders and stock.
                </p>
              </div>

              {loginError && (
                <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-xs font-medium text-red-700 animate-in fade-in">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#241B20] mb-2">
                    Admin Username
                  </label>
                  <input
                    type="text"
                    required
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="w-full px-4 py-3.5 rounded-xl border border-[#F1D6E2] bg-[#FFF9FC] text-xs text-[#241B20] font-medium focus:outline-none focus:border-[#E94F91] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#241B20] mb-2">
                    Admin Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full px-4 py-3.5 rounded-xl border border-[#F1D6E2] bg-[#FFF9FC] text-xs text-[#241B20] font-medium focus:outline-none focus:border-[#E94F91] transition-colors pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#806F77] hover:text-[#241B20] transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* NOTE: Explicitly NO "forgot password" button as strictly requested by user! */}

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#E94F91] hover:bg-[#C93673] text-white text-xs font-black tracking-[0.2em] uppercase shadow-[0_8px_25px_rgba(233,79,145,0.35)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 mt-4"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>SIGN IN TO PORTAL</span>
                </button>
              </form>
            </div>
          ) : (
            /* 2. AUTHENTICATED DASHBOARD VIEW */
            <div className="space-y-8">
              {/* Metric Cards Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#FFF0F6] border border-[#F1D6E2]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#806F77]">
                      Total Orders
                    </span>
                    <Package className="w-4 h-4 text-[#E94F91]" />
                  </div>
                  <div className="text-2xl font-black text-[#241B20] tabular-nums">
                    {orders.length}
                  </div>
                  <span className="text-[10px] text-[#059669] font-bold block mt-1">
                    {pendingOrders} Pending Verification
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#F1D6E2]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#806F77]">
                      Total Revenue
                    </span>
                    <DollarSign className="w-4 h-4 text-[#059669]" />
                  </div>
                  <div className="text-2xl font-black text-[#241B20] tabular-nums">
                    Rs. {totalRevenue.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-[#806F77] font-medium block mt-1">
                    Cash on Delivery (COD) · Pakistan
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#F1D6E2]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#806F77]">
                      Catalog Items
                    </span>
                    <ShoppingBag className="w-4 h-4 text-[#E94F91]" />
                  </div>
                  <div className="text-2xl font-black text-[#241B20] tabular-nums">
                    {products.length}
                  </div>
                  <span className="text-[10px] text-[#806F77] font-medium block mt-1">
                    Active on Storefront
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#F1D6E2]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#806F77]">
                      Customer Inquiries
                    </span>
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  </div>
                  <div className="text-2xl font-black text-[#241B20] tabular-nums">
                    {inquiries.length}
                  </div>
                  <span className="text-[10px] text-[#E94F91] font-bold block mt-1">
                    {inquiries.filter((i) => i.status === 'New').length} New Messages
                  </span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-[#F1D6E2] gap-2 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`pb-3 px-4 text-xs font-black tracking-wider uppercase whitespace-nowrap transition-colors relative ${
                    activeTab === 'orders'
                      ? 'text-[#E94F91] border-b-2 border-[#E94F91]'
                      : 'text-[#806F77] hover:text-[#241B20]'
                  }`}
                >
                  Customer Orders ({orders.length})
                </button>

                <button
                  onClick={() => setActiveTab('products')}
                  className={`pb-3 px-4 text-xs font-black tracking-wider uppercase whitespace-nowrap transition-colors relative ${
                    activeTab === 'products'
                      ? 'text-[#E94F91] border-b-2 border-[#E94F91]'
                      : 'text-[#806F77] hover:text-[#241B20]'
                  }`}
                >
                  Catalog & Stock ({products.length})
                </button>

                <button
                  onClick={() => setActiveTab('inquiries')}
                  className={`pb-3 px-4 text-xs font-black tracking-wider uppercase whitespace-nowrap transition-colors relative ${
                    activeTab === 'inquiries'
                      ? 'text-[#E94F91] border-b-2 border-[#E94F91]'
                      : 'text-[#806F77] hover:text-[#241B20]'
                  }`}
                >
                  Inquiries ({inquiries.length})
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`pb-3 px-4 text-xs font-black tracking-wider uppercase whitespace-nowrap transition-colors relative ${
                    activeTab === 'settings'
                      ? 'text-[#E94F91] border-b-2 border-[#E94F91]'
                      : 'text-[#806F77] hover:text-[#241B20]'
                  }`}
                >
                  Concierge & Settings
                </button>
              </div>

              {/* TAB 1: ORDERS TAB */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  {/* Status Filters */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#806F77] uppercase tracking-wider">
                        Filter Status:
                      </span>
                      {['All', 'Pending', 'Confirmed', 'Dispatched', 'Delivered', 'Cancelled'].map((st) => (
                        <button
                          key={st}
                          onClick={() => setOrderStatusFilter(st)}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                            orderStatusFilter === st
                              ? 'bg-[#E94F91] text-white shadow-sm'
                              : 'bg-[#FFF0F6] text-[#806F77] hover:text-[#241B20] border border-[#F1D6E2]'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#806F77] font-medium">
                        Showing {filteredOrders.length} order(s)
                      </span>
                      {orders.length > 0 && (
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to clear all orders?')) {
                              clearAllOrders();
                            }
                          }}
                          className="px-3 py-1 rounded-full border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Clear All Orders</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Orders Table or Empty State */}
                  {filteredOrders.length === 0 ? (
                    <div className="p-12 text-center text-xs text-[#806F77] bg-[#FFF9FC] rounded-2xl border border-dashed border-[#F1D6E2]">
                      <Package className="w-8 h-8 text-[#E94F91] mx-auto mb-2 opacity-60" />
                      <p className="font-bold text-[#241B20]">No Orders Recorded</p>
                      <p className="text-[11px] text-[#806F77] mt-1">
                        New orders placed on the website across Pakistan will automatically appear here.
                      </p>
                    </div>
                  ) : (
                  <div className="border border-[#F1D6E2] rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-[#241B20]">
                        <thead className="bg-[#FFF0F6] border-b border-[#F1D6E2] font-black uppercase tracking-wider text-[10px] text-[#806F77]">
                          <tr>
                            <th className="p-4">Order #</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">City / Address</th>
                            <th className="p-4">Items</th>
                            <th className="p-4">Total</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F1D6E2]">
                          {filteredOrders.map((ord) => {
                            const whatsappCustomerUrl = `https://wa.me/${ord.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Salam ${ord.customerName}! This is FLORA LUXE regarding your order #${ord.orderNumber}.`
                            )}`;

                            return (
                              <tr key={ord.id} className="hover:bg-[#FFF9FC] transition-colors">
                                <td className="p-4 font-mono font-bold text-[#E94F91]">
                                  {ord.orderNumber}
                                  <span className="block text-[10px] font-normal text-[#806F77] mt-0.5">
                                    {ord.createdAt}
                                  </span>
                                </td>
                                <td className="p-4">
                                  <div className="font-bold">{ord.customerName}</div>
                                  <div className="text-[11px] text-[#806F77] font-mono">{ord.phone}</div>
                                  <div className="text-[10px] text-[#806F77]">{ord.email}</div>
                                </td>
                                <td className="p-4 max-w-xs">
                                  <span className="font-bold text-[#241B20] block">{ord.city}</span>
                                  <span className="text-[11px] text-[#806F77] line-clamp-2">{ord.address}</span>
                                </td>
                                <td className="p-4">
                                  {ord.items.map((it, idx) => (
                                    <div key={idx} className="text-[11px] font-medium truncate max-w-[180px]">
                                      {it.quantity}x {it.product.name}
                                    </div>
                                  ))}
                                </td>
                                <td className="p-4 font-black tabular-nums whitespace-nowrap">
                                  Rs. {ord.total.toLocaleString()}
                                  <span className="block text-[10px] text-[#059669] font-bold">
                                    COD
                                  </span>
                                </td>
                                <td className="p-4">
                                  <select
                                    value={ord.status}
                                    onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                                    className={`px-3 py-1 rounded-full text-[11px] font-bold border focus:outline-none cursor-pointer ${
                                      ord.status === 'Delivered'
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                        : ord.status === 'Dispatched'
                                        ? 'bg-sky-50 text-sky-700 border-sky-200'
                                        : ord.status === 'Confirmed'
                                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                                        : ord.status === 'Cancelled'
                                        ? 'bg-red-50 text-red-700 border-red-200'
                                        : 'bg-amber-50 text-amber-700 border-amber-200'
                                    }`}
                                  >
                                    <option value="Pending">Pending</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Dispatched">Dispatched</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                  </select>
                                </td>
                                <td className="p-4">
                                  <a
                                    href={whatsappCustomerUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm transition-all"
                                  >
                                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                                    <span>WhatsApp</span>
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  )}
                </div>
              )}

              {/* TAB 2: PRODUCTS TAB */}
              {activeTab === 'products' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-wider text-[#241B20]">
                        Active Store Catalog
                      </h3>
                      <p className="text-xs text-[#806F77]">
                        Manage items, pricing, badges, and catalog curation.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {products.length > 0 && (
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to remove all products from the store?')) {
                              clearAllProducts();
                            }
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Clear All Products</span>
                        </button>
                      )}
                      <button
                        onClick={() => setIsAddProductModalOpen(true)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#E94F91] text-white text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-[#C93673] transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Product</span>
                      </button>
                    </div>
                  </div>

                  {products.length === 0 ? (
                    <div className="p-12 text-center text-xs text-[#806F77] bg-[#FFF9FC] rounded-2xl border border-dashed border-[#F1D6E2]">
                      <ShoppingBag className="w-8 h-8 text-[#E94F91] mx-auto mb-2 opacity-60" />
                      <p className="font-bold text-[#241B20]">No Products in Catalog</p>
                      <p className="text-[11px] text-[#806F77] mt-1">
                        All products have been removed. Click "+ Add Product" to add a new luxury piece.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {products.map((prod) => (
                        <div
                          key={prod.id}
                          className="p-4 rounded-2xl bg-white border border-[#F1D6E2] space-y-3 flex flex-col justify-between relative group"
                        >
                          <div className="flex gap-3">
                            <img
                              src={prod.images[0] || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80'}
                              alt={prod.name}
                              className="w-16 h-20 rounded-xl object-cover border border-[#F1D6E2] bg-[#FFF0F6]"
                              referrerPolicy="no-referrer"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E94F91] block">
                                  {prod.category}
                                </span>
                                <button
                                  onClick={() => {
                                    if (window.confirm(`Delete "${prod.name}"?`)) {
                                      deleteProduct(prod.id);
                                    }
                                  }}
                                  title="Delete product"
                                  className="text-[#806F77] hover:text-red-600 transition-colors p-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <h4 className="text-xs font-bold text-[#241B20] truncate">
                                {prod.name}
                              </h4>
                              <p className="text-[11px] text-[#806F77] truncate mt-0.5">
                                {prod.tagline}
                              </p>
                              <div className="mt-2 flex items-center gap-2">
                                <span className="text-xs font-bold text-[#806F77]">Price (Rs.):</span>
                                <input
                                  type="number"
                                  defaultValue={prod.price}
                                  onBlur={(e) => {
                                    const val = Number(e.target.value);
                                    if (val > 0 && val !== prod.price) {
                                      updateProduct({ ...prod, price: val });
                                    }
                                  }}
                                  className="w-24 px-2 py-0.5 rounded-lg border border-[#F1D6E2] text-xs font-bold text-[#241B20] tabular-nums"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-[#F1D6E2] flex items-center justify-between text-[11px]">
                            <label className="flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={!!prod.isBestseller}
                                onChange={(e) => updateProduct({ ...prod, isBestseller: e.target.checked })}
                                className="rounded text-[#E94F91] focus:ring-[#E94F91]"
                              />
                              <span className="font-semibold text-[#806F77]">Bestseller</span>
                            </label>

                            <label className="flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={!!prod.isNewArrival}
                                onChange={(e) => updateProduct({ ...prod, isNewArrival: e.target.checked })}
                                className="rounded text-[#E94F91] focus:ring-[#E94F91]"
                              />
                              <span className="font-semibold text-[#806F77]">New Arrival</span>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: INQUIRIES TAB */}
              {activeTab === 'inquiries' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black uppercase tracking-wider text-[#241B20]">
                      Client Inquiries & Contact Submissions
                    </h3>
                    <span className="text-xs text-[#806F77]">
                      {inquiries.length} received messages
                    </span>
                  </div>

                  <div className="space-y-3">
                    {inquiries.map((inq) => {
                      const whatsappUrl = `https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Salam ${inq.name}! Thank you for reaching out to FLORA LUXE. How may we assist you today?`
                      )}`;

                      return (
                        <div
                          key={inq.id}
                          className="p-5 rounded-2xl bg-white border border-[#F1D6E2] flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="space-y-1.5 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-[#241B20]">{inq.name}</span>
                              <span className="text-[10px] text-[#806F77] font-mono">{inq.phone}</span>
                              <span className="text-[10px] text-[#806F77]">• {inq.createdAt}</span>
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                                inq.status === 'Resolved'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-amber-50 text-amber-700'
                              }`}>
                                {inq.status}
                              </span>
                            </div>
                            <p className="text-xs text-[#241B20] leading-relaxed bg-[#FFF9FC] p-3 rounded-xl border border-[#F1D6E2]/60">
                              &ldquo;{inq.message}&rdquo;
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3.5 py-1.5 rounded-full bg-[#25D366] text-white text-[11px] font-bold uppercase tracking-wider shadow-sm inline-flex items-center gap-1.5"
                            >
                              <MessageCircle className="w-3.5 h-3.5 fill-white" />
                              <span>WhatsApp Reply</span>
                            </a>

                            <button
                              onClick={() => updateInquiryStatus(inq.id, inq.status === 'Resolved' ? 'New' : 'Resolved')}
                              className="px-3 py-1.5 rounded-full border border-[#F1D6E2] text-xs font-bold text-[#806F77] hover:bg-[#FFF0F6]"
                            >
                              {inq.status === 'Resolved' ? 'Reopen' : 'Mark Resolved'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 4: SETTINGS & CONCIERGE */}
              {activeTab === 'settings' && (
                <div className="space-y-6 max-w-2xl">
                  <div className="p-6 rounded-2xl bg-white border border-[#F1D6E2] space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-wider text-[#241B20] pb-3 border-b border-[#F1D6E2]">
                      Store Channels & Logistics
                    </h3>

                    <div className="flex justify-between items-center text-xs py-1">
                      <span className="text-[#806F77] font-medium">WhatsApp Concierge Hotline:</span>
                      <span className="font-mono font-bold text-[#241B20]">+92 326 4238154</span>
                    </div>

                    <div className="flex justify-between items-center text-xs py-1">
                      <span className="text-[#806F77] font-medium">Delivery Destination:</span>
                      <span className="font-bold text-[#059669]">Nationwide Pakistan (100% Coverage)</span>
                    </div>

                    <div className="flex justify-between items-center text-xs py-1">
                      <span className="text-[#806F77] font-medium">Payment Preference:</span>
                      <span className="font-bold text-[#241B20]">Cash on Delivery (COD) Enabled</span>
                    </div>

                    <div className="flex justify-between items-center text-xs py-1">
                      <span className="text-[#806F77] font-medium">Instagram Handle:</span>
                      <a href="https://instagram.com/flora.luxe44" target="_blank" rel="noopener noreferrer" className="font-bold text-[#E94F91] hover:underline">
                        @flora.luxe44
                      </a>
                    </div>

                    <div className="flex justify-between items-center text-xs py-1">
                      <span className="text-[#806F77] font-medium">TikTok Handle:</span>
                      <a href="https://www.tiktok.com/@flora.luxe44" target="_blank" rel="noopener noreferrer" className="font-bold text-[#E94F91] hover:underline">
                        @flora.luxe44
                      </a>
                    </div>

                    <div className="flex justify-between items-center text-xs py-1">
                      <span className="text-[#806F77] font-medium">Executive Office:</span>
                      <span className="font-bold text-[#241B20]">Founder & CEO Emaan Fatima</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Add Product Modal */}
        {isAddProductModalOpen && (
          <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#F1D6E2]">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#F1D6E2]">
                <h3 className="text-sm font-black uppercase tracking-wider text-[#241B20]">
                  Add New Catalog Product
                </h3>
                <button
                  onClick={() => setIsAddProductModalOpen(false)}
                  className="p-1 rounded-full text-[#806F77] hover:text-[#241B20]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#241B20] mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProd.name}
                    onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                    placeholder="e.g. Royal Damask Rose Choker"
                    className="w-full px-3 py-2.5 rounded-xl border border-[#F1D6E2] text-xs focus:outline-none focus:border-[#E94F91]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[#241B20] mb-1">
                      Category *
                    </label>
                    <select
                      value={newProd.category}
                      onChange={(e) => setNewProd({ ...newProd, category: e.target.value as any })}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#F1D6E2] text-xs focus:outline-none focus:border-[#E94F91]"
                    >
                      <option value="Jewelry">Jewelry</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Beauty">Beauty</option>
                      <option value="Fashion">Fashion</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[#241B20] mb-1">
                      Price (Rs. PKR) *
                    </label>
                    <input
                      type="number"
                      required
                      value={newProd.price}
                      onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#F1D6E2] text-xs focus:outline-none focus:border-[#E94F91]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#241B20] mb-1">
                    Tagline / Subtitle
                  </label>
                  <input
                    type="text"
                    value={newProd.tagline}
                    onChange={(e) => setNewProd({ ...newProd, tagline: e.target.value })}
                    placeholder="e.g. Handcrafted in 18K Solid Rose Gold"
                    className="w-full px-3 py-2.5 rounded-xl border border-[#F1D6E2] text-xs focus:outline-none focus:border-[#E94F91]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#241B20] mb-1">
                    Materials & Finishes
                  </label>
                  <input
                    type="text"
                    value={newProd.materials}
                    onChange={(e) => setNewProd({ ...newProd, materials: e.target.value })}
                    placeholder="e.g. 18K Rose Gold, Natural Pearls"
                    className="w-full px-3 py-2.5 rounded-xl border border-[#F1D6E2] text-xs focus:outline-none focus:border-[#E94F91]"
                  />
                </div>

                <div className="flex gap-4 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer font-bold">
                    <input
                      type="checkbox"
                      checked={!!newProd.isNewArrival}
                      onChange={(e) => setNewProd({ ...newProd, isNewArrival: e.target.checked })}
                      className="rounded text-[#E94F91]"
                    />
                    <span>New Arrival</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-bold">
                    <input
                      type="checkbox"
                      checked={!!newProd.isBestseller}
                      onChange={(e) => setNewProd({ ...newProd, isBestseller: e.target.checked })}
                      className="rounded text-[#E94F91]"
                    />
                    <span>Bestseller</span>
                  </label>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-[#F1D6E2]">
                  <button
                    type="button"
                    onClick={() => setIsAddProductModalOpen(false)}
                    className="px-4 py-2 rounded-full border border-[#F1D6E2] text-xs font-bold text-[#806F77]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-full bg-[#E94F91] text-white text-xs font-bold tracking-wider uppercase shadow-md"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
