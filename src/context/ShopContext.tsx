import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, CustomerOrder, CustomerInquiry, OrderStatus } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';

interface Toast {
  id: string;
  message: string;
  subtext?: string;
}

interface ShopContextType {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  removeFromCart: (productId: string, selectedColor?: string, selectedSize?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, selectedColor?: string, selectedSize?: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  // Modals & Navigation
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  lastConfirmedOrder: { orderId: string; items: CartItem[]; total: number } | null;
  setLastConfirmedOrder: (order: { orderId: string; items: CartItem[]; total: number } | null) => void;

  // Toast
  toasts: Toast[];
  showToast: (message: string, subtext?: string) => void;

  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (cat: string) => void;
  navigateToShopCategory: (category: string) => void;

  // Products state (can be edited/added/deleted by admin)
  products: Product[];
  updateProduct: (updated: Product) => void;
  addProduct: (newProduct: Product) => void;
  deleteProduct: (productId: string) => void;
  clearAllProducts: () => void;

  // Orders state
  orders: CustomerOrder[];
  addCustomerOrder: (order: Omit<CustomerOrder, 'id' | 'createdAt' | 'status'>) => CustomerOrder;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  clearAllOrders: () => void;

  // Inquiries state
  inquiries: CustomerInquiry[];
  addInquiry: (inquiry: Omit<CustomerInquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: 'New' | 'In Progress' | 'Resolved') => void;

  // Admin Portal State
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAdminLoggedIn: boolean;
  adminLogin: (user: string, pass: string) => boolean;
  adminLogout: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // All products removed as requested
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      localStorage.removeItem('flora_luxe_products');
      localStorage.removeItem('flora_luxe_products_rs');
      const saved = localStorage.getItem('flora_luxe_products_clean');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      localStorage.removeItem('flora_luxe_cart');
      return [];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      localStorage.removeItem('flora_luxe_wishlist');
      return [];
    } catch {
      return [];
    }
  });

  // Orders: Empty
  const [orders, setOrders] = useState<CustomerOrder[]>(() => {
    try {
      localStorage.removeItem('flora_luxe_orders');
      const saved = localStorage.getItem('flora_luxe_orders_pkr');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Inquiries
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('flora_luxe_inquiries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Admin Auth State: Locked by default for security, requires password every time
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      localStorage.removeItem('flora_admin_authenticated');
    } catch {}
    return false;
  });
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [lastConfirmedOrder, setLastConfirmedOrder] = useState<{
    orderId: string;
    items: CartItem[];
    total: number;
  } | null>(null);

  // Sync products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('flora_luxe_products_clean', JSON.stringify(products));
    } catch {}
  }, [products]);

  // Sync cart
  useEffect(() => {
    try {
      localStorage.setItem('flora_luxe_cart_v2', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // Sync wishlist
  useEffect(() => {
    try {
      localStorage.setItem('flora_luxe_wishlist_v2', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  // Sync orders
  useEffect(() => {
    try {
      localStorage.setItem('flora_luxe_orders_pkr', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  // Sync inquiries
  useEffect(() => {
    try {
      localStorage.setItem('flora_luxe_inquiries', JSON.stringify(inquiries));
    } catch {}
  }, [inquiries]);

  const showToast = (message: string, subtext?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, subtext }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    const color = selectedColor || (product.colors && product.colors[0]?.name);
    const size = selectedSize || (product.sizes && product.sizes[0]);

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [...prev, { product, quantity, selectedColor: color, selectedSize: size }];
    });

    showToast('Added to Shopping Bag', `${product.name} (${quantity})`);
  };

  const removeFromCart = (
    productId: string,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
          )
      )
    );
  };

  const updateCartQuantity = (
    productId: string,
    quantity: number,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor, selectedSize);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    const exists = wishlist.includes(productId);
    const product = products.find((p) => p.id === productId);
    if (exists) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      showToast('Removed from Wishlist', product?.name);
    } else {
      setWishlist((prev) => [...prev, productId]);
      showToast('Saved to Wishlist', product?.name);
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const navigateToShopCategory = (category: string) => {
    setSelectedCategoryFilter(category);
    setActiveTab('shop');
    const el = document.getElementById('shop');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Product mutations
  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast('Catalog Updated', `${updated.name} modified successfully`);
  };

  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast('Product Created', `${newProduct.name} added to catalog`);
  };

  const deleteProduct = (productId: string) => {
    const target = products.find((p) => p.id === productId);
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    setWishlist((prev) => prev.filter((id) => id !== productId));
    showToast('Product Deleted', target ? `${target.name} removed from catalog` : 'Item removed');
  };

  const clearAllProducts = () => {
    setProducts([]);
    setCart([]);
    setWishlist([]);
    try {
      localStorage.removeItem('flora_luxe_products_clean');
      localStorage.removeItem('flora_luxe_products_rs');
      localStorage.removeItem('flora_luxe_products');
    } catch {}
    showToast('Catalog Cleared', 'All products have been removed');
  };

  // Order mutations
  const addCustomerOrder = (orderData: Omit<CustomerOrder, 'id' | 'createdAt' | 'status'>) => {
    const newOrder: CustomerOrder = {
      ...orderData,
      id: `ord-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'Pending'
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast('Order Status Updated', `Status set to ${status}`);
  };

  const clearAllOrders = () => {
    setOrders([]);
    try {
      localStorage.removeItem('flora_luxe_orders');
      localStorage.removeItem('flora_luxe_orders_pkr');
    } catch {}
    showToast('Orders Cleared', 'All order records have been reset');
  };

  // Inquiry mutations
  const addInquiry = (data: Omit<CustomerInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: CustomerInquiry = {
      ...data,
      id: `inq-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'New'
    };
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: 'New' | 'In Progress' | 'Resolved') => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
    showToast('Inquiry Updated', `Status marked as ${status}`);
  };

  // Admin login check with strict master password
  const adminLogin = (user: string, pass: string): boolean => {
    const normalizedUser = user.trim().toLowerCase();
    const normalizedPass = pass.trim();

    const validUsernames = ['admin', 'flora.admin', 'floraluxe', 'noor', 'noorfatima'];

    if (
      validUsernames.includes(normalizedUser) &&
      normalizedPass === 'flora@luxe2026'
    ) {
      setIsAdminLoggedIn(true);
      showToast('Welcome, Administrator', 'Access granted to FLORA LUXE Portal');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    showToast('Signed Out', 'Admin session ended securely');
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        selectedProduct,
        setSelectedProduct,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        isCheckoutOpen,
        setIsCheckoutOpen,
        lastConfirmedOrder,
        setLastConfirmedOrder,
        toasts,
        showToast,
        activeTab,
        setActiveTab,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        navigateToShopCategory,
        products,
        updateProduct,
        addProduct,
        deleteProduct,
        clearAllProducts,
        orders,
        addCustomerOrder,
        updateOrderStatus,
        clearAllOrders,
        inquiries,
        addInquiry,
        updateInquiryStatus,
        isAdminOpen,
        setIsAdminOpen,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
