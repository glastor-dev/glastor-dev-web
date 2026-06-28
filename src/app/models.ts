export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  rating: number;
  image: string;
  badges?: string[];
  material: string;
  dimensions: string;
  weight: string;
  stock: number;
  reviews: Array<{ author: string; stars: number; date: string; comment: string }>;
  gallery?: string[];
  status?: 'draft' | 'published' | 'archived';
  publishDate?: string;
  seo?: { slug: string; metaTitle: string; metaDescription: string; altText: string };
  aboutModel?: string;
  features?: string;
  specifications?: string;
  variants?: Array<{ id: string; name: string; price: number; stock: number; image?: string }>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title?: string;
  message: string;
}

export interface SitemapURL {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export interface Order {
  id: string;
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  date: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  subtotal: number;
  discount: number;
  total: number;
  status: 'completado' | 'procesando' | 'enviado';
}
