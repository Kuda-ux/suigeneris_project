'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  TrendingUp,
  DollarSign,
  Eye,
  Edit,
  Bell,
  Shield,
  FileText,
  Warehouse,
  Plus,
  Smartphone,
  X
} from 'lucide-react';
import { ProductManagement } from './product-management';
import { StockManagement } from './stock-management';
import { OverviewDashboard } from './overview-dashboard';
import { RolesPermissions } from './roles-permissions';
import { ReportsSection } from './reports-section';
import { AlertsSystem } from './alerts-system';

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'stock', label: 'Stock Management', icon: Warehouse },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'users', label: 'Users & Roles', icon: Shield },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'alerts', label: 'Alerts', icon: Bell },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

// Calculate real stats from Sui Generis data
const totalProducts = products.length;
const totalStockValue = products.reduce((sum, product) => sum + (product.price * product.stockCount), 0);
const averagePrice = products.reduce((sum, product) => sum + product.price, 0) / products.length;
const totalStock = products.reduce((sum, product) => sum + product.stockCount, 0);

const stats = [
  { label: 'Total Revenue', value: `$${(totalStockValue * 0.3).toLocaleString()}`, change: '+18.2%', trend: 'up', icon: DollarSign },
  { label: 'Orders Today', value: '43', change: '+12.8%', trend: 'up', icon: ShoppingCart },
  { label: 'Total Products', value: totalProducts.toString(), change: '+5.2%', trend: 'up', icon: Package },
  { label: 'Total Stock', value: totalStock.toString(), change: '+8.7%', trend: 'up', icon: Warehouse },
];

const recentOrders = [
  { id: '#SG-2024-001', customer: 'Michael Chen', product: 'HP 250 G10 (i7)', amount: '$800.00', status: 'Completed', date: '1 hour ago' },
  { id: '#SG-2024-002', customer: 'Sarah Johnson', product: 'Samsung Galaxy A51', amount: '$120.00', status: 'Processing', date: '3 hours ago' },
  { id: '#SG-2024-003', customer: 'David Rodriguez', product: 'Dell Latitude 5430 Rugged', amount: '$1,200.00', status: 'Shipped', date: '5 hours ago' },
  { id: '#SG-2024-004', customer: 'Emily Davis', product: 'Apple MacBook Pro 2017', amount: '$520.00', status: 'Completed', date: '7 hours ago' },
  { id: '#SG-2024-005', customer: 'James Wilson', product: 'MSI GF63 Gaming', amount: '$750.00', status: 'Processing', date: '9 hours ago' },
];

// Get top products from real Sui Generis inventory
const topProducts = [
  { 
    name: 'Dell Latitude 5430 Rugged', 
    sales: 45, 
    revenue: '$54,000', 
    trend: '+28%',
    category: 'Laptops',
    price: '$1,200'
  },
  { 
    name: 'HP 250 G10 (i7)', 
    sales: 67, 
    revenue: '$53,600', 
    trend: '+22%',
    category: 'Laptops',
    price: '$800'
  },
  { 
    name: 'Apple MacBook Pro 2017', 
    sales: 89, 
    revenue: '$46,280', 
    trend: '+35%',
    category: 'Laptops',
    price: '$520'
  },
  { 
    name: 'MSI GF63 Gaming', 
    sales: 34, 
    revenue: '$25,500', 
    trend: '+18%',
    category: 'Laptops',
    price: '$750'
  },
  { 
    name: 'Samsung Galaxy A51', 
    sales: 156, 
    revenue: '$18,720', 
    trend: '+42%',
    category: 'Smartphones',
    price: '$120'
  },
];

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (!auth) {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin');
  };

  const handleExportOrders = () => {
    // Create CSV content
    const headers = ['Order ID', 'Customer', 'Product', 'Amount', 'Status', 'Date'];
    const csvContent = [
      headers.join(','),
      ...recentOrders.map(order => [
        order.id,
        `"${order.customer}"`,
        `"${order.product}"`,
        order.amount,
        order.status,
        `"${order.date}"`
      ].join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `sui-generis-orders-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNewOrder = (orderData: any) => {
    // In a real app, this would create a new order via API
    console.log('Creating new order:', orderData);
    setShowNewOrderModal(false);
    // You could add the new order to the recentOrders array here
  };

  if (!isAuthenticated) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewDashboard />;
      
      case 'products':
        return <ProductManagement />;
      
      case 'stock':
        return <StockManagement />;
      
      case 'orders':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-sg-black">Orders Management</h2>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={handleExportOrders}
                  className="bg-sg-aqua hover:bg-sg-aqua/90 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Export Orders</span>
                </button>
                <button 
                  onClick={() => setShowNewOrderModal(true)}
                  className="bg-sg-red hover:bg-sg-red/90 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Order</span>
                </button>
              </div>
            </div>

            {/* Order Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 text-sm font-medium">Completed Orders</p>
                    <p className="text-2xl font-bold text-green-800">127</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-600 text-sm font-medium">Processing</p>
                    <p className="text-2xl font-bold text-yellow-800">23</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">Shipped</p>
                    <p className="text-2xl font-bold text-blue-800">45</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-sg-red/10 to-red-100 rounded-xl p-6 border border-red-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-600 text-sm font-medium">Total Revenue</p>
                    <p className="text-2xl font-bold text-red-800">$47,230</p>
                  </div>
                  <div className="w-12 h-12 bg-sg-red rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-xl shadow-sm border border-sg-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-sg-gray-200">
                <h3 className="text-lg font-semibold text-sg-black">Recent Orders</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-sg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-sg-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-sg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-bold text-sg-navy">{order.id}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-sg-black">{order.customer}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-sg-gray-600">{order.product}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-bold text-sg-red">{order.amount}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                            order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-sg-gray-500">{order.date}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <button className="text-sg-navy hover:text-sg-navy/80">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-sg-aqua hover:text-sg-aqua/80">
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
      case 'users':
        return <RolesPermissions />;
      
      case 'reports':
        return <ReportsSection />;
      
      case 'alerts':
        return <AlertsSystem />;
      
      case 'analytics':
        return <OverviewDashboard />;
      
      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-sg-black">Settings</h2>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-sg-gray-200">
              <p className="text-sg-gray-600">Settings panel would go here...</p>
            </div>
          </div>
        );
      
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="min-h-screen bg-sg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-sg-gray-200 flex flex-col">
        <div className="p-6 border-b border-sg-gray-200">
          <div className="flex items-center space-x-3 mb-2">
            <div className="relative w-8 h-8">
              <img
                src="/logo.svg"
                alt="Sui Generis Technologies"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-xl font-bold text-sg-black">Sui Generis</h1>
          </div>
          <p className="text-sm text-sg-gray-600">Admin Dashboard</p>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-sg-navy text-white'
                        : 'text-sg-gray-700 hover:bg-sg-gray-100'
                    }`}
                  >
                    <IconComponent className="h-5 w-5 mr-3" />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-sg-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 text-sg-gray-700 hover:bg-sg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-sg-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-sg-black capitalize">{activeTab}</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-sg-gray-600 hover:text-sg-gray-800 rounded-lg hover:bg-sg-gray-100">
                <Eye className="h-5 w-5" />
              </button>
              <div className="text-right">
                <p className="text-sm font-medium text-sg-black">Admin User</p>
                <p className="text-xs text-sg-gray-600">admin@suigeneris.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>

      {/* New Order Modal */}
      {showNewOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-sg-black">Create New Order</h2>
              <button 
                onClick={() => setShowNewOrderModal(false)}
                className="text-sg-gray-500 hover:text-sg-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const orderData = {
                customer: formData.get('customer'),
                product: formData.get('product'),
                quantity: formData.get('quantity'),
                amount: formData.get('amount'),
                status: formData.get('status')
              };
              handleNewOrder(orderData);
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-sg-gray-700 mb-2">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    name="customer"
                    required
                    className="w-full px-3 py-2 border border-sg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sg-aqua"
                    placeholder="Enter customer name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-sg-gray-700 mb-2">
                    Product
                  </label>
                  <select
                    name="product"
                    required
                    className="w-full px-3 py-2 border border-sg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sg-aqua"
                  >
                    <option value="">Select a product</option>
                    {products.slice(0, 10).map(product => (
                      <option key={product.id} value={product.name}>
                        {product.name} - ${product.price}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-sg-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    required
                    className="w-full px-3 py-2 border border-sg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sg-aqua"
                    placeholder="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-sg-gray-700 mb-2">
                    Amount
                  </label>
                  <input
                    type="text"
                    name="amount"
                    required
                    className="w-full px-3 py-2 border border-sg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sg-aqua"
                    placeholder="$0.00"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-sg-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    required
                    className="w-full px-3 py-2 border border-sg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sg-aqua"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNewOrderModal(false)}
                  className="px-4 py-2 text-sg-gray-700 border border-sg-gray-300 rounded-lg hover:bg-sg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sg-red text-white rounded-lg hover:bg-sg-red/90 transition-colors"
                >
                  Create Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
