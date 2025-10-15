import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET() {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Fetch products to generate alerts
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('stock_count', { ascending: true });

    if (error) throw error;

    const alerts: any[] = [];
    let alertId = 1;

    products?.forEach((product) => {
      const reorderLevel = Math.max(5, Math.floor(product.stock_count * 0.2));
      const suggestedQuantity = Math.max(20, reorderLevel * 3);

      // Out of stock alert
      if (product.stock_count === 0) {
        alerts.push({
          id: `alert-${alertId++}`,
          type: 'out-of-stock',
          title: 'Product Out of Stock',
          message: `${product.name} is completely out of stock and needs immediate restocking`,
          productId: product.id.toString(),
          productName: product.name,
          currentStock: product.stock_count,
          reorderLevel,
          suggestedQuantity,
          priority: 'high',
          timestamp: new Date().toISOString(),
          isRead: false,
          isActionable: true
        });
      }
      // Low stock alert
      else if (product.stock_count > 0 && product.stock_count <= 5) {
        alerts.push({
          id: `alert-${alertId++}`,
          type: 'low-stock',
          title: 'Low Stock Alert',
          message: `${product.name} stock is critically low (${product.stock_count} units remaining)`,
          productId: product.id.toString(),
          productName: product.name,
          currentStock: product.stock_count,
          reorderLevel,
          suggestedQuantity,
          priority: 'high',
          timestamp: new Date().toISOString(),
          isRead: false,
          isActionable: true
        });
      }
      // Reorder suggestion for products with stock between 6-15
      else if (product.stock_count > 5 && product.stock_count <= 15) {
        alerts.push({
          id: `alert-${alertId++}`,
          type: 'reorder-suggestion',
          title: 'Reorder Suggestion',
          message: `Consider reordering ${product.name} soon (${product.stock_count} units in stock)`,
          productId: product.id.toString(),
          productName: product.name,
          currentStock: product.stock_count,
          reorderLevel,
          suggestedQuantity,
          priority: 'medium',
          timestamp: new Date().toISOString(),
          isRead: false,
          isActionable: true
        });
      }
    });

    // Add system alert if no critical alerts
    if (alerts.filter(a => a.priority === 'high').length === 0) {
      alerts.push({
        id: `alert-${alertId++}`,
        type: 'system',
        title: 'System Status: All Good',
        message: 'All products are adequately stocked. No immediate action required.',
        priority: 'low',
        timestamp: new Date().toISOString(),
        isRead: false,
        isActionable: false
      });
    }

    return NextResponse.json(alerts);
  } catch (error: any) {
    console.error('Alerts API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
