import { db } from './src/db/db';
import { products } from './src/db/schema';
import { eq } from 'drizzle-orm';

async function randomizeRatings() {
  console.log('Randomizing ratings for existing products...');
  try {
    const allProducts = await db.select().from(products);
    
    for (const p of allProducts) {
      // Generate a random rating between 4.5 and 5.0 with 1 decimal place
      const newRating = Number((4.5 + Math.random() * 0.5).toFixed(1));
      
      await db.update(products)
        .set({ rating: newRating })
        .where(eq(products.id, p.id));
        
      console.log(`Updated product ${p.name} with rating ${newRating}`);
    }
    console.log('Done!');
  } catch (err) {
    console.error('Error:', err);
  }
}

randomizeRatings();
