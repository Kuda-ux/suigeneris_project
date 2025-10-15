import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET() {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Map database fields to admin format
    const adminProducts = (data || []).map((product: any) => ({
      id: product.id.toString(),
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      sku: product.sku || `SKU-${product.id.toString().padStart(5, '0')}`,
      openingStock: product.stock_count,
      currentStock: product.stock_count,
      stockIssued: 0,
      stockReceived: 0,
      stockReturns: 0,
      stockExchanges: 0,
      reorderLevel: Math.max(5, Math.floor(product.stock_count * 0.2)),
      status: product.stock_count === 0 ? 'out-of-stock' : 
              product.stock_count <= 5 ? 'low-stock' : 
              product.in_stock ? 'active' : 'inactive',
      images: product.images || [product.image],
      createdAt: product.created_at || new Date().toISOString(),
      updatedAt: product.updated_at || new Date().toISOString()
    }));

    return NextResponse.json(adminProducts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const productData = await request.json();
    
    const { data, error } = await supabase
      .from('products')
      .insert([{
        name: productData.name,
        description: productData.description,
        category: productData.category,
        price: productData.price,
        sku: productData.sku,
        stock_count: productData.currentStock,
        in_stock: productData.currentStock > 0,
        images: productData.images || [],
        image: productData.images?.[0] || '',
        brand: productData.brand || 'Generic',
        rating: 4.5,
        reviews: 0,
        features: [],
        specifications: {},
        warranty: false
      }] as any)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
