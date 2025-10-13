import { NextResponse } from 'next/server';

const mockRoles = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access',
    permissions: ['products.read', 'products.write', 'stock.read', 'stock.write', 'users.read', 'users.write', 'reports.read'],
    userCount: 2,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Sales',
    description: 'Sales and customer management',
    permissions: ['products.read', 'stock.read', 'orders.read', 'orders.write'],
    userCount: 5,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Warehouse',
    description: 'Stock and inventory management',
    permissions: ['products.read', 'stock.read', 'stock.write'],
    userCount: 3,
    createdAt: '2024-01-01T00:00:00Z'
  }
];

export async function GET() {
  return NextResponse.json(mockRoles);
}

export async function POST(request: Request) {
  const roleData = await request.json();
  
  const newRole = {
    id: Date.now().toString(),
    ...roleData,
    userCount: 0,
    createdAt: new Date().toISOString()
  };
  
  return NextResponse.json(newRole);
}
