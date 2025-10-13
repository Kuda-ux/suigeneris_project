import { NextResponse } from 'next/server';

const mockAlerts = [
  {
    id: '1',
    type: 'out-of-stock',
    title: 'Product Out of Stock',
    message: 'Gaming Mouse Pro is completely out of stock',
    productId: '3',
    productName: 'Gaming Mouse Pro',
    currentStock: 0,
    reorderLevel: 10,
    suggestedQuantity: 50,
    priority: 'high',
    timestamp: '2024-01-25T10:30:00Z',
    isRead: false,
    isActionable: true
  },
  {
    id: '2',
    type: 'low-stock',
    title: 'Low Stock Alert',
    message: 'Smart Fitness Watch stock is below reorder level',
    productId: '2',
    productName: 'Smart Fitness Watch',
    currentStock: 8,
    reorderLevel: 15,
    suggestedQuantity: 75,
    priority: 'medium',
    timestamp: '2024-01-25T09:15:00Z',
    isRead: false,
    isActionable: true
  },
  {
    id: '3',
    type: 'reorder-suggestion',
    title: 'Reorder Suggestion',
    message: 'Based on sales trends, consider reordering Premium Wireless Headphones',
    productId: '1',
    productName: 'Premium Wireless Headphones',
    currentStock: 45,
    reorderLevel: 20,
    suggestedQuantity: 100,
    priority: 'medium',
    timestamp: '2024-01-25T08:00:00Z',
    isRead: true,
    isActionable: true
  }
];

export async function GET() {
  return NextResponse.json(mockAlerts);
}
