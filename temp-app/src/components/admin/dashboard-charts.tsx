'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';

// API functions for dashboard data
const fetchSalesData = async (): Promise<any[]> => {
  try {
    const response = await fetch('/api/admin/analytics/sales');
    if (!response.ok) throw new Error('Failed to fetch sales data');
    return await response.json();
  } catch (error) {
    console.error('Error fetching sales data:', error);
    return [];
  }
};

const fetchStockMovementData = async (): Promise<any[]> => {
  try {
    const response = await fetch('/api/admin/analytics/stock-movement');
    if (!response.ok) throw new Error('Failed to fetch stock movement data');
    return await response.json();
  } catch (error) {
    console.error('Error fetching stock movement data:', error);
    return [];
  }
};

const fetchCategoryData = async (): Promise<any[]> => {
  try {
    const response = await fetch('/api/admin/analytics/categories');
    if (!response.ok) throw new Error('Failed to fetch category data');
    return await response.json();
  } catch (error) {
    console.error('Error fetching category data:', error);
    return [];
  }
};

const fetchTopProductsData = async (): Promise<any[]> => {
  try {
    const response = await fetch('/api/admin/analytics/top-products');
    if (!response.ok) throw new Error('Failed to fetch top products data');
    return await response.json();
  } catch (error) {
    console.error('Error fetching top products data:', error);
    return [];
  }
};

const COLORS = ['#0f172a', '#1e40af', '#059669', '#dc2626', '#7c3aed'];

export function DashboardCharts() {
  const [salesData, setSalesData] = useState<any[]>([]);
  const [stockMovementData, setStockMovementData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [topProductsData, setTopProductsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadChartData = async () => {
      setLoading(true);
      try {
        const [sales, stockMovement, categories, topProducts] = await Promise.all([
          fetchSalesData(),
          fetchStockMovementData(),
          fetchCategoryData(),
          fetchTopProductsData()
        ]);
        
        setSalesData(sales);
        setStockMovementData(stockMovement);
        setCategoryData(categories);
        setTopProductsData(topProducts);
        setError(null);
      } catch (err) {
        setError('Failed to load chart data');
        console.error('Error loading chart data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadChartData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sg-navy mx-auto mb-4"></div>
          <p className="text-sg-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Sales Overview */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-sg-gray-200">
        <h3 className="text-lg font-semibold text-sg-black mb-4">Sales Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="sales" 
              stroke="#0f172a" 
              fill="#0f172a" 
              fillOpacity={0.1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Stock Movement */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-sg-gray-200">
        <h3 className="text-lg font-semibold text-sg-black mb-4">Weekly Stock Movement</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stockMovementData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="issued" fill="#dc2626" name="Issued" />
            <Bar dataKey="received" fill="#059669" name="Received" />
            <Bar dataKey="returns" fill="#f59e0b" name="Returns" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Distribution */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-sg-gray-200">
        <h3 className="text-lg font-semibold text-sg-black mb-4">Sales by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }: any) => `${name} ${value}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-sg-gray-200">
        <h3 className="text-lg font-semibold text-sg-black mb-4">Top Selling Products</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topProductsData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={120} />
            <Tooltip />
            <Bar dataKey="sales" fill="#0f172a" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Trend */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-sg-gray-200 lg:col-span-2">
        <h3 className="text-lg font-semibold text-sg-black mb-4">Revenue & Orders Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Line 
              yAxisId="left" 
              type="monotone" 
              dataKey="sales" 
              stroke="#0f172a" 
              strokeWidth={3}
              name="Revenue ($)"
            />
            <Line 
              yAxisId="right" 
              type="monotone" 
              dataKey="orders" 
              stroke="#059669" 
              strokeWidth={3}
              name="Orders"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
