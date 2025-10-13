import { NextResponse } from 'next/server';

const mockUsers = [
  {
    id: '1',
    name: 'John Admin',
    email: 'john@suigeneris.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-01-25T08:30:00Z',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Sarah Sales',
    email: 'sarah@suigeneris.com',
    role: 'Sales',
    status: 'active',
    lastLogin: '2024-01-24T16:45:00Z',
    createdAt: '2024-01-05T00:00:00Z'
  },
  {
    id: '3',
    name: 'Mike Warehouse',
    email: 'mike@suigeneris.com',
    role: 'Warehouse',
    status: 'active',
    lastLogin: '2024-01-25T07:15:00Z',
    createdAt: '2024-01-10T00:00:00Z'
  }
];

export async function GET() {
  return NextResponse.json(mockUsers);
}
