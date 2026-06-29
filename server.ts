import express from 'express';
import { neon } from '@neondatabase/serverless';
import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';
import * as cheerio from 'cheerio';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { z } from 'zod';
import { db, seedDatabaseIfEmpty } from './src/db/db';
import { products, orders, orderItems } from './src/db/schema';
import { eq, inArray } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import cors from 'cors';
import sanitizeHtml from 'sanitize-html';
import logger from './src/utils/logger.js';

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env['NODE_ENV'] === 'production' ? false : '*' })); // Basic CORS
app.use(express.json());
app.use(morgan('combined', { stream: { write: (msg) => logger.info(msg.trim()) } }));

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Demasiados intentos de inicio de sesión. Espere 15 minutos.' },
});

const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hr
  max: 20, // 20 actions max per hour
  message: { error: 'Límite de solicitudes alcanzado.' },
});



// Resolve static paths
const dirName = typeof __dirname !== 'undefined' ? __dirname : process.cwd();

// Initialize Database & Seed
seedDatabaseIfEmpty().catch(err => console.error('DB Seed Error:', err.message));

// ==========================================
// ZOD VALIDATION SCHEMAS
// ==========================================

const productSaveSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "El nombre de la pieza es demasiado corto"),
  category: z.string().min(2, "La categoría es requerida"),
  price: z.number().positive("El precio de venta debe ser un número positivo"),
  description: z.string().min(10, "La descripción de autor debe tener al menos 10 caracteres"),
  rating: z.number().min(0).max(5).default(4.5),
  image: z.string().url("El enlace de la fotografía debe ser un URL válido"),
  material: z.string().optional().default(''),
  dimensions: z.string().optional().default(''),
  weight: z.string().optional().default(''),
  stock: z.number().int().nonnegative("La cantidad en stock no puede ser negativa"),
  status: z.enum(['draft', 'published', 'archived']).default('published'),
  publishDate: z.string().nullable().optional(),
  seo: z.object({
    slug: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    altText: z.string()
  }).optional(),
  aboutModel: z.string().optional(),
  features: z.string().optional(),
  specifications: z.string().optional(),
  variants: z.array(z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    stock: z.number(),
    image: z.string().optional()
  })).optional().default([]),
  gallery: z.array(z.string()).optional().default([]),
  badges: z.array(z.string()).optional().default([]),
});

const checkoutSchema = z.object({
  fullName: z.string().min(4, "El nombre de consignación debe tener al menos 4 caracteres"),
  email: z.string().email("La dirección de correo electrónico es inválida"),
  address: z.string().min(5, "La dirección residencial o fiscal es muy corta"),
  city: z.string().min(2, "La ciudad es obligatoria"),
  postalCode: z.string().regex(/^\d{5}$/, "El código postal de España/EU debe contener 5 dígitos numéricos"),
  couponCode: z.string().optional().nullable(),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().positive("La cantidad de adquisición debe ser mayor a cero"),
  })).min(1, "La pasarela requiere al menos una pieza en la cesta de compras"),
});


const JWT_SECRET = process.env['JWT_SECRET'];
if (!JWT_SECRET) {
  logger.error('CRITICAL SECURITY ERROR: JWT_SECRET environment variable is missing.');
  process.exit(1);
}

const verifyAdminToken = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) { res.status(401).json({ error: 'Acceso Denegado' }); return; }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Token inválido' }); return;
  }
};

app.post('/api/admin/login', loginLimiter, (req, res) => {
  const { username, password, botToken } = req.body;
  const adminUsername = process.env['ADMIN_USERNAME'] || 'admin';
  const adminHash = process.env['ADMIN_PASSWORD_HASH'] || '';

  if (!botToken || !botToken.startsWith('gshield_')) {
    logger.warn(`Intento de login bloqueado por anti-bot (formato inválido). IP: ${req.ip}`);
    res.status(403).json({ error: 'Acceso Denegado: Verificación anti-bot requerida.' });
    return;
  }

  // PoW Verification: "gshield_timestamp_nonce_hash"
  const parts = botToken.split('_');
  if (parts.length !== 4) {
    logger.warn(`Intento de login bloqueado por anti-bot (malformado). IP: ${req.ip}`);
    res.status(403).json({ error: 'Acceso Denegado: Token anti-bot inválido.' });
    return;
  }

  const [, timestampStr, nonceStr, providedHash] = parts;
  const timestamp = parseInt(timestampStr, 10);
  
  if (Date.now() - timestamp > 5 * 60 * 1000) {
    logger.warn(`Intento de login bloqueado por anti-bot (expirado). IP: ${req.ip}`);
    res.status(403).json({ error: 'Acceso Denegado: Token anti-bot expirado.' });
    return;
  }
  
  const hash = crypto.createHash('sha256').update(`${timestampStr}:${nonceStr}`).digest('hex');
  if (hash !== providedHash || !hash.startsWith('0000')) {
    logger.warn(`Intento de login bloqueado por anti-bot (PoW inválido). IP: ${req.ip}`);
    res.status(403).json({ error: 'Acceso Denegado: Prueba de trabajo inválida.' });
    return;
  }

  if (username === adminUsername && bcrypt.compareSync(password, adminHash)) {
    logger.info(`Login exitoso para usuario: ${username}`);
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } else {
    logger.warn(`Intento de login fallido para usuario: ${username}`);
    res.status(401).json({ error: 'Credenciales incorrectas' });
  }
});

// ==========================================
// SECURITY UTILITIES
// ==========================================
const sanitizeObject = (obj: any): any => {
  if (typeof obj === 'string') {
    return sanitizeHtml(obj, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        '*': ['class', 'id'],
      }
    });
  } else if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  } else if (obj !== null && typeof obj === 'object') {
    const sanitized: any = {};
    for (const key in obj) {
      sanitized[key] = sanitizeObject(obj[key]);
    }
    return sanitized;
  }
  return obj;
};

// ==========================================
// API REST ENDPOINTS
// ==========================================

// 1. Get all products from SQLite
app.get('/api/productos', async (req, res) => {
  try {
    const list = await db.select().from(products);
    
    // Parse JSON arrays for badges and reviews back to items for Angular consumers
    const formatted = list.map(p => ({
      ...p,
      gallery: p.gallery || [],
      seo: p.seo || {},
      variants: p.variants || [],
      badges: p.badges || [],
      reviews: p.reviews || []
    }));
    
    res.json(formatted);
  } catch (err: any) {
    res.status(500).json({ error: "Error de lectura de catálogo", details: err.message });
  }
});

// 1.5. Autocomplete product using Gemini AI
app.post('/api/productos/autocomplete', verifyAdminToken, apiLimiter, async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) { res.status(400).json({ error: 'URL is required' }); return; }

    if (!process.env['GEMINI_API_KEY']) {
      res.status(500).json({ error: 'GEMINI_API_KEY no está configurada en el archivo .env' }); return;
    }

    const ai = new GoogleGenAI({ apiKey: process.env['GEMINI_API_KEY'] });
    
    const prompt = `Analiza la información del producto en este link: ${url}. 
    Redacta la información para una tienda online de herramientas y maquinaria premium. Devuelve un objeto JSON estrictamente con 4 campos: 'description', 'aboutModel', 'features', y 'specifications'. Cada campo debe contener HTML básico (<p>, <ul>, <li>, <strong>) para dar formato al texto.
    - description: Una descripción comercial atractiva y técnica del producto.
    - aboutModel: Un resumen de por qué este modelo destaca (su ingeniería, diseño, resistencia).
    - features: Una lista HTML (<ul><li>...) de características y ventajas destacadas.
    - specifications: Una lista HTML (<ul><li>...) con las especificaciones técnicas o recomendaciones de seguridad.`;

    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: 'application/json',
      }
    });

    const output = result.text;
    if (output) {
      const parsed = JSON.parse(output);
      res.json(parsed);
    } else {
      throw new Error('Gemini no devolvió texto');
    }
  } catch (err: any) {
    console.error('Autocomplete Error:', err);
    res.status(500).json({ error: 'Error al procesar la URL con Inteligencia Artificial', details: err.message });
  }
});

// 2. Save or update product (Zod validated)
app.post('/api/productos/guardar', verifyAdminToken, async (req, res) => {
  try {
    const parsed = productSaveSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ 
        error: "Validación de producto fallida", 
        fields: parsed.error.flatten().fieldErrors 
      });
      return;
    }

    const data = sanitizeObject(parsed.data);
    const prodId = data.id || 'p-' + Math.random().toString(36).substring(2, 9);
    
    const fieldsToSave = {
      id: prodId,
      name: data.name,
      category: data.category,
      price: data.price,
      description: data.description,
      rating: data.rating,
      image: data.image,
      material: data.material,
      dimensions: data.dimensions,
      weight: data.weight,
      stock: data.stock,
      status: data.status,
      publishDate: data.publishDate || null,
      seo: data.seo || null,
      variants: data.variants || null,
      aboutModel: data.aboutModel || null,
      features: data.features || null,
      specifications: data.specifications || null,
      gallery: data.gallery,
      badges: data.badges,
    };

    // Check if product exists for upsert
    const existing = await db.select().from(products).where(eq(products.id, prodId));
    
    if (existing.length > 0) {
      // Keep existing reviews intact
      await db.update(products)
        .set({ ...fieldsToSave })
        .where(eq(products.id, prodId));
    } else {
      // New product initialized with default dummy reviews
      await db.insert(products).values({
        ...fieldsToSave,
        reviews: [
          { author: 'Sistema', stars: 5, date: new Date().toLocaleDateString(), comment: 'Producto añadido al catálogo' }
        ]
      }).returning();
    }

    const saved = (await db.select().from(products).where(eq(products.id, prodId)))[0];
    res.json({
      success: true,
      message: "Pieza guardada exitosamente en SQLite",
      product: {
        ...saved,
        badges: saved.badges || [],
        reviews: saved.reviews || []
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: "Error al guardar el producto", details: err.message });
  }
});

// 3. Process Checkout with rigorous stock allotment (Zod validated)
app.post('/api/checkout', apiLimiter, async (req, res) => {
  try {
    const parsed = checkoutSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        error: "Formulario de facturación inválido",
        fields: parsed.error.flatten().fieldErrors
      });
      return;
    }

    const { fullName, email, address, city, postalCode, couponCode, items } = sanitizeObject(parsed.data);
    
    // Extract unique product IDs
    const productIds = items.map((i: any) => i.productId);
    
    // Query direct database stock check
    const dbProductsList = await db.select().from(products).where(inArray(products.id, productIds));
    const productsMap = new Map(dbProductsList.map(p => [p.id, p]));

    // Thorough Inventory Validation before making insertions or updates
    const outOfStockItems: string[] = [];
    const insufficientStock: Array<{ name: string; requested: number; available: number }> = [];

    for (const item of items) {
      const prod = productsMap.get(item.productId);
      if (!prod) {
        res.status(400).json({ error: 'Producto no encontrado' }); return;
      }

      if (prod.stock === 0) {
        outOfStockItems.push(prod.name);
      } else if (prod.stock < item.quantity) {
        insufficientStock.push({
          name: prod.name,
          requested: item.quantity,
          available: prod.stock
        });
      }
    }

    // Reject transaction if any items are out or low in stock
    if (outOfStockItems.length > 0 || insufficientStock.length > 0) {
      let detailMsg = "Inventario insuficiente.";
      if (outOfStockItems.length > 0) {
        detailMsg += ` Artículos agotados: ${outOfStockItems.join(', ')}.`;
      }
      if (insufficientStock.length > 0) {
        detailMsg += ` Artículos con unidades insuficientes: ` +
          insufficientStock.map(i => `"${i.name}" (Solicitado: ${i.requested}, Disponible: ${i.available})`).join(', ');
      }

      res.status(400).json({ error: detailMsg }); return;
    }

    // Step 1: Deduct stocks inside SQLite
    for (const item of items) {
      const prod = productsMap.get(item.productId)!;
      const nextStock = prod.stock - item.quantity;
      await db.update(products).set({ stock: nextStock }).where(eq(products.id, item.productId));
    }

    // Step 2: Compute math for order authoritative invoice
    let subtotalValue = 0;
    const itemsWithPrices = items.map((i: any) => {
      const prod = productsMap.get(i.productId)!;
      subtotalValue += prod.price * i.quantity;
      return {
        productId: i.productId,
        name: prod.name,
        quantity: i.quantity,
        price: prod.price
      };
    });

    let discountPercent = 0;
    const cleanCoupon = (couponCode || '').trim().toUpperCase();
    if (cleanCoupon === 'NORDIC10') {
      discountPercent = 10;
    } else if (cleanCoupon === 'SÖDRA20') {
      discountPercent = 20;
    }

    const discountValue = subtotalValue * (discountPercent / 100);
    const subtotalAfterDiscount = subtotalValue - discountValue;
    const ivaValue = subtotalAfterDiscount * 0.21;
    const shippingValue = subtotalAfterDiscount > 300 ? 0 : (subtotalValue === 0 ? 0 : 15.00);
    const totalValue = subtotalAfterDiscount + ivaValue + shippingValue;

    // Step 3: Insert order record
    const orderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
    const today = new Date().toISOString().split('T')[0];

    await db.insert(orders).values({
      id: orderId,
      fullName,
      email,
      address,
      city,
      postalCode,
      date: today,
      subtotal: subtotalValue,
      discount: discountValue,
      total: totalValue,
      status: 'procesando'
    });

    // Step 4: Insert order line items
    for (const item of itemsWithPrices) {
      await db.insert(orderItems).values({
        orderId,
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      });
    }

    res.json({
      success: true,
      orderId,
      invoice: {
        date: today,
        subtotal: subtotalValue,
        discount: discountValue,
        iva: ivaValue,
        shipping: shippingValue,
        total: totalValue,
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: "No se pudo procesar la entrega", details: err.message });
  }
});

// 4. Get all orders with their respective line items (CRM Admin panel backend loading)
app.get('/api/orders', verifyAdminToken, async (req, res) => {
  try {
    const listOrders = await db.select().from(orders);
    
    // Stitch line items for each order
    const result = [];
    for (const o of listOrders) {
      const items = await db.select().from(orderItems).where(eq(orderItems.orderId, o.id));
      result.push({
        ...o,
        items: items.map(i => ({
          name: i.name,
          quantity: i.quantity,
          price: i.price
        }))
      });
    }

    // Sort by order date descending
    result.sort((a,b) => b.id.localeCompare(a.id));

    res.json(result);
  } catch (err: any) {
    res.status(505).json({ error: "Error de lectura de órdenes", details: err.message });
  }
});

// 5. Update order status
app.patch('/api/orders/:id/status', verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['completado', 'procesando', 'enviado'].includes(status)) {
      res.status(400).json({ error: 'Estado inválido' }); return;
    }

    await db.update(orders).set({ status }).where(eq(orders.id, id));
    logger.info(`Administrador actualizó estado del pedido ${id} a ${status}`);
    res.json({ success: true, message: `Orden ${id} corregida con éxito` });
  } catch (err: any) {
    res.status(500).json({ error: "No se pudo actualizar estado", details: err.message });
  }
});

// 6. Delete order (references cascade delete)
app.delete('/api/orders/:id', verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    await db.delete(orders).where(eq(orders.id, id));
    logger.warn(`Administrador eliminó el pedido ${id} del sistema`);
    res.json({ success: true, message: `Pedido ${id} removido del panel de control` });
  } catch (err: any) {
    res.status(500).json({ error: "No se pudo eliminar el registro", details: err.message });
  }
});

// 7. Delete product
app.delete('/api/productos/:id', verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    await db.delete(products).where(eq(products.id, id));
    res.json({ success: true, message: `Producto ${id} eliminado del catálogo` });
  } catch (err: any) {
    res.status(500).json({ error: "No se pudo eliminar el producto", details: err.message });
  }
});


// ==========================================
// STATIC FRONTEND SERVING (PRODUCTION MODE)
// ==========================================

// Point static files to Angular output directory
// Angular workspace builds to /dist/app or /dist/app/browser
const angularBuildPath = path.join(dirName, 'dist', 'app');
app.use(express.static(angularBuildPath));

// Fallback all non-API paths directly to compiled Angular routing index
app.get(/^(.*)$/, async (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  
  const indexHtmlPath = path.join(angularBuildPath, 'index.html');

  // Server-Side Dynamic Meta Injection for Product Detail pages
  if (req.path.startsWith('/producto/')) {
    const id = req.path.split('/')[2];
    if (id) {
      try {
        const prod = await db.select().from(products).where(eq(products.id, id));
        if (prod && prod.length > 0) {
          const p = prod[0];
          let html = fs.readFileSync(indexHtmlPath, 'utf8');
          
          const ogTags = `
    <title>${p.name} - Glastor</title>
    <meta name="description" content="${p.description}">
    <meta property="og:title" content="${p.name} - Glastor">
    <meta property="og:description" content="${p.description}">
    <meta property="og:image" content="${p.image}">
    <meta property="og:type" content="product">
    <meta property="og:url" content="https://glastor.com/producto/${p.id}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="${p.image}">
  </head>`;
          
          html = html.replace(/<title>.*?<\/title>/, ''); // Remove existing title if any
          html = html.replace('</head>', ogTags); // Inject right before head closes
          
          return res.send(html);
        }
      } catch (err) {
        logger.error(`Error in SEO injection for ${id}:`, err);
      }
    }
  }

  // Deliver generic index if not product or product not found
  res.sendFile(indexHtmlPath, (err) => {
    if (err) {
      // If index not found or compiled yet: friendly boot state
      res.status(200).send(`
        <html>
          <head>
            <title>SÖDRA Workspace Booting</title>
            <script>setTimeout(() => window.location.reload(), 1500);</script>
            <style>body { font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; background: #fafafa; margin: 0; color: #555; }</style>
          </head>
          <body>
            <div style="text-align: center;"> Booting SÖDRA Scandinavian Engine. Refrescando en segundos... </div>
          </body>
        </html>
      `);
    }
  });
});

// Start listening safely
const port = process.env['PORT'] || 3000;
if (process.env['NODE_ENV'] !== 'production' || (!process.env['VERCEL'] && !process.env['VERCEL_URL'])) {
  app.listen(port, () => {
    console.log(`🚀 SÖDRA Backend Server running on port ${port}`);
    console.log(`📂 Serving static client assets from: ${angularBuildPath}`);
  });
}

export default app;
