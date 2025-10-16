'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package, BarChart3, PieChart } from 'lucide-react';

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('7days');

  // Mock data - in real app, this would come from API
  const stats = {
    revenue: { value: 12450, change: 12.5, trend: 'up' },
    orders: { value: 156, change: 8.3, trend: 'up' },
    customers: { value: 89, change: -3.2, trend: 'down' },
    products: { value: 234, change: 5.7, trend: 'up' },
  };

  const salesData = [
    { day: 'Mon', sales: 1200 },
    { day: 'Tue', sales: 1900 },
    { day: 'Wed', sales: 1500 },
    { day: 'Thu', sales: 2100 },
    { day: 'Fri', sales: 2400 },
    { day: 'Sat', sales: 1800 },
    { day: 'Sun', sales: 1600 },
  ];

  const topProducts = [
    { name: 'HP EliteBook x360', sales: 45, revenue: 16200 },
    { name: 'Dell Latitude 5410', sales: 38, revenue: 12160 },
    { name: 'Samsung Galaxy A51', sales: 32, revenue: 3840 },
    { name: 'Lenovo ThinkPad T480', sales: 28, revenue: 8400 },
    { name: 'Apple MacBook Pro 2017', sales: 22, revenue: 11440 },
  ];

  const categoryBreakdown = [
    { category: 'Laptops', percentage: 45, color: 'bg-red-600' },
    { category: 'Desktops', percentage: 25, color: 'bg-blue-600' },
    { category: 'Smartphones', percentage: 20, color: 'bg-green-600' },
    { category: 'Accessories', percentage: 10, color: 'bg-yellow-600' },
  ];

  const maxSales = Math.max(...salesData.map(d => d.sales));

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Analytics Overview</h2>
          <p className="text-sm text-gray-600 font-medium">Track your store performance</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none font-semibold"
        >
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="90days">Last 90 Days</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className={`flex items-center gap-1 text-sm font-bold ${stats.revenue.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {stats.revenue.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {stats.revenue.change}%
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900 mb-1">${stats.revenue.value.toLocaleString()}</div>
          <div className="text-sm font-semibold text-gray-600">Total Revenue</div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div className={`flex items-center gap-1 text-sm font-bold ${stats.orders.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {stats.orders.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {stats.orders.change}%
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900 mb-1">{stats.orders.value}</div>
          <div className="text-sm font-semibold text-gray-600">Total Orders</div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className={`flex items-center gap-1 text-sm font-bold ${stats.customers.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {stats.customers.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {Math.abs(stats.customers.change)}%
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900 mb-1">{stats.customers.value}</div>
          <div className="text-sm font-semibold text-gray-600">New Customers</div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div className={`flex items-center gap-1 text-sm font-bold ${stats.products.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {stats.products.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {stats.products.change}%
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900 mb-1">{stats.products.value}</div>
          <div className="text-sm font-semibold text-gray-600">Products Sold</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-black text-gray-900">Sales Overview</h3>
              <p className="text-sm text-gray-600 font-medium">Daily sales for the past week</p>
            </div>
            <BarChart3 className="w-6 h-6 text-red-600" />
          </div>
          <div className="space-y-4">
            {salesData.map((data, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 text-sm font-bold text-gray-600">{data.day}</div>
                <div className="flex-1">
                  <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-end px-3"
                      style={{ width: `${(data.sales / maxSales) * 100}%` }}
                    >
                      <span className="text-xs font-bold text-white">${data.sales}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-black text-gray-900">Categories</h3>
              <p className="text-sm text-gray-600 font-medium">Sales by category</p>
            </div>
            <PieChart className="w-6 h-6 text-red-600" />
          </div>
          <div className="space-y-4">
            {categoryBreakdown.map((cat, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-gray-900">{cat.category}</span>
                  <span className="text-sm font-bold text-gray-600">{cat.percentage}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${cat.color} rounded-full`}
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
        <h3 className="text-xl font-black text-gray-900 mb-6">Top Selling Products</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Rank</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Sales</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topProducts.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-white ${
                      index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                      index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                      index === 2 ? 'bg-gradient-to-r from-orange-400 to-orange-500' :
                      'bg-gray-300'
                    }`}>
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-900">{product.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">{product.sales} units</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-green-600">${product.revenue.toLocaleString()}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
