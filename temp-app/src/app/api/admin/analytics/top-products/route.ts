import { NextResponse } from 'next/server';

export async function GET() {
  const mockTopProductsData = [
    { name: 'Premium Wireless Headphones', sales: 156, revenue: 46800 },
    { name: 'Smart Fitness Watch', sales: 142, revenue: 28400 },
    { name: 'Gaming Mouse Pro', sales: 98, revenue: 7840 },
    { name: 'Bluetooth Speaker', sales: 87, revenue: 13050 },
    { name: 'Phone Case', sales: 76, revenue: 2280 }
  ];

  return NextResponse.json(mockTopProductsData);
}
