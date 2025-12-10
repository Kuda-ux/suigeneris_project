import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Smartphones to add - matching the actual database schema
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
    ram: '8GB',
    storage: '128GB',
    display: '6.7"',
    processor: 'MediaTek Helio',
    image: '/smartphones/xiaomi-redmi-a3.jpg',
    images: ['/smartphones/xiaomi-redmi-a3.jpg']
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
    ram: '4GB',
    storage: '64GB',
    display: '6.4" AMOLED',
    processor: 'Exynos 7904',
    image: '/smartphones/samsung-galaxy-a30.jpg',
    images: ['/smartphones/samsung-galaxy-a30.jpg']
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
    ram: '16GB',
    storage: '256GB',
    display: '6.88"',
    processor: 'MediaTek Helio G81',
    image: '/smartphones/xiaomi-redmi-14c.jpg',
    images: ['/smartphones/xiaomi-redmi-14c.jpg']
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
    ram: '6GB',
    storage: '128GB',
    display: '6.7" PLS LCD',
    processor: 'MediaTek Helio G85',
    image: '/smartphones/samsung-galaxy-a05.jpg',
    images: ['/smartphones/samsung-galaxy-a05.jpg']
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
    ram: '8GB',
    storage: '256GB',
    display: '6.79" FHD+',
    processor: 'Snapdragon 4 Gen 2',
    image: '/smartphones/xiaomi-redmi-13.jpg',
    images: ['/smartphones/xiaomi-redmi-13.jpg']
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
    ram: '6GB',
    storage: '128GB',
    display: '6.6" PLS LCD',
    processor: 'Exynos 1330 5G',
    image: '/smartphones/samsung-galaxy-m14-5g.jpg',
    images: ['/smartphones/samsung-galaxy-m14-5g.jpg']
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
    ram: '6GB',
    storage: '128GB',
    display: '6.7" PLS LCD',
    processor: 'MediaTek Helio G85',
    image: '/smartphones/samsung-galaxy-a06.jpg',
    images: ['/smartphones/samsung-galaxy-a06.jpg']
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
    ram: '6GB',
    storage: '128GB',
    display: '6.7" FHD+ PLS',
    processor: 'Snapdragon 680',
    image: '/smartphones/samsung-galaxy-a05s.jpg',
    images: ['/smartphones/samsung-galaxy-a05s.jpg']
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
    ram: '8GB',
    storage: '256GB',
    display: '6.67" AMOLED',
    processor: 'Snapdragon 685',
    image: '/smartphones/xiaomi-redmi-note-13.jpg',
    images: ['/smartphones/xiaomi-redmi-note-13.jpg']
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
    ram: '8GB',
    storage: '256GB',
    display: '6.5" Super AMOLED',
    processor: 'MediaTek Helio G99',
    image: '/smartphones/samsung-galaxy-a15.jpg',
    images: ['/smartphones/samsung-galaxy-a15.jpg']
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
    ram: '8GB',
    storage: '256GB',
    display: '6.5" Super AMOLED',
    processor: 'Exynos 1280 5G',
    image: '/smartphones/samsung-galaxy-a25-5g.jpg',
    images: ['/smartphones/samsung-galaxy-a25-5g.jpg']
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
    ram: '8GB',
    storage: '256GB',
    display: '6.6" Super AMOLED',
    processor: 'Exynos 1380 5G',
    image: '/smartphones/samsung-galaxy-a35-5g.jpg',
    images: ['/smartphones/samsung-galaxy-a35-5g.jpg']
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
