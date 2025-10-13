import { NextResponse } from 'next/server';

const mockProducts = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    category: 'Audio',
    price: 299.99,
    sku: 'PWH-001',
    openingStock: 100,
    currentStock: 45,
    stockIssued: 55,
    stockReceived: 0,
    stockReturns: 0,
    stockExchanges: 0,
    reorderLevel: 20,
    status: 'active' as const,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-25T00:00:00Z'
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitor',
    category: 'Wearables',
    price: 199.99,
    sku: 'SFW-002',
    openingStock: 75,
    currentStock: 8,
    stockIssued: 67,
    stockReceived: 0,
    stockReturns: 0,
    stockExchanges: 0,
    reorderLevel: 15,
    status: 'low-stock' as const,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-25T00:00:00Z'
  },
  {
    id: '3',
    name: 'Gaming Mouse Pro',
    description: 'Professional gaming mouse with RGB lighting',
    category: 'Electronics',
    price: 79.99,
    sku: 'GMP-003',
    openingStock: 50,
    currentStock: 0,
    stockIssued: 50,
    stockReceived: 0,
    stockReturns: 0,
    stockExchanges: 0,
    reorderLevel: 10,
    status: 'out-of-stock' as const,
    images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-25T00:00:00Z'
  }
];

export async function GET() {
  return NextResponse.json(mockProducts);
}

export async function POST(request: Request) {
  const productData = await request.json();
  
  const newProduct = {
    id: Date.now().toString(),
    ...productData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  return NextResponse.json(newProduct);
}
