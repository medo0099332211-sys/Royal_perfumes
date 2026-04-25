export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  fullDescription: string;
  images: string[];
  category: string;
  featured: boolean;
  discount?: number;
  inStock: boolean;
  rating: number;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  volume: string;
}

export interface AdminUser {
  username: string;
  password: string;
}
