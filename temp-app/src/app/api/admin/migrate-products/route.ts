import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { products } from '@/data/products';

// Create Supabase client with service role for admin operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST() {
  try {
    console.log('🚀 Starting product migration...');
    console.log(`📦 Total products to migrate: ${products.length}`);

    let successCount = 0;
    let errorCount = 0;
    const errors: Array<{ product: string; error: string }> = [];
    const migrated: string[] = [];

    for (const product of products) {
      try {
        // Map product to database schema
        const dbProduct = {
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
          condition: product.condition,
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
          migrated.push(product.name);
          console.log(`✅ Migrated: ${product.name} (ID: ${product.id})`);
        }
      } catch (err: any) {
        errorCount++;
        errors.push({ product: product.name, error: err.message });
        console.error(`❌ Failed: ${product.name} - ${err.message}`);
      }
    }

    // Get category counts
    const categoryCounts: Record<string, number> = {};
    products.forEach(p => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });

    return NextResponse.json({
      success: true,
      message: 'Migration complete!',
      summary: {
        total: products.length,
        successful: successCount,
        failed: errorCount,
        categories: categoryCounts,
      },
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error: any) {
    console.error('💥 Migration failed:', error);
    return NextResponse.json({
      success: false,
      error: error?.message || 'Migration failed'
    }, { status: 500 });
  }
}

// GET to check current database status
export async function GET() {
  try {
    // Get all products from database
    const { data: dbProducts, error } = await supabase
      .from('products')
      .select('id, name, category, price')
      .order('id');

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: 500 });
    }

    // Count by category
    const categoryCounts: Record<string, number> = {};
    dbProducts?.forEach(p => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });

    // Compare with static products
    const staticCategoryCounts: Record<string, number> = {};
    products.forEach(p => {
      staticCategoryCounts[p.category] = (staticCategoryCounts[p.category] || 0) + 1;
    });

    return NextResponse.json({
      success: true,
      database: {
        totalProducts: dbProducts?.length || 0,
        categories: categoryCounts,
        products: dbProducts,
      },
      static: {
        totalProducts: products.length,
        categories: staticCategoryCounts,
      },
      comparison: {
        missingInDatabase: products.length - (dbProducts?.length || 0),
        staticCategories: Object.keys(staticCategoryCounts),
        dbCategories: Object.keys(categoryCounts),
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error?.message || 'Failed to check status'
    }, { status: 500 });
  }
}
