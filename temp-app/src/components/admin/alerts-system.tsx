'use client';

import { useState, useEffect } from 'react';
import { Bell, AlertTriangle, TrendingDown, Package, X, Settings, Check, RefreshCw, Filter, CheckCircle, XCircle } from 'lucide-react';

interface Alert {
  id: string;
  type: 'low-stock' | 'out-of-stock' | 'reorder-suggestion' | 'high-demand' | 'system';
  title: string;
  message: string;
  productId?: string;
  productName?: string;
  currentStock?: number;
  reorderLevel?: number;
  suggestedQuantity?: number;
  priority: 'high' | 'medium' | 'low';
  timestamp: string;
  isRead: boolean;
  isActionable: boolean;
}

// API functions for alerts
const fetchAlerts = async (): Promise<Alert[]> => {
  try {
    const response = await fetch('/api/admin/alerts');
    if (!response.ok) throw new Error('Failed to fetch alerts');
    return await response.json();
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return [];
  }
};

const markAlertAsRead = async (alertId: string): Promise<boolean> => {
  try {
    const response = await fetch(`/api/admin/alerts/${alertId}/read`, {
      method: 'PATCH'
    });
    return response.ok;
  } catch (error) {
    console.error('Error marking alert as read:', error);
    return false;
  }
};

const dismissAlert = async (alertId: string): Promise<boolean> => {
  try {
    const response = await fetch(`/api/admin/alerts/${alertId}`, {
      method: 'DELETE'
    });
    return response.ok;
  } catch (error) {
    console.error('Error dismissing alert:', error);
    return false;
  }
};

const createPurchaseOrderFromAlert = async (alertId: string, quantity: number): Promise<boolean> => {
  try {
    const response = await fetch('/api/admin/alerts/create-purchase-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alertId, quantity })
    });
    return response.ok;
  } catch (error) {
    console.error('Error creating purchase order:', error);
    return false;
  }
};

export function AlertsSystem() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [showSettings, setShowSettings] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const alertTypes = ['all', 'low-stock', 'out-of-stock', 'reorder-suggestion', 'high-demand', 'system'];
  const priorities = ['all', 'high', 'medium', 'low'];

  const loadAlerts = async () => {
    setLoading(true);
    try {
      const alertsData = await fetchAlerts();
      setAlerts(alertsData);
      setError(null);
    } catch (err) {
      setError('Failed to load alerts');
      console.error('Error loading alerts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  const filteredAlerts = alerts.filter(alert => {
    const matchesType = selectedType === 'all' || alert.type === selectedType;
    const matchesPriority = selectedPriority === 'all' || alert.priority === selectedPriority;
    return matchesType && matchesPriority;
  });

  const unreadCount = alerts.filter(alert => !alert.isRead).length;
  const highPriorityCount = alerts.filter(alert => alert.priority === 'high' && !alert.isRead).length;

  const getAlertIcon = (type: string) => {
    const icons = {
      'low-stock': <TrendingDown className="h-5 w-5 text-yellow-500" />,
      'out-of-stock': <AlertTriangle className="h-5 w-5 text-red-500" />,
      'reorder-suggestion': <Package className="h-5 w-5 text-blue-500" />,
      'high-demand': <TrendingDown className="h-5 w-5 text-green-500" />,
      'system': <Bell className="h-5 w-5 text-gray-500" />
    };
    return icons[type as keyof typeof icons] || <Bell className="h-5 w-5 text-gray-500" />;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'high': 'border-l-red-500 bg-red-50',
      'medium': 'border-l-yellow-500 bg-yellow-50',
      'low': 'border-l-blue-500 bg-blue-50'
    };
    return colors[priority as keyof typeof colors] || 'border-l-gray-500 bg-gray-50';
  };

  const handleMarkAsRead = async (alertId: string) => {
    const success = await markAlertAsRead(alertId);
    if (success) {
      setAlerts(alerts.map(alert => 
        alert.id === alertId ? { ...alert, isRead: true } : alert
      ));
    } else {
      setError('Failed to mark alert as read');
    }
  };

  const handleDismissAlert = async (alertId: string) => {
    const success = await dismissAlert(alertId);
    if (success) {
      setAlerts(alerts.filter(alert => alert.id !== alertId));
    } else {
      setError('Failed to dismiss alert');
    }
  };

  const handleCreatePurchaseOrder = async (alert: Alert) => {
    if (alert.suggestedQuantity) {
      const success = await createPurchaseOrderFromAlert(alert.id, alert.suggestedQuantity);
      if (success) {
        await handleMarkAsRead(alert.id);
      } else {
        setError('Failed to create purchase order');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading alerts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            Alerts & Notifications
            {unreadCount > 0 && (
              <span className="ml-3 bg-red-500 text-white text-sm px-3 py-1 rounded-full font-semibold">
                {unreadCount}
              </span>
            )}
          </h2>
          <p className="text-gray-600 mt-1">Real-time inventory alerts and notifications</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={loadAlerts}
            className="flex items-center px-4 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
          <button
            onClick={() => setShowSettings(true)}
            className="flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
          >
            <Settings className="h-5 w-5 mr-2" />
            Settings
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-start justify-between mb-3">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
              <Bell className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-white text-3xl font-bold mb-1">{alerts.length}</h3>
          <p className="text-blue-100 text-sm font-medium">Total Alerts</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-start justify-between mb-3">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl relative">
              <Bell className="h-6 w-6 text-white" />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {unreadCount}
                </div>
              )}
            </div>
          </div>
          <h3 className="text-white text-3xl font-bold mb-1">{unreadCount}</h3>
          <p className="text-purple-100 text-sm font-medium">Unread Alerts</p>
        </div>
        
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-start justify-between mb-3">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-white text-3xl font-bold mb-1">{highPriorityCount}</h3>
          <p className="text-red-100 text-sm font-medium">High Priority</p>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-start justify-between mb-3">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
              <Package className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-white text-3xl font-bold mb-1">{alerts.filter(a => a.isActionable && !a.isRead).length}</h3>
          <p className="text-emerald-100 text-sm font-medium">Actionable</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
          >
            {alertTypes.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </select>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
          >
            {priorities.map(priority => (
              <option key={priority} value={priority}>
                {priority === 'all' ? 'All Priorities' : priority.charAt(0).toUpperCase() + priority.slice(1)}
              </option>
            ))}
          </select>

          <button
            onClick={() => setAlerts(alerts.map(alert => ({ ...alert, isRead: true })))}
            className="px-4 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 flex items-center justify-center font-semibold transition-colors"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark All Read
          </button>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`bg-white rounded-2xl shadow-lg border-l-4 ${getPriorityColor(alert.priority)} ${
              !alert.isRead ? 'border-2 border-gray-200' : 'border border-gray-100 opacity-75'
            } hover:shadow-xl transition-all`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className={`font-semibold ${!alert.isRead ? 'text-sg-black' : 'text-sg-gray-600'}`}>
                        {alert.title}
                      </h3>
                      {!alert.isRead && (
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">New</span>
                      )}
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        alert.priority === 'high' ? 'bg-red-100 text-red-800' :
                        alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {alert.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sg-gray-600 mb-2">{alert.message}</p>
                    
                    {alert.productName && (
                      <div className="text-sm text-sg-gray-500 space-y-1">
                        <p><strong>Product:</strong> {alert.productName}</p>
                        {alert.currentStock !== undefined && (
                          <p><strong>Current Stock:</strong> {alert.currentStock}</p>
                        )}
                        {alert.reorderLevel !== undefined && (
                          <p><strong>Reorder Level:</strong> {alert.reorderLevel}</p>
                        )}
                        {alert.suggestedQuantity !== undefined && (
                          <p><strong>Suggested Order:</strong> {alert.suggestedQuantity} units</p>
                        )}
                      </div>
                    )}
                    
                    <p className="text-xs text-sg-gray-400 mt-2">
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {alert.isActionable && !alert.isRead && (
                    <button
                      onClick={() => handleCreatePurchaseOrder(alert)}
                      className="bg-sg-navy hover:bg-sg-navy/90 text-white px-3 py-1 rounded text-sm"
                    >
                      Create PO
                    </button>
                  )}
                  {!alert.isRead && (
                    <button
                      onClick={() => handleMarkAsRead(alert.id)}
                      className="text-sg-gray-400 hover:text-sg-gray-600"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDismissAlert(alert.id)}
                    className="text-sg-gray-400 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-sg-gray-200 p-12 text-center">
          <Bell className="h-12 w-12 text-sg-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-sg-gray-900 mb-2">No Alerts</h3>
          <p className="text-sg-gray-600">No alerts match your current filters</p>
        </div>
      )}

      {/* Alert Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-sg-black">Alert Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-sg-gray-400 hover:text-sg-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-sg-gray-700 mb-2">
                  Low Stock Threshold (%)
                </label>
                <input
                  type="number"
                  defaultValue="20"
                  className="w-full px-3 py-2 border border-sg-gray-300 rounded-lg focus:ring-2 focus:ring-sg-navy focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-sg-gray-700 mb-2">
                  Reorder Suggestion Days
                </label>
                <input
                  type="number"
                  defaultValue="7"
                  className="w-full px-3 py-2 border border-sg-gray-300 rounded-lg focus:ring-2 focus:ring-sg-navy focus:border-transparent"
                />
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm text-sg-gray-700">Email notifications</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm text-sg-gray-700">SMS notifications</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm text-sg-gray-700">Push notifications</span>
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 border border-sg-gray-300 rounded-lg hover:bg-sg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 bg-sg-navy hover:bg-sg-navy/90 text-white rounded-lg"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
