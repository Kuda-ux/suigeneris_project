import { NextResponse } from 'next/server';

const mockStockMovements = [
  {
    id: '1',
    productId: '1',
    productName: 'Premium Wireless Headphones',
    type: 'issued' as const,
    quantity: 25,
    previousStock: 70,
    newStock: 45,
    reason: 'Sales order #SO-001',
    reference: 'SO-001',
    timestamp: '2024-01-25T10:30:00Z',
    userId: 'admin',
    userName: 'Admin User'
  },
  {
    id: '2',
    productId: '2',
    productName: 'Smart Fitness Watch',
    type: 'received' as const,
    quantity: 50,
    previousStock: 25,
    newStock: 75,
    reason: 'Purchase order #PO-001',
    reference: 'PO-001',
    timestamp: '2024-01-24T14:15:00Z',
    userId: 'admin',
    userName: 'Admin User'
  }
];

export async function GET() {
  return NextResponse.json(mockStockMovements);
}

export async function POST(request: Request) {
  const movementData = await request.json();
  
  const newMovement = {
    id: Date.now().toString(),
    ...movementData,
    timestamp: new Date().toISOString(),
    userId: 'admin',
    userName: 'Admin User'
  };
  
  return NextResponse.json(newMovement);
}
