import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(request: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    const { searchParams } = new URL(request.url);
    const reportType = searchParams.get('type') || 'all';

    // Fetch all necessary data
    const [productsRes, ordersRes, stockMovementsRes] = await Promise.all([
      supabase.from('products').select('*'),
      supabase.from('orders').select('*'),
      supabase.from('stock_movements').select('*')
    ]);

    if (productsRes.error) throw productsRes.error;
    if (ordersRes.error) throw ordersRes.error;

    const products = productsRes.data || [];
    const orders = ordersRes.data || [];
    const stockMovements = stockMovementsRes.data || [];

    // Calculate analytics
    const analytics = {
      overview: {
        totalProducts: products.length,
        totalStockValue: products.reduce((sum, p) => sum + (p.price * p.stock_count), 0),
        lowStockProducts: products.filter(p => p.stock_count > 0 && p.stock_count <= 5).length,
        outOfStockProducts: products.filter(p => p.stock_count === 0).length,
        totalOrders: orders.length,
        totalRevenue: orders.reduce((sum, o) => sum + o.total_amount, 0),
        pendingOrders: orders.filter(o => o.status === 'pending' || o.status === 'processing').length,
        deliveredOrders: orders.filter(o => o.status === 'delivered').length
      },
      stockMovement: {
        totalIssued: stockMovements.filter(m => m.movement_type === 'issue').reduce((sum, m) => sum + m.quantity, 0),
        totalReceived: stockMovements.filter(m => m.movement_type === 'receive').reduce((sum, m) => sum + m.quantity, 0),
        totalReturns: stockMovements.filter(m => m.movement_type === 'return').reduce((sum, m) => sum + m.quantity, 0),
        recentMovements: stockMovements.slice(0, 10).map(m => ({
          id: m.id,
          product_name: m.product_name,
          type: m.movement_type,
          quantity: m.quantity,
          date: m.created_at
        }))
      },
      topSelling: orders
        .reduce((acc: any[], order) => {
          const existing = acc.find(item => item.product_id === order.product_id);
          if (existing) {
            existing.quantity += order.quantity;
            existing.revenue += order.total_amount;
            existing.orders += 1;
          } else {
            acc.push({
              product_id: order.product_id,
              product_name: order.product_name,
              quantity: order.quantity,
              revenue: order.total_amount,
              orders: 1
            });
          }
          return acc;
        }, [])
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 10),
      deadStock: products
        .filter(p => p.stock_count > 10)
        .map(p => {
          const productOrders = orders.filter(o => o.product_id === p.id);
          const lastOrder = productOrders.length > 0 
            ? new Date(Math.max(...productOrders.map(o => new Date(o.created_at).getTime())))
            : null;
          const daysSinceLastSale = lastOrder 
            ? Math.floor((Date.now() - lastOrder.getTime()) / (1000 * 60 * 60 * 24))
            : 999;
          
          return {
            id: p.id,
            name: p.name,
            currentStock: p.stock_count,
            value: p.price * p.stock_count,
            daysSinceLastSale,
            lastSale: lastOrder ? lastOrder.toISOString() : null,
            category: p.category
          };
        })
        .filter(p => p.daysSinceLastSale > 30)
        .sort((a, b) => b.daysSinceLastSale - a.daysSinceLastSale)
        .slice(0, 20),
      categoryBreakdown: products.reduce((acc: any, p) => {
        const category = p.category || 'Uncategorized';
        if (!acc[category]) {
          acc[category] = { count: 0, value: 0 };
        }
        acc[category].count += 1;
        acc[category].value += p.price * p.stock_count;
        return acc;
      }, {})
    };

    // Return based on report type
    if (reportType === 'all') {
      return NextResponse.json(analytics);
    } else if (analytics[reportType as keyof typeof analytics]) {
      return NextResponse.json(analytics[reportType as keyof typeof analytics]);
    } else {
      return NextResponse.json({ error: 'Invalid report type' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Reports API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
