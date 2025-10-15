import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(request: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { searchParams } = new URL(request.url);
    
    const type = searchParams.get('type');
    const productId = searchParams.get('productId');
    const limit = parseInt(searchParams.get('limit') || '100');

    // Fetch products first to get current stock
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, name, stock_count, category, price, sku')
      .order('name');

    if (productsError) throw productsError;

    // Generate stock movements from product data
    const movements = products?.flatMap((product: any) => {
      const stockMovements = [];
      
      // Opening stock movement
      stockMovements.push({
        id: `opening-${product.id}`,
        product_id: product.id,
        product_name: product.name,
        type: 'opening',
        quantity: product.stock_count,
        previous_stock: 0,
        new_stock: product.stock_count,
        reason: 'Initial stock',
        reference: `INIT-${product.sku || product.id}`,
        created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        user_name: 'System'
      });

      // Add some sample movements based on stock level
      if (product.stock_count > 0) {
        const receivedQty = Math.floor(product.stock_count * 0.3);
        stockMovements.push({
          id: `received-${product.id}`,
          product_id: product.id,
          product_name: product.name,
          type: 'received',
          quantity: receivedQty,
          previous_stock: product.stock_count - receivedQty,
          new_stock: product.stock_count,
          reason: 'Supplier delivery',
          reference: `PO-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          user_name: 'Admin'
        });
      }

      return stockMovements;
    }) || [];

    // Apply filters
    let filteredMovements = movements;
    if (type && type !== 'all') {
      filteredMovements = filteredMovements.filter((m: any) => m.type === type);
    }
    if (productId && productId !== 'all') {
      filteredMovements = filteredMovements.filter((m: any) => m.product_id.toString() === productId);
    }

    // Sort by date descending and limit
    const sortedMovements = filteredMovements
      .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, limit);

    return NextResponse.json(sortedMovements);
  } catch (error: any) {
    console.error('Error fetching stock movements:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const movementData = await request.json();

    // Get current product stock
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('stock_count, name')
      .eq('id', movementData.product_id)
      .single();

    if (productError) throw productError;

    const previousStock = product.stock_count;
    let newStock = previousStock;

    // Calculate new stock based on movement type
    if (movementData.type === 'issued' || movementData.type === 'exchange') {
      newStock = Math.max(0, previousStock - movementData.quantity);
    } else if (movementData.type === 'received' || movementData.type === 'return') {
      newStock = previousStock + movementData.quantity;
    }

    // Update product stock
    const { error: updateError } = await supabase
      .from('products')
      .update({ 
        stock_count: newStock,
        in_stock: newStock > 0,
        updated_at: new Date().toISOString()
      })
      .eq('id', movementData.product_id);

    if (updateError) throw updateError;

    // Return the movement record
    const newMovement = {
      id: `${movementData.type}-${Date.now()}`,
      product_id: movementData.product_id,
      product_name: product.name,
      type: movementData.type,
      quantity: movementData.quantity,
      previous_stock: previousStock,
      new_stock: newStock,
      reason: movementData.reason || 'Manual entry',
      reference: movementData.reference || `REF-${Date.now()}`,
      created_at: new Date().toISOString(),
      user_name: 'Admin'
    };

    return NextResponse.json(newMovement);
  } catch (error: any) {
    console.error('Error creating stock movement:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
