/**
 * Migration script to move all static product data to Supabase database
 * Run this with: npx tsx scripts/migrate-to-database.ts
 */

import { createClient } from '@supabase/supabase-js';
import { products } from '../src/data/products';

// Get Supabase credentials from environment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials!');
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface DatabaseProduct {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  original_price?: number;
  description: string;
  brand: string;
  stock_count: number;
  in_stock: boolean;
  images: string[];
  image: string;
  rating: number;
  reviews: number;
  features: string[];
  specifications: Record<string, string>;
  warranty: boolean;
  badge?: string;
}

async function migrateProducts() {
  console.log('🚀 Starting product migration...\n');
  console.log(`📦 Total products to migrate: ${products.length}\n`);

  let successCount = 0;
  let errorCount = 0;
  const errors: Array<{ product: string; error: string }> = [];

  for (const product of products) {
    try {
      // Map product to database schema
      const dbProduct: DatabaseProduct = {
        id: product.id,
        name: product.name,
        sku: `SKU-${product.id.toString().padStart(5, '0')}`,
        category: product.category,
        price: product.price,
        original_price: product.originalPrice,
        description: product.description,
        brand: product.brand,
        stock_count: product.stockCount,
        in_stock: product.inStock,
        images: product.images,
        image: product.image,
        rating: product.rating,
        reviews: product.reviews,
        features: product.features,
        specifications: product.specifications,
        warranty: product.warranty,
        badge: product.badge,
      };

      // Insert or update product
      const { error } = await supabase
        .from('products')
        .upsert(dbProduct, { onConflict: 'id' });

      if (error) {
        errorCount++;
        errors.push({ product: product.name, error: error.message });
        console.error(`❌ Failed: ${product.name} - ${error.message}`);
      } else {
        successCount++;
        console.log(`✅ Migrated: ${product.name} (ID: ${product.id})`);
      }
    } catch (err: any) {
      errorCount++;
      errors.push({ product: product.name, error: err.message });
      console.error(`❌ Failed: ${product.name} - ${err.message}`);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 Migration Summary:');
  console.log('='.repeat(60));
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${errorCount}`);
  console.log(`📦 Total: ${products.length}`);
  
  if (errors.length > 0) {
    console.log('\n❌ Errors:');
    errors.forEach(({ product, error }) => {
      console.log(`  - ${product}: ${error}`);
    });
  }

  console.log('\n✨ Migration complete!\n');
}

// Run migration
migrateProducts()
  .then(() => {
    console.log('🎉 All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Migration failed:', error);
    process.exit(1);
  });
