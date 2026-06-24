import { pgTable, varchar, text, integer, real, jsonb, timestamp, serial } from 'drizzle-orm/pg-core';

// Products Table
export const products = pgTable('products', {
  id: varchar('id', { length: 50 }).primaryKey(),
  name: text('name').notNull(),
  category: varchar('category', { length: 50 }).notNull(), // 'decoracion' | 'muebles' | 'iluminacion' | 'accesorios' (or tec...)
  price: real('price').notNull(),
  description: text('description').notNull(),
  rating: real('rating').notNull().default(4.5),
  image: text('image').notNull(),
  status: varchar('status', { length: 20 }).notNull().default('published'), // 'draft' | 'published' | 'archived'
  publishDate: text('publishDate'),
  seo: jsonb('seo'), // { slug, metaTitle, metaDescription, altText }
  variants: jsonb('variants'), // Array of variant objects
  gallery: jsonb('gallery'), // JSON array of strings
  badges: jsonb('badges'), // JSON array of strings
  material: text('material').notNull(),
  dimensions: text('dimensions').notNull(),
  weight: text('weight').notNull(),
  stock: integer('stock').notNull().default(0),
  reviews: jsonb('reviews'), // JSON array of { author: string; stars: number; date: string; comment: string }
  aboutModel: text('about_model'),
  features: text('features'),
  specifications: text('specifications'),
});

// Orders Table
export const orders = pgTable('orders', {
  id: varchar('id', { length: 50 }).primaryKey(),
  fullName: text('fullName').notNull(),
  email: text('email').notNull(),
  address: text('address').notNull(),
  city: text('city').notNull(),
  postalCode: text('postalCode').notNull(),
  date: text('date').notNull(),
  subtotal: real('subtotal').notNull(),
  discount: real('discount').notNull(),
  total: real('total').notNull(),
  status: varchar('status', { length: 50 }).notNull().default('procesando'), // 'completado' | 'procesando' | 'enviado'
});

// Order Items Table (relies on referential integrity)
export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: varchar('order_id', { length: 50 })
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  productId: varchar('product_id', { length: 50 })
    .notNull()
    .references(() => products.id),
  name: text('name').notNull(),
  quantity: integer('quantity').notNull(),
  price: real('price').notNull(),
});
