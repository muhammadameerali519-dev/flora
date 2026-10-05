export type ProductCategory = 'Jewelry' | 'Accessories' | 'Beauty' | 'Fashion';

export interface ProductVariant {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  description: string;
  details: string[];
  materials: string;
  images: string[];
  colors?: ProductVariant[];
  sizes?: string[];
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  badge?: string;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface CollectionItem {
  id: string;
  title: string;
  tagline: string;
  category: ProductCategory | 'New Arrivals';
  image: string;
  itemCount: number;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Dispatched' | 'Delivered' | 'Cancelled';

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  specialInstructions?: string;
  items: CartItem[];
  total: number;
  paymentMethod: string;
  status: OrderStatus;
}

export interface CustomerInquiry {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: 'New' | 'In Progress' | 'Resolved';
}
