import { NextResponse } from 'next/server';

export async function GET() {
  const mockCategoryData = [
    { name: 'Audio', value: 35, sales: 1200 },
    { name: 'Wearables', value: 25, sales: 850 },
    { name: 'Electronics', value: 20, sales: 680 },
    { name: 'Fashion', value: 12, sales: 410 },
    { name: 'Home', value: 8, sales: 270 }
  ];

  return NextResponse.json(mockCategoryData);
}
