import { supabase } from './supabase';
import type { Product } from '@/data/products';

/**
 * Database service for product operations
 * Handles mapping between database schema and app Product interface
 */

interface DatabaseProduct {
  id: number;
  name: string;
  price: number;
  original_price?: number;
  description: string;
  category: string;
  brand: string;
  stock_count: number;
  in_stock: boolean;
  images: string[];
  specifications: Record<string, string>;
  warranty: boolean | string;
  rating?: number;
  reviews?: number;
  image?: string;
  features?: string[];
  badge?: string;
  sku?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Map database product to app Product interface
 */
function mapDatabaseProductToProduct(dbProduct: DatabaseProduct): Product {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    price: dbProduct.price,
    originalPrice: dbProduct.original_price,
    rating: dbProduct.rating || 4.5,
    reviews: dbProduct.reviews || 0,
    image: dbProduct.image || dbProduct.images?.[0] || '',
    images: dbProduct.images || [],
    category: dbProduct.category,
    brand: dbProduct.brand,
    inStock: dbProduct.in_stock,
    stockCount: dbProduct.stock_count,
    description: dbProduct.description,
    features: dbProduct.features || [],
    specifications: dbProduct.specifications || {},
    warranty: typeof dbProduct.warranty === 'boolean' ? dbProduct.warranty : dbProduct.warranty === 'true',
    badge: dbProduct.badge,
  };
}

/**
 * Fetch all products from database
 */
export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return (data || []).map(mapDatabaseProductToProduct);
}

/**
 * Fetch a single product by ID
 */
export async function fetchProductById(id: number): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return data ? mapDatabaseProductToProduct(data) : null;
}

/**
 * Fetch products by category
 */
export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }

  return (data || []).map(mapDatabaseProductToProduct);
}

/**
 * Search products by name or description
 */
export async function searchProducts(query: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error searching products:', error);
    return [];
  }

  return (data || []).map(mapDatabaseProductToProduct);
}

/**
 * Check database connection
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('products')
      .select('count')
      .limit(1);

    return !error;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
}
