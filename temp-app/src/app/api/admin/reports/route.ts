import { NextResponse } from 'next/server';

const mockReports = [
  {
    id: '1',
    name: 'Daily Stock Movement Report',
    type: 'stock-movement',
    period: '2024-01-25',
    generatedAt: '2024-01-25T10:30:00Z',
    status: 'ready'
  },
  {
    id: '2',
    name: 'Weekly Top Selling Products',
    type: 'top-selling',
    period: 'Week 4, 2024',
    generatedAt: '2024-01-25T09:15:00Z',
    status: 'ready'
  },
  {
    id: '3',
    name: 'Monthly Dead Stock Analysis',
    type: 'dead-stock',
    period: 'January 2024',
    generatedAt: '2024-01-25T08:00:00Z',
    status: 'ready'
  }
];

export async function GET() {
  return NextResponse.json(mockReports);
}
