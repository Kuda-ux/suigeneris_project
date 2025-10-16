'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Bell,
  Shield,
  FileText,
  Warehouse,
  Search,
  Menu,
  X,
  ChevronRight,
  User
} from 'lucide-react';
import { ProductManagement } from './product-management';
import { StockManagement } from './stock-management';
import { OverviewDashboard } from './overview-dashboard';
import { RolesPermissions } from './roles-permissions';
import { ReportsSection } from './reports-section';
import { AlertsSystem } from './alerts-system';
import { OrdersManagement } from './orders-management';

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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
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

  if (!isAuthenticated) {
    return null;
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
        return <OrdersManagement />;
      case 'users':
        return <RolesPermissions />;
      case 'reports':
        return <ReportsSection />;
      case 'alerts':
        return <AlertsSystem />;
      default:
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h3>
              <p className="text-gray-600">This section is under development</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 h-screen transition-transform ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="h-full px-3 py-4 overflow-y-auto bg-gradient-to-b from-gray-900 to-black border-r border-gray-800">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8 px-3">
            {sidebarOpen && (
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10">
                  <Image
                    src="/logo.svg"
                    alt="Sui Generis"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="text-sm font-black bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                    SUI GENERIS
                  </div>
                  <div className="text-xs text-gray-400 font-semibold">Admin Panel</div>
                </div>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:block p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
            >
              <ChevronRight className={`w-5 h-5 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Navigation */}
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileSidebarOpen(false);
                    }}
                    className={`flex items-center w-full p-3 rounded-xl transition-all group ${
                      isActive
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${sidebarOpen ? 'mr-3' : 'mx-auto'}`} />
                    {sidebarOpen && (
                      <span className="font-semibold">{item.label}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Logout Button */}
          <div className="absolute bottom-4 left-3 right-3">
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-3 text-gray-400 hover:bg-red-600 hover:text-white rounded-xl transition-all group"
            >
              <LogOut className={`w-5 h-5 ${sidebarOpen ? 'mr-3' : 'mx-auto'}`} />
              {sidebarOpen && <span className="font-semibold">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className={`transition-all ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Modern Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Left Side */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setMobileSidebarOpen(true)}
                  className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <div>
                  <h1 className="text-2xl font-black text-gray-900">Admin Dashboard</h1>
                  <p className="text-sm text-gray-500 font-medium">Welcome back, Admin</p>
                </div>
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="hidden md:flex items-center">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none w-64 font-medium"
                    />
                  </div>
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-all">
                  <Bell className="w-6 h-6" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
                </button>

                {/* Profile */}
                <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                  <div className="hidden md:block text-right">
                    <div className="text-sm font-bold text-gray-900">Admin User</div>
                    <div className="text-xs text-gray-500 font-medium">Super Admin</div>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center text-white font-bold">
                    <User className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
