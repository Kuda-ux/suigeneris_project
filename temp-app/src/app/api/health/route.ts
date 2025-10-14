import { NextResponse } from 'next/server';
import { checkDatabaseConnection, fetchProducts } from '@/lib/database';

export async function GET() {
  try {
    const isConnected = await checkDatabaseConnection();
    
    if (!isConnected) {
      return NextResponse.json({
        status: 'error',
        message: 'Database connection failed',
        supabaseConfigured: !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
      }, { status: 500 });
    }

    // Try to fetch products to verify full functionality
    const products = await fetchProducts();

    return NextResponse.json({
      status: 'ok',
      message: 'Database connected successfully',
      supabaseConfigured: true,
      productsCount: products.length,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: 'Unexpected error',
      error: error?.message || 'Unknown error',
      supabaseConfigured: !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    }, { status: 500 });
  }
}
