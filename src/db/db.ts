import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import { eq, sql as drizzleSql } from 'drizzle-orm';
import 'dotenv/config';

// Connect to Neon Postgres Serverless
const sql = neon(process.env['DATABASE_URL'] || '');
export const db = drizzle(sql, { schema });

// Zero-Configuration schema sync via raw SQL executed on Postgres
export async function ensureSchemaExists() {
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id VARCHAR(50) PRIMARY KEY,
      name TEXT NOT NULL,
      category VARCHAR(50) NOT NULL,
      price REAL NOT NULL,
      description TEXT NOT NULL,
      rating REAL NOT NULL DEFAULT 4.5,
      image TEXT NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'published',
      "publishDate" TEXT,
      seo JSONB,
      variants JSONB,
      gallery JSONB,
      badges JSONB,
      material TEXT NOT NULL,
      dimensions TEXT NOT NULL,
      weight TEXT NOT NULL,
      stock INTEGER NOT NULL DEFAULT 0,
      reviews JSONB
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id VARCHAR(50) PRIMARY KEY,
      "fullName" TEXT NOT NULL,
      email TEXT NOT NULL,
      address TEXT NOT NULL,
      city TEXT NOT NULL,
      "postalCode" TEXT NOT NULL,
      date TEXT NOT NULL,
      subtotal REAL NOT NULL,
      discount REAL NOT NULL,
      total REAL NOT NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'procesando'
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS order_items (
      id SERIAL PRIMARY KEY,
      order_id VARCHAR(50) NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      product_id VARCHAR(50) NOT NULL REFERENCES products(id),
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      price REAL NOT NULL
    );
  `;
}


// Seed the database with modern high-fidelity products if empty
export async function seedDatabaseIfEmpty() {
  await ensureSchemaExists();
  let shouldReseed = false;
  try {
    const productsCount = await db.select({ count: drizzleSql<number>`cast(count(*) as integer)` }).from(schema.products);
    if (productsCount[0].count < 30) {
      shouldReseed = true;
    }
  } catch (err) {
    shouldReseed = true;
  }

  if (shouldReseed) {
    console.log('🌱 Reseeding Neon PostgreSQL database with 30 tech & tools products...');
    await sql`DELETE FROM order_items;`;
    await sql`DELETE FROM orders;`;
    await sql`DELETE FROM products;`;

    const initialProducts = [
      {
        id: 'p1',
        name: 'Smart TV Samsung Neo QLED 65" 4K',
        category: 'tecnologia',
        price: 1299.00,
        description: 'Televisor inteligente de 65 pulgadas con tecnología Quantum Matrix, procesador Neo Quantum 4K, y sonido Dolby Atmos.',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80',
        badges: JSON.stringify(['4K UHD', 'Neo QLED', 'Envío Gratis']),
        material: 'Aluminio y componentes electrónicos',
        dimensions: '144.6 x 82.8 x 2.5 cm',
        weight: '24.2 kg',
        stock: 15,
        reviews: JSON.stringify([{ author: 'Marcos R.', stars: 5, date: '12 de Jun, 2026', comment: 'El contraste de negros y el brillo Dolby Atmos superaron mis expectativas.' }])
      },
      {
        id: 'p2',
        name: 'Smart TV LG OLED Evo C3 55"',
        category: 'tecnologia',
        price: 1149.00,
        description: 'Pantalla OLED con píxeles autoiluminados, procesador inteligente a9 Gen6 4K, 120Hz nativos y soporte completo para NVIDIA G-Sync.',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=600&q=80',
        badges: JSON.stringify(['G-Sync', 'OLED Evo']),
        material: 'Polímeros compuestos reforzados',
        dimensions: '122.2 x 70.3 x 4.5 cm',
        weight: '16.0 kg',
        stock: 8,
        reviews: JSON.stringify([{ author: 'Sofía P.', stars: 5, date: '15 de Jun, 2026', comment: 'Para gaming es increíble, los 120Hz con VRR van súper suaves.' }])
      },
      {
        id: 'p3',
        name: 'Smart TV Xiaomi Fire TV 43" UHD',
        category: 'tecnologia',
        price: 349.00,
        description: 'Excelente televisor 4K Ultra HD con sistema Fire TV integrado, control por voz Alexa y colores realistas HDR10.',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80',
        badges: JSON.stringify(['Precio Calidad', 'Alexa Home']),
        material: 'Plástico ABS, Perfiles de metal ligero',
        dimensions: '95.7 x 56.3 x 8.0 cm',
        weight: '6.9 kg',
        stock: 20,
        reviews: JSON.stringify([{ author: 'Lucio T.', stars: 4, date: '10 de May, 2026', comment: 'Por este precio la resolución 4K y la integración con Alexa es fabulosa.' }])
      },
      {
        id: 'p4',
        name: 'Apple iPhone 15 Pro Max 256GB',
        category: 'tecnologia',
        price: 1450.00,
        description: 'Diseño de titanio de grado aeroespacial, chip A17 Pro ultra potente, sistema de cámaras avanzado con zoom de 5x y puerto USB-C.',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80',
        badges: JSON.stringify(['Titanio', 'Zoom 5x', 'Top Ventas']),
        material: 'Titanio aeroespacial, Vidrio mate',
        dimensions: '15.9 x 7.67 x 0.82 cm',
        weight: '221 g',
        stock: 12,
        reviews: JSON.stringify([{ author: 'Esteban M.', stars: 5, date: '01 de Jun, 2026', comment: 'La duración de la batería es increíble y el titanio se siente sumamente premium.' }])
      },
      {
        id: 'p5',
        name: 'Apple iPhone 14 128GB Midnight',
        category: 'tecnologia',
        price: 849.00,
        description: 'Procesador A15 Bionic superpotente, cámara dual avanzada con Modo Cine, detección de choques y pantalla Super Retina XDR.',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80',
        badges: JSON.stringify(['iPhone popular']),
        material: 'Aluminio de grado aeroespacial',
        dimensions: '14.67 x 7.15 x 0.78 cm',
        weight: '172 g',
        stock: 18,
        reviews: JSON.stringify([{ author: 'Camila H.', stars: 4, date: '28 de May, 2026', comment: 'Fotos excelentes de noche y un tamaño súper cómodo.' }])
      },
      {
        id: 'p6',
        name: 'Notebook ASUS ROG Zephyrus G14',
        category: 'tecnologia',
        price: 1999.00,
        description: 'La laptop gaming ultraportátil número uno. Equipada con procesador AMD Ryzen 9, gráfica NVIDIA RTX 4070 y pantalla ROG Nebula HDR.',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80',
        badges: JSON.stringify(['Gamers Choice', 'Ultraportátil']),
        material: 'Chasis de aleación de magnesio y aluminio',
        dimensions: '31.2 x 22.7 x 1.95 cm',
        weight: '1.72 kg',
        stock: 6,
        reviews: JSON.stringify([{ author: 'Nicolás D.', stars: 5, date: '05 de Jun, 2026', comment: 'Rendimiento bestial en un cuerpo tan compacto y ligero.' }])
      },
      {
        id: 'p7',
        name: 'Notebook Lenovo Legion 5 Pro',
        category: 'tecnologia',
        price: 1549.00,
        description: 'Potente laptop con pantalla QHD de 16 pulgadas a 165Hz, procesador Intel Core i7, tarjeta gráfica NVIDIA RTX 4060.',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80',
        badges: JSON.stringify(['165Hz Premium']),
        material: 'Aluminio cepillado, Resina reforzada',
        dimensions: '36.3 x 26.0 x 2.2 cm',
        weight: '2.5 kg',
        stock: 10,
        reviews: JSON.stringify([{ author: 'Martín S.', stars: 5, date: '14 de May, 2026', comment: 'La pantalla en relación de aspecto 16:10 es perfecta.' }])
      },
      {
        id: 'p8',
        name: 'Apple MacBook Pro 14" M3',
        category: 'tecnologia',
        price: 1899.00,
        description: 'Notebook profesional con chip de última generación Apple M3, 16GB de memoria unificada, 512GB SSD y pantalla Liquid Retina XDR.',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
        badges: JSON.stringify(['Chip M3', 'Batería Pro']),
        material: 'Aluminio 100% reciclado',
        dimensions: '31.2 x 22.1 x 1.55 cm',
        weight: '1.55 kg',
        stock: 7,
        reviews: JSON.stringify([{ author: 'Catalina R.', stars: 5, date: '03 de Jun, 2026', comment: 'Silenciosa, no calienta nada y la batería dura días.' }])
      },
      {
        id: 'p9',
        name: 'Notebook Dell XPS 13 Ultrabook',
        category: 'tecnologia',
        price: 1399.00,
        description: 'La máxima expresión de sofisticación informática. Cuenta con procesador Intel Core i5 de 13a generación, pantalla táctil FHD infinityEdge.',
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80',
        badges: JSON.stringify(['Ultrabook', 'InfinityEdge']),
        material: 'Aluminio mecanizado CNC sólido y fibra de carbono',
        dimensions: '29.5 x 19.9 x 1.4 cm',
        weight: '1.2 kg',
        stock: 11,
        reviews: JSON.stringify([{ author: 'Federico M.', stars: 4, date: '22 de Abr, 2026', comment: 'El teclado es espectacular y cabe en cualquier mochila.' }])
      },
      {
        id: 'p10',
        name: 'Taladro Percutor Makita 18V LXT',
        category: 'herramientas',
        price: 219.00,
        description: 'Taladro percutor inalámbrico profesional de alto rendimiento con motor de 4 polos, par de apriete máximo de 62 Nm y dos velocidades mecánicas.',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbad4?auto=format&fit=crop&w=600&q=80',
        badges: JSON.stringify(['Makita Pro', 'Brushless 18V']),
        material: 'Polímero acorazado, engranajes metálicos',
        dimensions: '18.5 x 7.9 x 24.9 cm',
        weight: '1.7 kg',
        stock: 14,
        reviews: JSON.stringify([{ author: 'Gastón A.', stars: 5, date: '08 de Jun, 2026', comment: 'Robusto, potente y las baterías de 18V duran muchísimo.' }])
      },
      {
        id: 'p11',
        name: 'Sierra Circular Makita 1200W',
        category: 'herramientas',
        price: 145.00,
        description: 'Cortadora circular manual potente y ligera con base de aluminio protectora, profundidad de corte ajustable hasta 66mm.',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80',
        badges: JSON.stringify(['Precisión', 'Disco Incluido']),
        material: 'Aluminio de fundición',
        dimensions: '30.9 x 23.2 x 25.5 cm',
        weight: '4.0 kg',
        stock: 9,
        reviews: JSON.stringify([{ author: 'Javier B.', stars: 5, date: '19 de May, 2026', comment: 'Cortes limpios en roble y pino cepillado.' }])
      },
      {
        id: 'p12',
        name: 'Amoladora Angular Total 750W',
        category: 'herramientas',
        price: 49.00,
        description: 'Esmeriladora angular compacta con protector de disco reajustable, empuñadura auxiliar antivibradora y bloqueo de husillo.',
        rating: 4.4,
        image: 'https://images.unsplash.com/photo-1534224039826-c7a0dea0e66a?auto=format&fit=crop&w=600&q=80',
        badges: JSON.stringify(['Super Económica']),
        material: 'Carcasa polimérica robusta, motor con aislamiento',
        dimensions: '28 x 12 x 10 cm',
        weight: '1.9 kg',
        stock: 25,
        reviews: JSON.stringify([{ author: 'Guillermo F.', stars: 4, date: '04 de Jun, 2026', comment: 'Sorprendente potencia para trabajos pequeños de bricolaje.' }])
      },
      {
        id: 'p13',
        name: 'Taladro de Impacto Total 850W Pro',
        category: 'herramientas',
        price: 69.00,
        description: 'Taladro eléctrico con velocidad variable y función de inversión. Equipado con mandril de cremallera metálica de alta sujeción de 13mm.',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=600&q=80',
        badges: JSON.stringify(['Profesional']),
        material: 'Cuerpo de engranaje metálico, plástico ABS',
        dimensions: '29 x 20 x 7 cm',
        weight: '2.1 kg',
        stock: 22,
        reviews: JSON.stringify([{ author: 'Ramiro J.', stars: 5, date: '21 de May, 2026', comment: 'Perfora mampostería gruesa sin esfuerzo.' }])
      },
      {
        id: 'p14',
        name: 'Soldadora Inverter Lüsqtoff Iron-100',
        category: 'herramientas',
        price: 125.00,
        description: 'Equipo de soldadura inverter de electrodo revestido MMA. Tecnología IGBT avanzada de alto ciclo de trabajo en tamaño ultra compacto.',
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
        badges: JSON.stringify(['Inverter IGBT', 'Lüsqtoff Iron']),
        material: 'Gabinete de chapa de acero soldado con protección térmica',
        dimensions: '22 x 10 x 15 cm',
        weight: '3.2 kg',
        stock: 12,
        reviews: JSON.stringify([{ author: 'Héctor L.', stars: 5, date: '11 de Jun, 2026', comment: 'Muy portátil y suelda de manera impecable.' }])
      },
      {
        id: 'p15',
        name: 'Compresor de Aire Lüsqtoff 50L',
        category: 'herramientas',
        price: 249.00,
        description: 'Compresor de aire con tanque de 50 litros, motor de inducción de 2.0HP y doble salida regulada con manómetros de alta precisión.',
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
        badges: JSON.stringify(['Tanque 50L', 'Uso Taller']),
        material: 'Tanque de acero al carbono probado para presión',
        dimensions: '68 x 35 x 62 cm',
        weight: '26.0 kg',
        stock: 8,
        reviews: JSON.stringify([{ author: 'Oscar B.', stars: 4, date: '29 de May, 2026', comment: 'Excelente caudal para pintar y sopletear.' }])
      },
      {
        id: 'p16',
        name: 'Rotomartillo SDS Plus Bosch GBH',
        category: 'herramientas',
        price: 189.00,
        description: 'Herramienta industrial Bosch alemana con motor de 650W y fuerza de impacto de 1.7 Joules. Tres funciones: percusión, taladro y cincelado.',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1540105062147-37ea887ef920?auto=format&fit=crop&w=600&q=80',
        badges: JSON.stringify(['Bosch Professional', 'Fuerza SDS']),
        material: 'Carcasa de resina sintética, embrague mecánico',
        dimensions: '32.5 x 21.2 x 8.0 cm',
        weight: '2.3 kg',
        stock: 15,
        reviews: JSON.stringify([{ author: 'Andrés G.', stars: 5, date: '01 de Jun, 2026', comment: 'Incomparable para hacer canaletas de ladrillo macizo.' }])
      },
      {
        id: 'p17',
        name: 'Lijadora Orbital Bosch GSS 140',
        category: 'herramientas',
        price: 85.00,
        description: 'Lijadora de acabado manual ergonómica y de bajas vibraciones, con robusto sistema Easy Fit de sujeción para papel de lija o velcro.',
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
        badges: JSON.stringify(['Fijación Premium', 'Anti polvillo']),
        material: 'Placa base de aluminio reforzado, mangos blandos',
        dimensions: '21 x 11 x 14 cm',
        weight: '1.2 kg',
        stock: 20,
        reviews: JSON.stringify([{ author: 'Claudio K.', stars: 4, date: '21 de May, 2026', comment: 'Deja terminaciones fantásticas listas para barnizar.' }])
      },
      {
        id: 'p18',
        name: 'Llave de Impacto Milwaukee M18',
        category: 'herramientas',
        price: 389.00,
        description: 'Estupendo torque de apriete de 1354 Nm, motor sin carbones Brushless POWERSTATE para uso rudo industrial mecánico.',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=600&q=80',
        badges: JSON.stringify(['Heavy Duty', 'Alto Torque', 'M18 Fuel']),
        material: 'Acero forjado de alta resistencia',
        dimensions: '22.4 x 8.0 x 24.1 cm',
        weight: '3.3 kg',
        stock: 5,
        reviews: JSON.stringify([{ author: 'Hernán M.', stars: 5, date: '05 de Jun, 2026', comment: 'Afloja pernos de camiones oxidados en milésimas.' }])
      },
      {
        id: 'p19',
        name: 'Taladro Atornillador Milwaukee M12',
        category: 'herramientas',
        price: 199.00,
        description: 'Atornillador ultra compacto de impacto de 12 voltios con velocidad variable Drive Control. Perfecto para espacios de acceso difícil.',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1541535881962-e668f38a4fc3?auto=format&fit=crop&w=600&q=80',
        badges: JSON.stringify(['M12 Compacto']),
        material: 'Carcasa reforzada con elastómeros',
        dimensions: '13.0 x 5.5 x 18.2 cm',
        weight: '0.95 kg',
        stock: 12,
        reviews: JSON.stringify([{ author: 'Esteban C.', stars: 5, date: '08 de Jun, 2026', comment: 'El tamaño perfecto para instalaciones continuas.' }])
      },
      {
        id: 'p20',
        name: 'Procesador AMD Ryzen 7 7800X3D',
        category: 'computacion',
        price: 395.00,
        description: 'El procesador definitivo para videojuegos en plataforma AM5. Diseñado con tecnología AMD 3D V-Cache para tasas de FPS espectaculares.',
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80',
        badges: JSON.stringify(['Rey del Gaming', 'Socket AM5']),
        material: 'Silicio microelectrónico con chapado de cobre',
        dimensions: '4.0 x 4.0 x 0.5 cm',
        weight: '45 g',
        stock: 30,
        reviews: JSON.stringify([{ author: 'Lucas V.', stars: 5, date: '16 de Jun, 2026', comment: 'Rendimiento bestial en todos los videojuegos actuales.' }])
      },
      {
        id: 'p21',
        name: 'Procesador AMD Ryzen 9 7900X',
        category: 'computacion',
        price: 469.00,
        description: 'Procesador de ultra rendimiento para creadores de contenido y programadores. 12 núcleos y 24 subprocesos capaces de alcanzar 5.6 GHz.',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
        badges: JSON.stringify(['12 Núcleos Pro']),
        material: 'Silicio y litografía TSMC 5nm',
        dimensions: '4.0 x 4.0 x 0.5 cm',
        weight: '45 g',
        stock: 14,
        reviews: JSON.stringify([{ author: 'Arturo S.', stars: 4, date: '29 de May, 2026', comment: 'Para flujos pesados y renderización en backend es soberbio.' }])
      },
      {
        id: 'p22',
        name: 'Placa de Video NVIDIA RTX 4090 24GB',
        category: 'computacion',
        price: 1999.00,
        description: 'La tarjeta de video de consumo más veloz de la historia humana. Potenciada con arquitectura Ada Lovelace y DLSS 3 nativo.',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=600&q=80',
        badges: JSON.stringify(['El Olimpo de GPUs', 'Ray Tracing']),
        material: 'Chasis metálico fundido con tubos disipadores',
        dimensions: '33.6 x 15.0 x 7.5 cm',
        weight: '2.18 kg',
        stock: 4,
        reviews: JSON.stringify([{ author: 'Rodrigo L.', stars: 5, date: '02 de Jun, 2026', comment: 'Impresionante rendimiento. Renders terminados al instante.' }])
      },
      {
        id: 'p23',
        name: 'Placa de Video NVIDIA RTX 4070 Ti',
        category: 'computacion',
        price: 899.00,
        description: 'Tarjeta gráfica de alto rendimiento con 16GB de VRAM integrados, ideal para texturas pesadas a 1440p y 4K con tasa de refresco ultra alta.',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
        badges: JSON.stringify(['16GB VRAM', 'Precio Rendimiento']),
        material: 'Placa PCB reforzada con disipador triple',
        dimensions: '31.0 x 12.0 x 5.8 cm',
        weight: '1.42 kg',
        stock: 15,
        reviews: JSON.stringify([{ author: 'Mauricio P.', stars: 5, date: '10 de Jun, 2026', comment: 'Funciona súper fresca e impecable en todo.' }])
      },
      {
        id: 'p24',
        name: 'Procesador Intel Core i9-14900K',
        category: 'computacion',
        price: 589.00,
        description: 'Microprocesador extremo Intel de 14a generación. 24 núcleos de cómputo híbrido capaces de alcanzar de forma automática 6.0 GHz.',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80',
        badges: JSON.stringify(['Intel Extreme', '6.0 GHz']),
        material: 'Silicio con sustrato orgánico multi-capa',
        dimensions: '4.5 x 3.75 x 0.4 cm',
        weight: '35 g',
        stock: 11,
        reviews: JSON.stringify([{ author: 'Cristian E.', stars: 5, date: '14 de Jun, 2026', comment: 'Fuerza bruta descomunal. Excelente para cálculos pesados.' }])
      },
      {
        id: 'p25',
        name: 'Procesador Intel Core i7-13700K',
        category: 'computacion',
        price: 369.00,
        description: 'Excelente procesador de gama alta con 16 núcleos. Perfecto para streaming avanzado, edición multimedia compleja y desarrollo.',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?auto=format&fit=crop&w=600&q=80',
        badges: JSON.stringify(['Perfect Balance']),
        material: 'Silicio de alta pureza Intel 7',
        dimensions: '4.5 x 3.75 x 0.4 cm',
        weight: '35 g',
        stock: 19,
        reviews: JSON.stringify([{ author: 'Javier S.', stars: 4, date: '21 de May, 2026', comment: 'La mejor relación calidad-precio de Intel actualmente.' }])
      },
      {
        id: 'p26',
        name: 'Memorias RAM DDR5 Corsair 32GB',
        category: 'computacion',
        price: 139.00,
        description: 'Kit dual channel de memorias de alto desempeño Corsair Vengeance (2 x 16GB) optimizadas para sistemas AMD EXPO e Intel XMP 3.0.',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1548345680-f5475ea5df84?auto=format&fit=crop&w=600&q=80',
        badges: JSON.stringify(['Corsair Vengeance', 'DDR5 Ultra']),
        material: 'Disipador de aluminio negro anodizado',
        dimensions: '13.5 x 3.5 x 0.7 cm',
        weight: '85 g',
        stock: 45,
        reviews: JSON.stringify([{ author: 'Pablo D.', stars: 5, date: '02 de Jun, 2026', comment: 'Estable con el perfil EXPO activado a 6000MHz.' }])
      },
      {
        id: 'p27',
        name: 'SSD M.2 NVMe Kingston FURY 2TB',
        category: 'computacion',
        price: 165.00,
        description: 'Unidad de almacenamiento de estado sólido PCIe Gen 4x4. Velocidades secuenciales extremas de lectura de hasta 7300 MB/s.',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80',
        badges: JSON.stringify(['7300 MB/s', '2TB Capacidad']),
        material: 'Componentes integrados NAND 3D TLC',
        dimensions: '8.0 x 2.2 x 0.22 cm',
        weight: '7.0 g',
        stock: 35,
        reviews: JSON.stringify([{ author: 'Lautaro G.', stars: 5, date: '11 de Jun, 2026', comment: 'Los tiempos de carga simplemente desaparecieron por completo.' }])
      },
      {
        id: 'p28',
        name: 'Gabinete PC NZXT H7 Flow White',
        category: 'computacion',
        price: 145.00,
        description: 'Gabinete de primera calidad. Panel frontal completamente perforado para ventilaciones insuperables y ventana de vidrio templado.',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80',
        badges: JSON.stringify(['Flujo de Aire', 'NZXT Elegance']),
        material: 'Vidrio templado lateral, acero electrogalvanizado SGCC',
        dimensions: '48.0 x 23.0 x 50.5 cm',
        weight: '10.25 kg',
        stock: 8,
        reviews: JSON.stringify([{ author: 'Ignacio Z.', stars: 5, date: '12 de Jun, 2026', comment: 'La gestión de cables detrás de la placa es una delicia.' }])
      },
      {
        id: 'p29',
        name: 'Fuente Corsair RM850e PCIe 5.0',
        category: 'computacion',
        price: 135.00,
        description: 'Fuente de poder totalmente modular con certificación 80 PLUS Gold, compatible con conector nativo de 16 pines PCIe 5.0 para RTX serie 40.',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=600&q=80',
        badges: JSON.stringify(['80+ Gold', 'ATX 3.0 Native']),
        material: 'Chasis de aluminio, condensadores japoneses de alta gama',
        dimensions: '15.0 x 14.0 x 8.6 cm',
        weight: '1.5 kg',
        stock: 22,
        reviews: JSON.stringify([{ author: 'Julián P.', stars: 5, date: '28 de May, 2026', comment: 'Completamente silenciosa bajo cargas de testeo extremas.' }])
      },
      {
        id: 'p30',
        name: 'Teclado Mecánico Razer BlackWidow',
        category: 'accesorios',
        price: 189.00,
        description: 'Teclado premium con switches mecánicos rápidos, rueda de volumen multifunción, teclas macro y reposamuñecas suntuoso.',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80',
        badges: JSON.stringify(['Switches Rápidos', 'Chroma RGB']),
        material: 'Carcasa superior de aleación de aluminio 5052, teclas ABS',
        dimensions: '46.6 x 15.2 x 4.4 cm',
        weight: '1.43 kg',
        stock: 16,
        reviews: JSON.stringify([{ author: 'Mateo L.', stars: 4, date: '04 de Jun, 2026', comment: 'Los switches amarillos se sienten excelentes al tacto y para jugar.' }])
      }
    ];

    // Insert Products
    for (const p of initialProducts) {
      await db.insert(schema.products).values({
        id: p.id,
        name: p.name,
        category: p.category,
        price: p.price,
        description: p.description,
        rating: p.rating,
        image: p.image,
        badges: p.badges ? JSON.parse(p.badges) : null,
        material: p.material,
        dimensions: p.dimensions,
        weight: p.weight,
        stock: p.stock,
        reviews: p.reviews ? JSON.parse(p.reviews) : null
      });
    }

    const initialOrders = [
      {
        id: 'ORD-9823',
        fullName: 'Carolina Lindstrom',
        email: 'caro.lind@gmail.com',
        address: 'Calle del Sol 241, 3B',
        city: 'Barcelona',
        postalCode: '08001',
        date: '2026-06-16',
        subtotal: 539.00,
        discount: 53.90,
        total: 597.49,
        status: 'enviado'
      },
      {
        id: 'ORD-4731',
        fullName: 'Enrique Valenzuela',
        email: 'evalenzuela@outlook.com',
        address: 'Av. Gran Vía 12 de Octubre',
        city: 'Madrid',
        postalCode: '28013',
        date: '2026-06-15',
        subtotal: 89.00,
        discount: 0,
        total: 122.69,
        status: 'completado'
      }
    ];

    // Insert Orders
    for (const o of initialOrders) {
      await db.insert(schema.orders).values({
        id: o.id,
        fullName: o.fullName,
        email: o.email,
        address: o.address,
        city: o.city,
        postalCode: o.postalCode,
        date: o.date,
        subtotal: o.subtotal,
        discount: o.discount,
        total: o.total,
        status: o.status
      });
    }

    // Insert Order Items
    await db.insert(schema.orderItems).values([
      { orderId: 'ORD-9823', productId: 'p2', name: 'Smart TV LG OLED Evo C3 55"', quantity: 1, price: 1149.00 },
      { orderId: 'ORD-4731', productId: 'p10', name: 'Taladro Percutor Makita 18V LXT', quantity: 1, price: 219.00 }
    ]);

    console.log('✅ Neon PostgreSQL seeding completed with tech/tools catalog.');
  }
}
