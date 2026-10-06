import React, { useState, useRef } from 'react';
import {
  X, Lock, ShieldCheck, ShoppingBag, DollarSign, Package,
  MessageCircle, ExternalLink, Plus, CheckCircle, Clock,
  Truck, Check, Eye, EyeOff, LogOut, ArrowLeft, RefreshCw, Trash2,
  Upload, Camera, Image as ImageIcon, Link as LinkIcon
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { FloraLogo } from './FloraLogo';
import { Product, OrderStatus } from '../types';
import { jewelryImg, handbagImg, beautyImg } from '../data/products';

// Client-side helper to resize & compress uploaded images before storage
function compressImage(file: File, maxWidth = 900, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        } else {
          resolve(e.target?.result as string);
        }
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

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

  // New product form state
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

  // Image Upload state for Add Product modal
  const [productImages, setProductImages] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Card photo quick edit state
  const editCardFileInputRef = useRef<HTMLInputElement>(null);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

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

  // Handle file uploads from device (phone / PC)
  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingImage(true);
    try {
      const compressedList: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
          const base64 = await compressImage(file);
          compressedList.push(base64);
        }
      }
      if (compressedList.length > 0) {
        setProductImages((prev) => [...prev, ...compressedList]);
        showToast('Image Uploaded', `${compressedList.length} image(s) processed`);
      }
    } catch {
      showToast('Upload Error', 'Could not process the selected image file');
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Handle URL attachment
  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    setProductImages((prev) => [...prev, imageUrlInput.trim()]);
    setImageUrlInput('');
    showToast('Image Attached', 'URL added to product images');
  };

  // Remove uploaded image
  const handleRemoveImage = (index: number) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit product creation
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price) {
      showToast('Validation Error', 'Please specify product title and price');
      return;
    }

    const fallbackImg =
      newProd.category === 'Accessories' ? handbagImg :
      newProd.category === 'Beauty' ? beautyImg :
      jewelryImg;

    const finalImages = productImages.length > 0 ? productImages : [fallbackImg];

    const created: Product = {
      id: `fl-custom-${Date.now().toString().slice(-5)}`,
      name: newProd.name,
      tagline: newProd.tagline || 'Exclusive Flora Luxe Curation',
      category: (newProd.category as any) || 'Jewelry',
      price: Number(newProd.price),
      description: newProd.description || 'Handcrafted luxury piece designed for modern elegance.',
      details: ['Hand-inspected in our atelier', 'Includes luxury keepsake presentation box'],
      materials: newProd.materials || '18K Rose Gold Plated',
      images: finalImages,
      isNewArrival: !!newProd.isNewArrival,
      isBestseller: !!newProd.isBestseller,
      rating: 5.0,
      reviewCount: 1,
    };

    addProduct(created);
    setIsAddProductModalOpen(false);
    setProductImages([]);
    setImageUrlInput('');
    setNewProd({
      name: '',
      tagline: '',
      category: 'Jewelry',
      price: 12500,
      materials: '18K Rose Gold Plated',
      description: '',
      isNewArrival: true,
      isBestseller: false,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-[28px] max-w-6xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#F1D6E2] relative flex flex-col">
        {/* Hidden input for quick card photo change */}
        <input
          ref={editCardFileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file || !editingProductId) return;
            try {
              const compressed = await compressImage(file);
              const prod = products.find((p) => p.id === editingProductId);
              if (prod) {
                updateProduct({
                  ...prod,
                  images: [compressed, ...(prod.images?.slice(1) || [])],
                });
                showToast('Photo Updated', `${prod.name} cover modified`);
              }
            } catch {
              showToast('Update Failed', 'Could not process the selected image');
            } finally {
              setEditingProductId(null);
              if (editCardFileInputRef.current) editCardFileInputRef.current.value = '';
            }
          }}
        />

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
              <span className="text-[10px] text-[#806F77] block mt-0.5">
                Executive Maison Management & Real-Time Orders
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdminLoggedIn && (
              <button
                onClick={adminLogout}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#F1D6E2] text-xs font-bold text-[#806F77] hover:text-[#241B20] hover:bg-[#FFF0F6] transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            )}
            <button
              onClick={() => {
                adminLogout();
                setIsAdminOpen(false);
              }}
              className="p-2 rounded-full border border-[#F1D6E2] hover:bg-[#FFF0F6] text-[#241B20] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 flex-1">
          {!isAdminLoggedIn ? (
            /* Admin Sign-in Gate */
            <div className="max-w-md mx-auto py-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-[#FFF0F6] border border-[#F1D6E2] flex items-center justify-center mx-auto mb-4 text-[#E94F91]">
                  <Lock className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black text-[#241B20] uppercase tracking-tight">
                  Maison Admin Access
                </h3>
                <p className="text-xs text-[#806F77] mt-1 font-medium">
                  Protected portal for FLORA LUXE orders, products, and customer communications.
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {loginError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                    {loginError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#241B20] mb-1.5">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter admin username"
                    className="w-full px-4 py-3 rounded-xl border border-[#F1D6E2] text-xs text-[#241B20] focus:outline-none focus:border-[#E94F91] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#241B20] mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter administrator password"
                      className="w-full pl-4 pr-10 py-3 rounded-xl border border-[#F1D6E2] text-xs text-[#241B20] focus:outline-none focus:border-[#E94F91] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#806F77] hover:text-[#241B20]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#E94F91] hover:bg-[#C93673] text-white text-xs font-bold tracking-[0.16em] uppercase shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  Enter Management Portal
                </button>
              </form>
            </div>
          ) : (
            /* Logged-In Admin Management Dashboard */
            <div className="space-y-6">
              {/* Tab Navigation & KPI Overview */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1D6E2] pb-4">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                  {[
                    { id: 'orders', label: 'Customer Orders', count: orders.length },
                    { id: 'products', label: 'Catalog Products', count: products.length },
                    { id: 'inquiries', label: 'Client Inquiries', count: inquiries.length },
                    { id: 'settings', label: 'Maison Settings' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap flex items-center gap-1.5 ${
                        activeTab === tab.id
                          ? 'bg-[#E94F91] text-white shadow-sm'
                          : 'bg-[#FFF0F6] text-[#806F77] hover:text-[#241B20]'
                      }`}
                    >
                      <span>{tab.label}</span>
                      {typeof tab.count === 'number' && (
                        <span
                          className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                            activeTab === tab.id
                              ? 'bg-white/20 text-white'
                              : 'bg-white text-[#E94F91] border border-[#F1D6E2]'
                          }`}
                        >
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#806F77]">
                    Live Status:
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Atelier Operational
                  </span>
                </div>
              </div>

              {/* TAB 1: ORDERS MANAGEMENT */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  {/* KPI Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-5 rounded-2xl bg-white border border-[#F1D6E2]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#806F77]">
                          Total Orders
                        </span>
                        <Package className="w-4 h-4 text-[#E94F91]" />
                      </div>
                      <div className="text-2xl font-black text-[#241B20]">
                        {orders.length}
                      </div>
                      <span className="text-[10px] text-[#806F77] font-medium block mt-1">
                        {pendingOrders} awaiting dispatch
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-[#F1D6E2]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#806F77]">
                          Recorded Revenue
                        </span>
                        <DollarSign className="w-4 h-4 text-[#059669]" />
                      </div>
                      <div className="text-2xl font-black text-[#241B20] tabular-nums">
                        Rs. {totalRevenue.toLocaleString()}
                      </div>
                      <span className="text-[10px] text-[#806F77] font-medium block mt-1">
                        Verified Advance Payment · Pakistan
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-[#F1D6E2]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#806F77]">
                          Catalog Items
                        </span>
                        <ShoppingBag className="w-4 h-4 text-[#E94F91]" />
                      </div>
                      <div className="text-2xl font-black text-[#241B20]">
                        {products.length}
                      </div>
                      <span className="text-[10px] text-[#806F77] font-medium block mt-1">
                        Live in storefront
                      </span>
                    </div>
                  </div>

                  {/* Filter and Clear */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                      <span className="text-xs font-bold text-[#806F77]">Status:</span>
                      {['All', 'Pending', 'Confirmed', 'Dispatched', 'Delivered'].map((status) => (
                        <button
                          key={status}
                          onClick={() => setOrderStatusFilter(status)}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                            orderStatusFilter === status
                              ? 'bg-[#241B20] text-white'
                              : 'bg-white border border-[#F1D6E2] text-[#806F77] hover:text-[#241B20]'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>

                    {orders.length > 0 && (
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to clear all order logs?')) {
                            clearAllOrders();
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Clear All Orders</span>
                      </button>
                    )}
                  </div>

                  {/* Orders Table */}
                  <div className="rounded-2xl border border-[#F1D6E2] overflow-hidden bg-white">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#FFF9FC] border-b border-[#F1D6E2] text-[10px] uppercase tracking-wider text-[#806F77] font-bold">
                          <tr>
                            <th className="p-4">Order ID & Date</th>
                            <th className="p-4">Customer Details</th>
                            <th className="p-4">Destination</th>
                            <th className="p-4">Items Ordered</th>
                            <th className="p-4">Total</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F1D6E2]/60">
                          {filteredOrders.length === 0 ? (
                            <tr>
                              <td colSpan={7} className="p-8 text-center text-xs text-[#806F77]">
                                No customer orders recorded yet. When shoppers checkout on the site, their orders will appear here automatically in real time.
                              </td>
                            </tr>
                          ) : (
                            filteredOrders.map((ord) => {
                              const whatsappCustomerUrl = `https://wa.me/${ord.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                `Hi ${ord.customerName}, this is FLORA LUXE Customer Concierge regarding your order #${ord.id}. We have received your order for Rs. ${ord.total.toLocaleString()} and are preparing it with care.`
                              )}`;

                              return (
                                <tr key={ord.id} className="hover:bg-[#FFF9FC]/70 transition-colors">
                                  <td className="p-4 font-mono font-bold text-[#241B20] whitespace-nowrap">
                                    <div>{ord.id}</div>
                                    <div className="text-[10px] text-[#806F77] font-normal">{ord.createdAt}</div>
                                  </td>
                                  <td className="p-4">
                                    <div className="font-bold text-[#241B20]">{ord.customerName}</div>
                                    <div className="text-[#806F77] text-[11px] font-mono">{ord.phone}</div>
                                    {ord.email && <div className="text-[#806F77] text-[10px]">{ord.email}</div>}
                                  </td>
                                  <td className="p-4 max-w-[200px]">
                                    <div className="font-semibold text-[#241B20]">{ord.city}</div>
                                    <div className="text-[#806F77] text-[11px] truncate">{ord.address}</div>
                                  </td>
                                  <td className="p-4">
                                    {ord.items.map((item, i) => (
                                      <div key={i} className="text-[11px] text-[#241B20] whitespace-nowrap">
                                        <span className="font-bold">{item.quantity}x</span> {item.product.name}
                                        {item.selectedColor && <span className="text-[#806F77]"> ({item.selectedColor})</span>}
                                      </div>
                                    ))}
                                  </td>
                                  <td className="p-4 font-black tabular-nums whitespace-nowrap">
                                    Rs. {ord.total.toLocaleString()}
                                    <span className="block text-[10px] text-[#059669] font-bold">
                                      {ord.paymentMethod || 'Advance Payment'}
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
                                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                                          : ord.status === 'Confirmed'
                                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                                          : 'bg-amber-50 text-amber-700 border-amber-200'
                                      }`}
                                    >
                                      <option value="Pending">Pending</option>
                                      <option value="Confirmed">Confirmed</option>
                                      <option value="Dispatched">Dispatched</option>
                                      <option value="Delivered">Delivered</option>
                                    </select>
                                  </td>
                                  <td className="p-4 text-right">
                                    <a
                                      href={whatsappCustomerUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#25D366] text-white font-bold text-[10px] hover:bg-[#1EBE5D] transition-colors"
                                      title="Message customer directly on WhatsApp"
                                    >
                                      <MessageCircle className="w-3 h-3" />
                                      <span>WhatsApp</span>
                                    </a>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PRODUCTS CATALOG MANAGEMENT */}
              {activeTab === 'products' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-wider text-[#241B20]">
                        Storefront Product Catalog ({products.length} Items)
                      </h3>
                      <p className="text-xs text-[#806F77]">
                        Manage items, photos, pricing, badges, and catalog curation.
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
                        onClick={() => {
                          setProductImages([]);
                          setImageUrlInput('');
                          setIsAddProductModalOpen(true);
                        }}
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
                        All products have been removed. Click "+ Add Product" to add a new luxury piece with photo upload.
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
                            {/* Photo with Change Photo button */}
                            <div className="relative group/img shrink-0">
                              <img
                                src={prod.images[0] || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80'}
                                alt={prod.name}
                                className="w-16 h-20 rounded-xl object-cover border border-[#F1D6E2] bg-[#FFF0F6]"
                                referrerPolicy="no-referrer"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingProductId(prod.id);
                                  editCardFileInputRef.current?.click();
                                }}
                                title="Change photo"
                                className="absolute inset-0 bg-black/55 rounded-xl text-white opacity-0 group-hover/img:opacity-100 flex flex-col items-center justify-center text-[9px] font-bold transition-opacity"
                              >
                                <Camera className="w-3.5 h-3.5 mb-0.5" />
                                <span>Change</span>
                              </button>
                            </div>

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

                  {inquiries.length === 0 ? (
                    <div className="p-12 text-center text-xs text-[#806F77] bg-[#FFF9FC] rounded-2xl border border-dashed border-[#F1D6E2]">
                      <MessageCircle className="w-8 h-8 text-[#E94F91] mx-auto mb-2 opacity-60" />
                      <p className="font-bold text-[#241B20]">No Client Messages Yet</p>
                      <p className="text-[11px] text-[#806F77] mt-1">
                        Contact form submissions from your clients will display here in real time.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {inquiries.map((inq) => {
                        const whatsappUrl = `https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Dear ${inq.name}, thank you for contacting FLORA LUXE. We are pleased to assist you regarding your inquiry.`
                        )}`;

                        return (
                          <div
                            key={inq.id}
                            className="p-5 rounded-2xl bg-white border border-[#F1D6E2] space-y-3"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-bold text-sm text-[#241B20]">{inq.name}</h4>
                                <div className="text-xs text-[#806F77] font-mono">{inq.phone} · {inq.email}</div>
                              </div>
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  inq.status === 'Resolved'
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : inq.status === 'In Progress'
                                    ? 'bg-amber-50 text-amber-700'
                                    : 'bg-rose-50 text-rose-700'
                                }`}
                              >
                                {inq.status}
                              </span>
                            </div>

                            <div className="bg-[#FFF9FC] p-3 rounded-xl border border-[#F1D6E2]/50 text-xs text-[#241B20]">
                              <p className="text-[#806F77] leading-relaxed">{inq.message}</p>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-[#F1D6E2] text-xs">
                              <span className="text-[10px] text-[#806F77]">{inq.createdAt}</span>

                              <div className="flex items-center gap-2">
                                <select
                                  value={inq.status}
                                  onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                                  className="px-2 py-1 rounded-lg border border-[#F1D6E2] text-[11px] font-bold text-[#806F77]"
                                >
                                  <option value="New">New</option>
                                  <option value="In Progress">In Progress</option>
                                  <option value="Resolved">Resolved</option>
                                </select>

                                <a
                                  href={whatsappUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1 rounded-full bg-[#25D366] text-white text-[11px] font-bold flex items-center gap-1 hover:bg-[#1EBE5D] transition-colors"
                                >
                                  <MessageCircle className="w-3 h-3" />
                                  <span>Reply WhatsApp</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: SETTINGS TAB */}
              {activeTab === 'settings' && (
                <div className="max-w-xl mx-auto space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#241B20]">
                    FLORA LUXE Brand & Operational Settings
                  </h3>

                  <div className="p-6 rounded-2xl bg-white border border-[#F1D6E2] space-y-4">
                    <div className="flex justify-between items-center text-xs py-1">
                      <span className="text-[#806F77] font-medium">Brand Identity:</span>
                      <span className="font-bold text-[#241B20]">FLORA LUXE (International Luxury House)</span>
                    </div>

                    <div className="flex justify-between items-center text-xs py-1">
                      <span className="text-[#806F77] font-medium">Official Concierge WhatsApp:</span>
                      <a href="https://wa.me/923264238154" target="_blank" rel="noopener noreferrer" className="font-bold text-[#059669] hover:underline">
                        +92 326 4238154
                      </a>
                    </div>

                    <div className="flex justify-between items-center text-xs py-1">
                      <span className="text-[#806F77] font-medium">Delivery Destination:</span>
                      <span className="font-bold text-[#059669]">Nationwide Pakistan (100% Coverage)</span>
                    </div>

                    <div className="flex justify-between items-center text-xs py-1">
                      <span className="text-[#806F77] font-medium">Payment Preference:</span>
                      <span className="font-bold text-[#241B20]">Advance Payment & Wire Transfer</span>
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
                      <span className="font-bold text-[#241B20]">Founder & CEO Noor Fatima</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Add Product Modal with Full Image Upload Support */}
        {isAddProductModalOpen && (
          <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#F1D6E2] max-h-[92vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#F1D6E2]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#FFF0F6] flex items-center justify-center text-[#E94F91]">
                    <Plus className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#241B20]">
                    Add New Catalog Product
                  </h3>
                </div>
                <button
                  onClick={() => setIsAddProductModalOpen(false)}
                  className="p-1.5 rounded-full text-[#806F77] hover:text-[#241B20] hover:bg-[#FFF0F6] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
                {/* 1. Title */}
                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#241B20] mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProd.name}
                    onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                    placeholder="e.g. Royal Rose Gold Diamond Pendant"
                    className="w-full px-3 py-2.5 rounded-xl border border-[#F1D6E2] text-xs focus:outline-none focus:border-[#E94F91]"
                  />
                </div>

                {/* 2. Category & Price */}
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

                {/* 3. PRODUCT IMAGES UPLOAD SECTION (Requested Feature) */}
                <div className="space-y-2 pt-1 border-t border-[#F1D6E2]/70">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-bold uppercase text-[#241B20] flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-[#E94F91]" />
                      <span>Product Photos & Images *</span>
                    </label>
                    <span className="text-[10px] text-[#806F77] font-semibold">
                      {productImages.length} attached
                    </span>
                  </div>

                  {/* Drag-and-drop / Click file upload button */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="p-4 rounded-2xl border-2 border-dashed border-[#F1D6E2] hover:border-[#E94F91] bg-[#FFF9FC] hover:bg-[#FFF0F6] cursor-pointer transition-all flex flex-col items-center justify-center text-center group"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageFileUpload}
                    />
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-[#F1D6E2] group-hover:scale-110 flex items-center justify-center text-[#E94F91] mb-2 transition-transform">
                      {isUploadingImage ? (
                        <RefreshCw className="w-5 h-5 animate-spin" />
                      ) : (
                        <Upload className="w-5 h-5" />
                      )}
                    </div>
                    <span className="text-xs font-bold text-[#241B20]">
                      {isUploadingImage ? 'Processing & Optimizing Image...' : 'Click to Upload Photo from Device'}
                    </span>
                    <span className="text-[10px] text-[#806F77] mt-0.5">
                      Select JPG, PNG, WEBP from your phone or laptop
                    </span>
                  </div>

                  {/* Or Paste URL option */}
                  <div className="flex items-center gap-2 pt-1">
                    <div className="relative flex-1">
                      <LinkIcon className="w-3.5 h-3.5 text-[#806F77] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="url"
                        value={imageUrlInput}
                        onChange={(e) => setImageUrlInput(e.target.value)}
                        placeholder="Or paste image link (https://...)"
                        className="w-full pl-8 pr-3 py-2 rounded-xl border border-[#F1D6E2] text-[11px] focus:outline-none focus:border-[#E94F91]"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddImageUrl();
                          }
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      disabled={!imageUrlInput.trim()}
                      className="px-3 py-2 rounded-xl bg-[#241B20] text-white text-[11px] font-bold hover:bg-[#E94F91] disabled:opacity-40 transition-colors shrink-0"
                    >
                      Attach URL
                    </button>
                  </div>

                  {/* Quick Luxury Presets */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] text-[#806F77] font-semibold">Quick Presets:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setProductImages((prev) => [...prev, jewelryImg]);
                        showToast('Preset Added', 'Fine Jewelry photo attached');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#FFF0F6] border border-[#F1D6E2] text-[10px] font-bold text-[#E94F91] hover:bg-[#E94F91] hover:text-white transition-colors"
                    >
                      + Jewelry
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setProductImages((prev) => [...prev, handbagImg]);
                        showToast('Preset Added', 'Handbag photo attached');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#FFF0F6] border border-[#F1D6E2] text-[10px] font-bold text-[#E94F91] hover:bg-[#E94F91] hover:text-white transition-colors"
                    >
                      + Handbag
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setProductImages((prev) => [...prev, beautyImg]);
                        showToast('Preset Added', 'Beauty photo attached');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#FFF0F6] border border-[#F1D6E2] text-[10px] font-bold text-[#E94F91] hover:bg-[#E94F91] hover:text-white transition-colors"
                    >
                      + Beauty
                    </button>
                  </div>

                  {/* Selected Images Preview Thumbnails */}
                  {productImages.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[10px] font-bold text-[#806F77] uppercase block mb-1.5">
                        Selected Photos Preview ({productImages.length})
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {productImages.map((img, idx) => (
                          <div
                            key={idx}
                            className="relative w-16 h-20 rounded-xl overflow-hidden border-2 border-[#E94F91] bg-white group shadow-sm"
                          >
                            <img
                              src={img}
                              alt={`Upload preview ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                            {idx === 0 && (
                              <span className="absolute top-1 left-1 bg-[#E94F91] text-white text-[8px] font-black px-1 rounded uppercase">
                                Cover
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx)}
                              title="Remove photo"
                              className="absolute top-1 right-1 p-0.5 rounded-full bg-black/70 hover:bg-red-600 text-white transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Tagline / Subtitle */}
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

                {/* 5. Materials & Finishes */}
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

                {/* 6. Badges */}
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

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-4 border-t border-[#F1D6E2]">
                  <button
                    type="button"
                    onClick={() => setIsAddProductModalOpen(false)}
                    className="px-4 py-2 rounded-full border border-[#F1D6E2] text-xs font-bold text-[#806F77] hover:text-[#241B20]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-full bg-[#E94F91] text-white text-xs font-bold tracking-wider uppercase shadow-md hover:bg-[#C93673] transition-colors"
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
