import { NextResponse } from 'next/server';

export async function GET() {
  const mockStockMovementSummary = {
    totalIssued: 245,
    totalReceived: 67,
    totalReturns: 18,
    netMovement: -196,
    topIssuedProducts: [
      { name: 'Premium Wireless Headphones', quantity: 45 },
      { name: 'Smart Fitness Watch', quantity: 38 },
      { name: 'Gaming Mouse Pro', quantity: 32 }
    ]
  };

  return NextResponse.json(mockStockMovementSummary);
}
