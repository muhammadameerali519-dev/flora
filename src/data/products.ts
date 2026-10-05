import jewelryImg from '../assets/images/collection_fine_jewelry_1791174372117.jpg';
import handbagImg from '../assets/images/collection_luxury_handbag_1791174383410.jpg';
import beautyImg from '../assets/images/collection_skincare_beauty_1791174393986.jpg';

export { jewelryImg, handbagImg, beautyImg };

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'Jewelry' | 'Accessories' | 'Beauty' | 'Fashion';
  price: number;
  originalPrice?: number;
  description: string;
  details: string[];
  materials: string;
  images: string[];
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  badge?: string;
  rating: number;
  reviewCount: number;
}

export interface Collection {
  id: string;
  title: string;
  tagline: string;
  category: string;
  image: string;
  itemCount: number;
}

export const COLLECTIONS: Collection[] = [
  {
    id: 'jewelry',
    title: 'JEWELRY',
    tagline: 'Pieces crafted to shine with quiet brilliance.',
    category: 'Jewelry',
    image: jewelryImg,
    itemCount: 0,
  },
  {
    id: 'accessories',
    title: 'ACCESSORIES',
    tagline: 'Feminine grace in every stitch and silhouette.',
    category: 'Accessories',
    image: handbagImg,
    itemCount: 0,
  },
  {
    id: 'beauty',
    title: 'BEAUTY',
    tagline: 'Everyday luxury, beautifully curated.',
    category: 'Beauty',
    image: beautyImg,
    itemCount: 0,
  },
  {
    id: 'new-arrivals',
    title: 'NEW ARRIVALS',
    tagline: "Discover what's new at FLORA LUXE.",
    category: 'New Arrivals',
    image: jewelryImg,
    itemCount: 0,
  },
];

// All products cleared as requested
export const PRODUCTS: Product[] = [];

export const SOCIAL_POSTS = [
  {
    id: 'post-1',
    handle: '@flora.luxe44',
    image: jewelryImg,
    caption: 'Soft sunlight, fine jewelry, and the delicate glow of Rose Lumière. #FloraLuxe #QuietLuxury',
    likes: '4.8k',
  },
  {
    id: 'post-2',
    handle: '@flora.luxe44',
    image: jewelryImg,
    caption: 'Crafted to be cherished forever. 18K solid rose gold with hand-cut brilliance. #FloraJewelry',
    likes: '6.2k',
  },
  {
    id: 'post-3',
    handle: '@flora.luxe44',
    image: handbagImg,
    caption: 'The Pétale Clutch in our signature blush calfskin. Elegance that speaks for itself. #HandbagLove',
    likes: '8.1k',
  },
  {
    id: 'post-4',
    handle: '@flora.luxe44',
    image: beautyImg,
    caption: 'Morning rituals with Essence de Rose. Pure botanical radiance for glass-smooth skin. #FloraBeauty',
    likes: '5.4k',
  },
  {
    id: 'post-5',
    handle: '@flora.luxe44',
    image: handbagImg,
    caption: 'Behind the scenes at our atelier. Discover the new collection online now. #HauteCouture',
    likes: '9.3k',
  },
  {
    id: 'post-6',
    handle: '@flora.luxe44',
    image: jewelryImg,
    caption: 'Timeless heirlooms for modern muses. Bespoke concierge available on WhatsApp. #BespokeLuxury',
    likes: '3.9k',
  },
  {
    id: 'post-7',
    handle: '@flora.luxe44',
    image: handbagImg,
    caption: 'Sculpted calfskin details in our signature powder rose palette. #MaisonFlora',
    likes: '5.1k',
  },
  {
    id: 'post-8',
    handle: '@flora.luxe44',
    image: beautyImg,
    caption: 'Subtle strength, quiet confidence, and delicate craftsmanship. #FloraLuxeStyle',
    likes: '7.4k',
  },
  {
    id: 'post-9',
    handle: '@flora.luxe44',
    image: beautyImg,
    caption: 'The art of modern self-care. Clean botanical extracts harvested with care. #FloraGlow',
    likes: '6.8k',
  },
];
