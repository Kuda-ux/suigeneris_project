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

    // Fetch products to generate orders
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, name, price, category')
      .limit(20);

    if (productsError) throw productsError;

    // Generate sample orders from products
    const orders = products?.flatMap((product: any, index: number) => {
      const orderCount = Math.floor(Math.random() * 3) + 1;
      return Array.from({ length: orderCount }, (_, i) => {
        const orderNum = (index * 3 + i + 1).toString().padStart(3, '0');
        const quantity = Math.floor(Math.random() * 3) + 1;
        const total = product.price * quantity;
        const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        // Generate dates in the past 30 days
        const daysAgo = Math.floor(Math.random() * 30);
        const orderDate = new Date();
        orderDate.setDate(orderDate.getDate() - daysAgo);

        return {
          id: `ORD-${orderNum}`,
          order_number: `SG-2024-${orderNum}`,
          customer_name: ['Michael Chen', 'Sarah Johnson', 'David Rodriguez', 'Emily Williams', 'James Brown'][Math.floor(Math.random() * 5)],
          customer_email: `customer${orderNum}@example.com`,
          product_id: product.id,
          product_name: product.name,
          quantity,
          unit_price: product.price,
          total_amount: total,
          status: randomStatus,
          payment_method: ['credit_card', 'paypal', 'bank_transfer'][Math.floor(Math.random() * 3)],
          shipping_address: '123 Main St, City, Country',
          created_at: orderDate.toISOString(),
          updated_at: orderDate.toISOString()
        };
      });
    }) || [];

    // Apply filters
    let filteredOrders = orders;
    if (status && status !== 'all') {
      filteredOrders = filteredOrders.filter((o: any) => o.status === status);
    }

    // Sort by date descending and limit
    const sortedOrders = filteredOrders
      .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, limit);

    return NextResponse.json(sortedOrders);
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const orderData = await request.json();

    // Get product details
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('name, price, stock_count')
      .eq('id', orderData.product_id)
      .single();

    if (productError) throw productError;

    // Check stock availability
    if (product.stock_count < orderData.quantity) {
      return NextResponse.json(
        { error: 'Insufficient stock available' },
        { status: 400 }
      );
    }

    // Update product stock
    const { error: updateError } = await supabase
      .from('products')
      .update({ 
        stock_count: product.stock_count - orderData.quantity,
        in_stock: (product.stock_count - orderData.quantity) > 0,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderData.product_id);

    if (updateError) throw updateError;

    // Generate order number
    const orderNumber = `SG-2024-${Date.now().toString().slice(-6)}`;
    const total = product.price * orderData.quantity;

    // Create order record
    const newOrder = {
      id: `ORD-${Date.now()}`,
      order_number: orderNumber,
      customer_name: orderData.customer_name,
      customer_email: orderData.customer_email,
      product_id: orderData.product_id,
      product_name: product.name,
      quantity: orderData.quantity,
      unit_price: product.price,
      total_amount: total,
      status: 'pending',
      payment_method: orderData.payment_method || 'credit_card',
      shipping_address: orderData.shipping_address,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    return NextResponse.json(newOrder);
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
