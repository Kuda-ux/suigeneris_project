import { NextResponse } from 'next/server';

export async function GET() {
  const mockDeadStockItems = [
    { name: 'Vintage Camera Lens', daysWithoutSale: 45, currentStock: 23, lastSale: '2023-12-10' },
    { name: 'Retro Gaming Console', daysWithoutSale: 38, currentStock: 15, lastSale: '2023-12-17' },
    { name: 'Classic Vinyl Records', daysWithoutSale: 32, currentStock: 8, lastSale: '2023-12-24' },
    { name: 'Analog Watch Collection', daysWithoutSale: 28, currentStock: 12, lastSale: '2023-12-28' }
  ];

  return NextResponse.json(mockDeadStockItems);
}
