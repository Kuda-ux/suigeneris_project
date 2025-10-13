import { NextResponse } from 'next/server';

export async function GET() {
  const mockTopSellingProducts = [
    { name: 'Premium Wireless Headphones', unitsSold: 156, revenue: 46800, growth: 12.5 },
    { name: 'Smart Fitness Watch', unitsSold: 142, revenue: 28400, growth: 8.3 },
    { name: 'Gaming Mouse Pro', unitsSold: 98, revenue: 7840, growth: -2.1 },
    { name: 'Bluetooth Speaker', unitsSold: 87, revenue: 13050, growth: 15.7 },
    { name: 'Phone Case', unitsSold: 76, revenue: 2280, growth: 5.2 }
  ];

  return NextResponse.json(mockTopSellingProducts);
}
