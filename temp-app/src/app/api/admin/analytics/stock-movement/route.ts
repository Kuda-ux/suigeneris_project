import { NextResponse } from 'next/server';

export async function GET() {
  const mockStockMovementData = [
    { name: 'Jan', issued: 120, received: 80, returns: 15 },
    { name: 'Feb', issued: 98, received: 65, returns: 12 },
    { name: 'Mar', issued: 156, received: 92, returns: 18 },
    { name: 'Apr', issued: 134, received: 78, returns: 14 },
    { name: 'May', issued: 142, received: 88, returns: 16 },
    { name: 'Jun', issued: 167, received: 95, returns: 20 },
    { name: 'Jul', issued: 189, received: 112, returns: 22 }
  ];

  return NextResponse.json(mockStockMovementData);
}
