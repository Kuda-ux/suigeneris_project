import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Smartphones to add
const smartphones = [
  {
    name: 'Xiaomi Redmi A3',
    description: 'Budget-friendly smartphone with 8GB RAM. Great value for everyday use.',
    price: 85,
    category: 'Smartphones',
    brand: 'Xiaomi',
    stock_count: 5,
    in_stock: true,
    sku: 'SG-SMA-0001',
    warranty: '12 months'
  },
  {
    name: 'Samsung Galaxy A30',
    description: 'Samsung smartphone with AMOLED display. Reliable Samsung quality.',
    price: 85,
    category: 'Smartphones',
    brand: 'Samsung',
    stock_count: 3,
    in_stock: true,
    sku: 'SG-SMA-0002',
    warranty: '3 months'
  },
  {
    name: 'Xiaomi Redmi 14C',
    description: 'Latest Redmi with massive 16GB RAM. Smooth multitasking performance.',
    price: 95,
    category: 'Smartphones',
    brand: 'Xiaomi',
    stock_count: 4,
    in_stock: true,
    sku: 'SG-SMA-0003',
    warranty: '12 months'
  },
  {
    name: 'Samsung Galaxy A05',
    description: 'Affordable Samsung with 6GB RAM and 128GB storage. Great starter phone.',
    price: 100,
    category: 'Smartphones',
    brand: 'Samsung',
    stock_count: 5,
    in_stock: true,
    sku: 'SG-SMA-0004',
    warranty: '12 months'
  },
  {
    name: 'Xiaomi Redmi 13',
    description: 'Feature-packed Redmi 13 with excellent camera and performance.',
    price: 110,
    category: 'Smartphones',
    brand: 'Xiaomi',
    stock_count: 4,
    in_stock: true,
    sku: 'SG-SMA-0005',
    warranty: '12 months'
  },
  {
    name: 'Samsung Galaxy M14 5G',
    description: '5G-capable Samsung with long battery life. Future-proof connectivity.',
    price: 110,
    category: 'Smartphones',
    brand: 'Samsung',
    stock_count: 3,
    in_stock: true,
    sku: 'SG-SMA-0006',
    warranty: '12 months'
  },
  {
    name: 'Samsung Galaxy A06',
    description: 'Latest Samsung A-series with 6GB RAM. Reliable everyday smartphone.',
    price: 115,
    category: 'Smartphones',
    brand: 'Samsung',
    stock_count: 4,
    in_stock: true,
    sku: 'SG-SMA-0007',
    warranty: '12 months'
  },
  {
    name: 'Samsung Galaxy A05s',
    description: 'Samsung A05s with enhanced features. Great camera and display.',
    price: 120,
    category: 'Smartphones',
    brand: 'Samsung',
    stock_count: 4,
    in_stock: true,
    sku: 'SG-SMA-0008',
    warranty: '12 months'
  },
  {
    name: 'Xiaomi Redmi Note 13',
    description: 'Popular Redmi Note series with 8GB RAM. Excellent value flagship.',
    price: 145,
    category: 'Smartphones',
    brand: 'Xiaomi',
    stock_count: 5,
    in_stock: true,
    sku: 'SG-SMA-0009',
    warranty: '12 months'
  },
  {
    name: 'Samsung Galaxy A15',
    description: 'Mid-range Samsung with premium features. Super AMOLED display.',
    price: 150,
    category: 'Smartphones',
    brand: 'Samsung',
    stock_count: 4,
    in_stock: true,
    sku: 'SG-SMA-0010',
    warranty: '12 months'
  },
  {
    name: 'Samsung Galaxy A25 5G',
    description: '5G Samsung with 8GB RAM and 256GB storage. Premium mid-range.',
    price: 200,
    category: 'Smartphones',
    brand: 'Samsung',
    stock_count: 3,
    in_stock: true,
    sku: 'SG-SMA-0011',
    warranty: '12 months'
  },
  {
    name: 'Samsung Galaxy A35 5G',
    description: 'High-end Samsung A-series with flagship features. 8GB RAM, 256GB.',
    price: 280,
    category: 'Smartphones',
    brand: 'Samsung',
    stock_count: 3,
    in_stock: true,
    sku: 'SG-SMA-0012',
    warranty: '12 months'
  }
];

export async function POST() {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Insert smartphones
    const { data, error } = await supabase
      .from('products')
      .insert(smartphones)
      .select();

    if (error) {
      console.error('Error inserting smartphones:', error);
      return NextResponse.json({ error: 'Failed to insert smartphones', details: error }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Successfully added ${data.length} smartphones`,
      count: data.length,
      products: data.map(p => ({ id: p.id, name: p.name, price: p.price }))
    });

  } catch (error: any) {
    console.error('Add smartphones error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Smartphone seeding endpoint',
    usage: 'POST to this endpoint to add smartphones to the database',
    smartphoneCount: smartphones.length,
    smartphones: smartphones.map(s => ({ name: s.name, price: s.price, brand: s.brand }))
  });
}
