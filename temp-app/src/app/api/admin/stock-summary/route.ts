import { NextResponse } from 'next/server';

export async function GET() {
  const mockStockSummary = {
    totalProducts: 156,
    totalStock: 1247,
    lowStockItems: 8,
    outOfStockItems: 3,
    totalValue: 89450.75,
    recentMovements: [
      {
        id: '1',
        productName: 'Premium Wireless Headphones',
        type: 'issued',
        quantity: 25,
        timestamp: '2024-01-25T10:30:00Z'
      },
      {
        id: '2',
        productName: 'Smart Fitness Watch',
        type: 'received',
        quantity: 50,
        timestamp: '2024-01-24T14:15:00Z'
      }
    ]
  };

  return NextResponse.json(mockStockSummary);
}
