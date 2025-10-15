'use client';

import { useState, useEffect } from 'react';
import { 
  Download, TrendingUp, TrendingDown, Package, AlertTriangle, 
  BarChart3, RefreshCw, DollarSign, ShoppingCart, Boxes, 
  Activity, FileText, Calendar, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

export function ReportsSection() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'stock' | 'sales' | 'deadstock'>('overview');

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/reports?type=all');
      const data = await res.json();
      setAnalytics(data);
    } catch (err) {
      console.error('Error loading analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDownloadReport = (reportType: string) => {
    let csvContent = '';
    let filename = '';

    if (reportType === 'overview' && analytics?.overview) {
      csvContent = `Sui Generis Store - Overview Report\nGenerated: ${new Date().toLocaleString()}\n\n`;
      csvContent += `Metric,Value\n`;
      csvContent += `Total Products,${analytics.overview.totalProducts}\n`;
      csvContent += `Total Stock Value,$${analytics.overview.totalStockValue.toLocaleString()}\n`;
      csvContent += `Low Stock Products,${analytics.overview.lowStockProducts}\n`;
      csvContent += `Out of Stock,${analytics.overview.outOfStockProducts}\n`;
      csvContent += `Total Orders,${analytics.overview.totalOrders}\n`;
      csvContent += `Total Revenue,$${analytics.overview.totalRevenue.toLocaleString()}\n`;
      csvContent += `Pending Orders,${analytics.overview.pendingOrders}\n`;
      csvContent += `Delivered Orders,${analytics.overview.deliveredOrders}\n`;
      filename = 'overview-report';
    } else if (reportType === 'stock' && analytics?.stockMovement) {
      csvContent = `Sui Generis Store - Stock Movement Report\nGenerated: ${new Date().toLocaleString()}\n\n`;
      csvContent += `Total Issued,${analytics.stockMovement.totalIssued}\n`;
      csvContent += `Total Received,${analytics.stockMovement.totalReceived}\n`;
      csvContent += `Total Returns,${analytics.stockMovement.totalReturns}\n\n`;
      csvContent += `Recent Movements:\nProduct,Type,Quantity,Date\n`;
      analytics.stockMovement.recentMovements?.forEach((m: any) => {
        csvContent += `"${m.product_name}",${m.type},${m.quantity},${new Date(m.date).toLocaleDateString()}\n`;
      });
      filename = 'stock-movement-report';
    } else if (reportType === 'sales' && analytics?.topSelling) {
      csvContent = `Sui Generis Store - Top Selling Products Report\nGenerated: ${new Date().toLocaleString()}\n\n`;
      csvContent += `Product,Quantity Sold,Revenue,Orders\n`;
      analytics.topSelling.forEach((p: any) => {
        csvContent += `"${p.product_name}",${p.quantity},$${p.revenue.toLocaleString()},${p.orders}\n`;
      });
      filename = 'top-selling-report';
    } else if (reportType === 'deadstock' && analytics?.deadStock) {
      csvContent = `Sui Generis Store - Dead Stock Report\nGenerated: ${new Date().toLocaleString()}\n\n`;
      csvContent += `Product,Current Stock,Days Since Last Sale,Value,Category\n`;
      analytics.deadStock.forEach((p: any) => {
        csvContent += `"${p.name}",${p.currentStock},${p.daysSinceLastSale},$${p.value.toLocaleString()},"${p.category}"\n`;
      });
      filename = 'dead-stock-report';
    }

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const overview = analytics?.overview || {};
  const stockMovement = analytics?.stockMovement || {};
  const topSelling = analytics?.topSelling || [];
  const deadStock = analytics?.deadStock || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Reports & Analytics</h2>
          <p className="text-gray-600 mt-1">Comprehensive business insights and reports</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={loadData}
            className="flex items-center px-4 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
          <button
            onClick={() => handleDownloadReport(activeTab)}
            className="flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
          >
            <Download className="h-5 w-5 mr-2" />
            Download Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-start justify-between mb-3">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
              <Boxes className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-white text-3xl font-bold mb-1">{overview.totalProducts || 0}</h3>
          <p className="text-blue-100 text-sm font-medium">Total Products</p>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-start justify-between mb-3">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-white text-3xl font-bold mb-1">${(overview.totalRevenue || 0).toLocaleString()}</h3>
          <p className="text-emerald-100 text-sm font-medium">Total Revenue</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-start justify-between mb-3">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
              <ShoppingCart className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-white text-3xl font-bold mb-1">{overview.totalOrders || 0}</h3>
          <p className="text-purple-100 text-sm font-medium">Total Orders</p>
        </div>
        
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-start justify-between mb-3">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
              <Activity className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-white text-3xl font-bold mb-1">${(overview.totalStockValue || 0).toLocaleString()}</h3>
          <p className="text-amber-100 text-sm font-medium">Stock Value</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-1 inline-flex">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center ${
            activeTab === 'overview'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Overview
        </button>
        <button
          onClick={() => setActiveTab('stock')}
          className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center ${
            activeTab === 'stock'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Package className="h-4 w-4 mr-2" />
          Stock Movement
        </button>
        <button
          onClick={() => setActiveTab('sales')}
          className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center ${
            activeTab === 'sales'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          Top Selling
        </button>
        <button
          onClick={() => setActiveTab('deadstock')}
          className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center ${
            activeTab === 'deadstock'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <AlertTriangle className="h-4 w-4 mr-2" />
          Dead Stock
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Package className="h-5 w-5 mr-2 text-blue-600" />
              Inventory Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border-2 border-blue-100">
                <span className="text-gray-700 font-medium">Total Products</span>
                <span className="text-2xl font-bold text-blue-600">{overview.totalProducts || 0}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl border-2 border-yellow-100">
                <span className="text-gray-700 font-medium">Low Stock Items</span>
                <span className="text-2xl font-bold text-yellow-600">{overview.lowStockProducts || 0}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border-2 border-red-100">
                <span className="text-gray-700 font-medium">Out of Stock</span>
                <span className="text-2xl font-bold text-red-600">{overview.outOfStockProducts || 0}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2 text-emerald-600" />
              Orders Summary
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border-2 border-emerald-100">
                <span className="text-gray-700 font-medium">Total Orders</span>
                <span className="text-2xl font-bold text-emerald-600">{overview.totalOrders || 0}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl border-2 border-yellow-100">
                <span className="text-gray-700 font-medium">Pending</span>
                <span className="text-2xl font-bold text-yellow-600">{overview.pendingOrders || 0}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border-2 border-green-100">
                <span className="text-gray-700 font-medium">Delivered</span>
                <span className="text-2xl font-bold text-green-600">{overview.deliveredOrders || 0}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stock Movement Tab */}
      {activeTab === 'stock' && (
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b-2 border-gray-100">
            <h3 className="text-xl font-bold text-gray-900">Stock Movement Summary</h3>
            <p className="text-sm text-gray-600 mt-1">Track inventory changes and movements</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-5 border-2 border-red-200">
                <div className="flex items-center justify-between mb-2">
                  <ArrowDownRight className="h-8 w-8 text-red-600" />
                </div>
                <div className="text-3xl font-bold text-red-700 mb-1">{stockMovement.totalIssued || 0}</div>
                <div className="text-sm font-medium text-red-600">Total Issued</div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border-2 border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <ArrowUpRight className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-green-700 mb-1">{stockMovement.totalReceived || 0}</div>
                <div className="text-sm font-medium text-green-600">Total Received</div>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-5 border-2 border-yellow-200">
                <div className="flex items-center justify-between mb-2">
                  <Package className="h-8 w-8 text-yellow-600" />
                </div>
                <div className="text-3xl font-bold text-yellow-700 mb-1">{stockMovement.totalReturns || 0}</div>
                <div className="text-sm font-medium text-yellow-600">Total Returns</div>
              </div>
            </div>

            {stockMovement.recentMovements && stockMovement.recentMovements.length > 0 && (
              <>
                <h4 className="font-bold text-gray-900 mb-4 text-lg">Recent Movements</h4>
                <div className="space-y-2">
                  {stockMovement.recentMovements.slice(0, 5).map((movement: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          movement.type === 'issue' ? 'bg-red-100' :
                          movement.type === 'receive' ? 'bg-green-100' :
                          'bg-yellow-100'
                        }`}>
                          <Package className={`h-4 w-4 ${
                            movement.type === 'issue' ? 'text-red-600' :
                            movement.type === 'receive' ? 'text-green-600' :
                            'text-yellow-600'
                          }`} />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{movement.product_name}</div>
                          <div className="text-sm text-gray-500">{new Date(movement.date).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className={`font-bold ${
                        movement.type === 'issue' ? 'text-red-600' :
                        movement.type === 'receive' ? 'text-green-600' :
                        'text-yellow-600'
                      }`}>
                        {movement.type === 'issue' ? '-' : '+'}{movement.quantity}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Top Selling Tab */}
      {activeTab === 'sales' && (
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b-2 border-gray-100">
            <h3 className="text-xl font-bold text-gray-900">Top Selling Products</h3>
            <p className="text-sm text-gray-600 mt-1">Best performing products by revenue</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Quantity Sold</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Orders</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {topSelling.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <TrendingUp className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 font-medium">No sales data available</p>
                    </td>
                  </tr>
                ) : (
                  topSelling.map((product: any, index: number) => (
                    <tr key={index} className="hover:bg-blue-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          index === 0 ? 'bg-yellow-100 text-yellow-700' :
                          index === 1 ? 'bg-gray-100 text-gray-700' :
                          index === 2 ? 'bg-orange-100 text-orange-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {index + 1}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-gray-900">{product.product_name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-900">{product.quantity}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-bold text-emerald-600">${product.revenue.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-3 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-800 border-2 border-blue-200">
                          {product.orders} orders
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Dead Stock Tab */}
      {activeTab === 'deadstock' && (
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b-2 border-gray-100">
            <h3 className="text-xl font-bold text-gray-900">Dead Stock Analysis</h3>
            <p className="text-sm text-gray-600 mt-1">Products with no sales in 30+ days</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Current Stock</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Days Inactive</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Stock Value</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Category</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {deadStock.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <AlertTriangle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 font-medium">No dead stock found</p>
                      <p className="text-gray-400 text-sm mt-1">All products are moving well!</p>
                    </td>
                  </tr>
                ) : (
                  deadStock.map((product: any, index: number) => (
                    <tr key={index} className="hover:bg-red-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-gray-900">{product.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-900">{product.currentStock}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-3 py-1 text-xs font-bold rounded-full bg-red-100 text-red-800 border-2 border-red-200">
                          {product.daysSinceLastSale} days
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-bold text-gray-900">${product.value.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">{product.category}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
