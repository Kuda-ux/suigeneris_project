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

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [orderStats, setOrderStats] = useState({ total: 0, revenue: 0, pending: 0, delivered: 0 });
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

  const loadOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      setOrders(data);
      
      const total = data.length;
      const revenue = data.reduce((sum: number, o: any) => sum + o.total_amount, 0);
      const pending = data.filter((o: any) => o.status === 'pending' || o.status === 'processing').length;
      const delivered = data.filter((o: any) => o.status === 'delivered').length;
      setOrderStats({ total, revenue, pending, delivered });
    } catch (err) {
      console.error('Error loading orders:', err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const loadProducts = async () => {
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Error loading products:', err);
    }
  };

  useEffect(() => {
    if (activeTab === 'orders') {
      loadOrders();
      loadProducts();
    }
  }, [activeTab]);

  const handleExportOrders = () => {
    const headers = ['Order Number', 'Customer', 'Product', 'Quantity', 'Total', 'Status', 'Date'];
    const csvContent = [
      headers.join(','),
      ...orders.map(order => [
        order.order_number,
        `"${order.customer_name}"`,
        `"${order.product_name}"`,
        order.quantity,
        order.total_amount,
        order.status,
        new Date(order.created_at).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `orders-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNewOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: formData.get('customer_name'),
          customer_email: formData.get('customer_email'),
          product_id: parseInt(formData.get('product_id') as string),
          quantity: parseInt(formData.get('quantity') as string),
          payment_method: formData.get('payment_method'),
          shipping_address: formData.get('shipping_address')
        })
      });
      
      if (res.ok) {
        setShowNewOrderModal(false);
        loadOrders();
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to create order');
      }
    } catch (err) {
      console.error('Error creating order:', err);
      alert('Failed to create order');
    }
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
                    <ShoppingCart className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-white text-3xl font-bold mb-1">{orderStats.total}</h3>
                <p className="text-blue-100 text-sm font-medium">Total Orders</p>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-white text-3xl font-bold mb-1">${orderStats.revenue.toLocaleString()}</h3>
                <p className="text-emerald-100 text-sm font-medium">Total Revenue</p>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-white text-3xl font-bold mb-1">{orderStats.pending}</h3>
                <p className="text-yellow-100 text-sm font-medium">Pending Orders</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-white text-3xl font-bold mb-1">{orderStats.delivered}</h3>
                <p className="text-green-100 text-sm font-medium">Delivered</p>
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
                    {loadingOrders ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                          <p className="text-gray-600">Loading orders...</p>
                        </td>
                      </tr>
                    ) : orders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center">
                          <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-500 font-medium">No orders found</p>
                        </td>
                      </tr>
                    ) : (
                      orders.slice(0, 10).map((order) => (
                        <tr key={order.id} className="hover:bg-sg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-bold text-sg-navy font-mono">{order.order_number}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-sg-black">{order.customer_name}</div>
                            <div className="text-xs text-gray-500">{order.customer_email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-sg-gray-600">{order.product_name}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-bold text-emerald-600">${order.total_amount.toLocaleString()}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border-2 ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-800 border-green-200' :
                              order.status === 'processing' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                              order.status === 'shipped' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                              order.status === 'cancelled' ? 'bg-red-100 text-red-800 border-red-200' :
                              'bg-gray-100 text-gray-800 border-gray-200'
                            }`}>
                              {order.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-sg-gray-500">{new Date(order.created_at).toLocaleDateString()}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <button className="text-sg-navy hover:text-sg-navy/80">
                                <Eye className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Create New Order</h2>
                <p className="text-gray-600 text-sm mt-1">Fill in the order details</p>
              </div>
              <button 
                onClick={() => setShowNewOrderModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleNewOrder}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    name="customer_name"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Customer Email *
                  </label>
                  <input
                    type="email"
                    name="customer_email"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Product *
                  </label>
                  <select
                    name="product_id"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="">Select product</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id}>
                        {product.name} - ${product.price} (Stock: {product.stock_count})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Payment Method *
                  </label>
                  <select
                    name="payment_method"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="paynow">PayNow</option>
                    <option value="innbucks">InnBucks</option>
                    <option value="omari">Omari</option>
                    <option value="ecocash">EcoCash</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="cash">Cash</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Delivery Address *
                  </label>
                  <textarea
                    name="shipping_address"
                    required
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                    placeholder="e.g., 123 Samora Machel Ave, Harare, Zimbabwe"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t-2 border-gray-100 mt-6">
                <button
                  type="button"
                  onClick={() => setShowNewOrderModal(false)}
                  className="px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 font-semibold shadow-lg transition-all flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
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
