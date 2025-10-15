'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  Package, 
  DollarSign, 
  ShoppingCart, 
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Boxes,
  RefreshCw
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

interface DashboardStats {
  totalProducts: number;
  totalValue: number;
  lowStockCount: number;
  outOfStockCount: number;
  categories: {
    name: string;
    count: number;
    value: number;
    color: string;
  }[];
  topProducts: {
    id: string;
    name: string;
    category: string;
    stock: number;
    price: number;
    value: number;
  }[];
  stockLevels: {
    category: string;
    inStock: number;
    lowStock: number;
    outOfStock: number;
  }[];
}

const CATEGORY_COLORS = {
  'Laptops': '#3b82f6',      // Blue
  'Desktops': '#8b5cf6',     // Purple
  'Smartphones': '#10b981',  // Green
  'Monitors': '#f59e0b',     // Orange
};

export function OverviewDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/admin/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      
      const products = await response.json();
      
      // Calculate real statistics from database
      const totalProducts = products.length;
      const totalValue = products.reduce((sum: number, p: any) => 
        sum + (p.price * p.currentStock), 0
      );
      
      const lowStockCount = products.filter((p: any) => 
        p.currentStock > 0 && p.currentStock <= p.reorderLevel
      ).length;
      
      const outOfStockCount = products.filter((p: any) => 
        p.currentStock === 0
      ).length;

      // Group by category
      const categoryMap = new Map();
      products.forEach((p: any) => {
        if (!categoryMap.has(p.category)) {
          categoryMap.set(p.category, { count: 0, value: 0 });
        }
        const cat = categoryMap.get(p.category);
        cat.count += 1;
        cat.value += p.price * p.currentStock;
      });

      const categories = Array.from(categoryMap.entries()).map(([name, data]: any) => ({
        name,
        count: data.count,
        value: data.value,
        color: CATEGORY_COLORS[name as keyof typeof CATEGORY_COLORS] || '#6b7280'
      }));

      // Top 5 products by value
      const topProducts = products
        .map((p: any) => ({
          id: p.id,
          name: p.name,
          category: p.category,
          stock: p.currentStock,
          price: p.price,
          value: p.price * p.currentStock
        }))
        .sort((a: any, b: any) => b.value - a.value)
        .slice(0, 5);

      // Stock levels by category
      const stockLevels = Array.from(categoryMap.keys()).map((category: string) => {
        const categoryProducts = products.filter((p: any) => p.category === category);
        return {
          category,
          inStock: categoryProducts.filter((p: any) => p.currentStock > p.reorderLevel).length,
          lowStock: categoryProducts.filter((p: any) => p.currentStock > 0 && p.currentStock <= p.reorderLevel).length,
          outOfStock: categoryProducts.filter((p: any) => p.currentStock === 0).length,
        };
      });

      setStats({
        totalProducts,
        totalValue,
        lowStockCount,
        outOfStockCount,
        categories,
        topProducts,
        stockLevels
      });
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
            <div>
              <p className="text-red-800 font-semibold text-lg">Error Loading Dashboard</p>
              <p className="text-red-600 mt-1">{error}</p>
            </div>
          </div>
          <button
            onClick={loadDashboardData}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const StatCard = ({ title, value, subtitle, icon: Icon, trend, trendValue, color }: any) => (
    <div className={`bg-gradient-to-br ${color} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-white/80 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-white text-3xl font-bold mb-2">{value}</h3>
          {subtitle && <p className="text-white/70 text-sm">{subtitle}</p>}
        </div>
        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
          <Icon className="h-7 w-7 text-white" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          {trend === 'up' ? (
            <ArrowUp className="h-4 w-4 text-white mr-1" />
          ) : (
            <ArrowDown className="h-4 w-4 text-white mr-1" />
          )}
          <span className="text-white text-sm font-semibold">{trendValue}</span>
          <span className="text-white/70 text-sm ml-2">from last month</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-600 mt-1">Real-time inventory insights from your database</p>
        </div>
        <button
          onClick={loadDashboardData}
          className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Data
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          subtitle="In database"
          icon={Package}
          color="from-blue-500 to-blue-600"
        />
        <StatCard
          title="Inventory Value"
          value={`$${stats.totalValue.toLocaleString()}`}
          subtitle="Total stock worth"
          icon={DollarSign}
          color="from-emerald-500 to-emerald-600"
        />
        <StatCard
          title="Low Stock Items"
          value={stats.lowStockCount}
          subtitle="Need reordering"
          icon={AlertTriangle}
          color="from-orange-500 to-orange-600"
        />
        <StatCard
          title="Out of Stock"
          value={stats.outOfStockCount}
          subtitle="Urgent attention"
          icon={ShoppingCart}
          color="from-red-500 to-red-600"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Inventory by Category</h3>
            <Boxes className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.categories}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, count }: any) => `${name}: ${count}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
              >
                {stats.categories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: any, name: any, props: any) => [
                  `${value} products ($${props.payload.value.toLocaleString()})`,
                  props.payload.name
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {stats.categories.map((cat) => (
              <div key={cat.name} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: cat.color }}
                />
                <span className="text-sm text-gray-700 font-medium">{cat.name}</span>
                <span className="text-sm text-gray-500 ml-auto">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stock Status by Category */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Stock Status by Category</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.stockLevels}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="category" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend />
              <Bar dataKey="inStock" fill="#10b981" name="In Stock" radius={[8, 8, 0, 0]} />
              <Bar dataKey="lowStock" fill="#f59e0b" name="Low Stock" radius={[8, 8, 0, 0]} />
              <Bar dataKey="outOfStock" fill="#ef4444" name="Out of Stock" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Top 5 Products by Value</h3>
          <TrendingUp className="h-5 w-5 text-emerald-500" />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Product</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Category</th>
                <th className="px-4 py-3 text-right text-sm font-bold text-gray-700">Stock</th>
                <th className="px-4 py-3 text-right text-sm font-bold text-gray-700">Price</th>
                <th className="px-4 py-3 text-right text-sm font-bold text-gray-700">Total Value</th>
              </tr>
            </thead>
            <tbody>
              {stats.topProducts.map((product, index) => (
                <tr 
                  key={product.id} 
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold text-sm mr-3">
                        {index + 1}
                      </div>
                      <span className="font-medium text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span 
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ 
                        backgroundColor: `${CATEGORY_COLORS[product.category as keyof typeof CATEGORY_COLORS]}20`,
                        color: CATEGORY_COLORS[product.category as keyof typeof CATEGORY_COLORS]
                      }}
                    >
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="font-semibold text-gray-900">{product.stock}</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="font-semibold text-gray-900">${product.price.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="font-bold text-emerald-600 text-lg">
                      ${product.value.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Category Value Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Inventory Value by Category</h3>
          <DollarSign className="h-5 w-5 text-gray-400" />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={stats.categories}>
            <defs>
              {stats.categories.map((cat, index) => (
                <linearGradient key={index} id={`color${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={cat.color} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={cat.color} stopOpacity={0.1}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <YAxis 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip 
              formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Value']}
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#3b82f6" 
              fill="url(#color0)" 
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
