import { db } from './src/db/db';
import { sql } from 'drizzle-orm';
import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

const sqlClient = neon(process.env['DATABASE_URL'] || '');

async function migrateAccordion() {
  console.log('Migrating accordion columns to Neon DB...');
  try {
    await sqlClient`ALTER TABLE products ADD COLUMN IF NOT EXISTS "about_model" TEXT;`;
    console.log('Added about_model column');
    await sqlClient`ALTER TABLE products ADD COLUMN IF NOT EXISTS "features" TEXT;`;
    console.log('Added features column');
    await sqlClient`ALTER TABLE products ADD COLUMN IF NOT EXISTS "specifications" TEXT;`;
    console.log('Added specifications column');
    console.log('Migration Complete!');
  } catch (err) {
    console.error('Migration failed:', err);
  }
}

migrateAccordion();
