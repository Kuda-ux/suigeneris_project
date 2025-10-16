import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(request: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { searchParams } = new URL(request.url);
    
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '100');

    // Build query
    let query = supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    // Apply status filter if provided
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const { data: orders, error } = await query;

    if (error) throw error;

    return NextResponse.json(orders || []);
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const orderData = await request.json();

    console.log('Creating order with data:', orderData);

    // Get product details
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('name, price, stock_count')
      .eq('id', orderData.product_id)
      .single();

    if (productError) {
      console.error('Product fetch error:', productError);
      throw productError;
    }

    console.log('Current product:', product);

    // Check stock availability
    if (product.stock_count < orderData.quantity) {
      return NextResponse.json(
        { error: `Insufficient stock. Available: ${product.stock_count}, Requested: ${orderData.quantity}` },
        { status: 400 }
      );
    }

    const newStockCount = product.stock_count - orderData.quantity;
    console.log(`Updating stock from ${product.stock_count} to ${newStockCount}`);

    // Update product stock
    const { error: updateError } = await supabase
      .from('products')
      .update({ 
        stock_count: newStockCount,
        in_stock: newStockCount > 0,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderData.product_id);

    if (updateError) {
      console.error('Stock update error:', updateError);
      throw updateError;
    }

    console.log('Stock updated successfully');

    // Generate order number
    const orderNumber = `SG-2024-${Date.now().toString().slice(-6)}`;
    const total = product.price * orderData.quantity;

    // Create order record in database
    const { data: newOrder, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_name: orderData.customer_name,
        customer_email: orderData.customer_email,
        customer_phone: orderData.customer_phone || null,
        product_id: orderData.product_id,
        product_name: product.name,
        quantity: orderData.quantity,
        unit_price: product.price,
        total_amount: total,
        status: 'pending',
        payment_method: orderData.payment_method || 'credit_card',
        shipping_address: orderData.shipping_address,
        notes: orderData.notes || null
      })
      .select()
      .single();

    if (orderError) {
      console.error('Order creation error:', orderError);
      throw orderError;
    }

    console.log('Order created successfully:', newOrder);
    return NextResponse.json(newOrder);
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
