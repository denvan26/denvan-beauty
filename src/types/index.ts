export interface Product {
  id: string;
  name: string;
  slug: string;
  category: Category;
  price: number;
  priceMax?: number;
  originalPrice?: number;
  description: string;
  ingredients: string;
  benefits: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  badge?: string;
  sameDayDelivery: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  inStock: boolean;
}

export type Category =
  | "skincare"
  | "haircare"
  | "makeup"
  | "body-care"
  | "accessories";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
}
