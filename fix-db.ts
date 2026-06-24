import { db } from './src/db/db';
import { sql } from 'drizzle-orm';
async function fix() {
  await db.execute(sql`UPDATE products SET description = REPLACE(description, '&nbsp;', ' '), about_model = REPLACE(about_model, '&nbsp;', ' '), features = REPLACE(features, '&nbsp;', ' '), specifications = REPLACE(specifications, '&nbsp;', ' ');`);
  console.log('Fixed DB');
}
fix();
