import { NextResponse } from 'next/server';
import { fetchProducts, fetchProductsByCategory, searchProducts } from '@/lib/database';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let products;

    if (search) {
      products = await searchProducts(search);
    } else if (category) {
      products = await fetchProductsByCategory(category);
    } else {
      products = await fetchProducts();
    }

    return NextResponse.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error?.message || 'Failed to fetch products'
    }, { status: 500 });
  }
}
