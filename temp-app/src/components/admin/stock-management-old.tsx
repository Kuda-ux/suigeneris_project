'use client';

import { useState, useEffect } from 'react';
import { Package, TrendingUp, TrendingDown, AlertTriangle, Plus, Filter, Calendar, ArrowUpRight, ArrowDownRight, RotateCcw, RefreshCw, X, ArrowDown, ArrowUp, AlertCircle, Shield } from 'lucide-react';
import { products as suiGenerisProducts } from '@/data/products';

interface StockMovement {
  id: string;
  productId: number;
  productName: string;
  type: 'opening' | 'issued' | 'received' | 'return' | 'exchange';
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string;
  reference: string;
  timestamp: string;
  userId: string;
  userName: string;
}

// Generate realistic stock movements for Sui Generis products
const generateStockMovements = (): StockMovement[] => {
  const movements: StockMovement[] = [];
  const users = ['Admin', 'John Smith', 'Sarah Johnson', 'Mike Chen', 'Emily Davis'];
  const reasons = {
    opening: ['Initial stock', 'Stock audit', 'Inventory count'],
    issued: ['Sale', 'Customer order', 'Bulk order', 'Online sale'],
    received: ['New shipment', 'Supplier delivery', 'Return to stock', 'Restocking'],
    return: ['Customer return', 'Defective item', 'Wrong order', 'Damaged goods'],
    exchange: ['Product exchange', 'Warranty replacement', 'Size exchange']
  };

  suiGenerisProducts.slice(0, 20).forEach((product, index) => {
    // Generate 3-8 movements per product
    const movementCount = 3 + Math.floor(Math.random() * 6);
    let currentStock = product.stockCount;
    
    for (let i = 0; i < movementCount; i++) {
      const types: (keyof typeof reasons)[] = ['opening', 'issued', 'received', 'return', 'exchange'];
      const type = types[Math.floor(Math.random() * types.length)];
      const quantity = Math.floor(Math.random() * 10) + 1;
      const previousStock = currentStock;
      
      if (type === 'issued' || type === 'exchange') {
        currentStock = Math.max(0, currentStock - quantity);
      } else {
        currentStock += quantity;
      }
      
      movements.push({
        id: `SM-${Date.now()}-${index}-${i}`,
        productId: product.id,
        productName: product.name,
        type,
        quantity,
        previousStock,
        newStock: currentStock,
        reason: reasons[type][Math.floor(Math.random() * reasons[type].length)],
        reference: `REF-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
        timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        userId: `user-${Math.floor(Math.random() * 5) + 1}`,
        userName: users[Math.floor(Math.random() * users.length)]
      });
    }
  });

  return movements.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

// Use real Sui Generis stock data
const fetchStockMovements = async (filters?: {
  type?: string;
  productId?: string;
  dateRange?: string;
}): Promise<StockMovement[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let movements = generateStockMovements();
  
  // Apply filters
  if (filters?.type && filters.type !== 'all') {
    movements = movements.filter(m => m.type === filters.type);
  }
  
  if (filters?.productId && filters.productId !== 'all') {
    movements = movements.filter(m => m.productId.toString() === filters.productId);
  }
  
  if (filters?.dateRange && filters.dateRange !== 'all') {
    const now = new Date();
    let cutoffDate = new Date();
    
    switch (filters.dateRange) {
      case '7days':
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case '30days':
        cutoffDate.setDate(now.getDate() - 30);
        break;
      case '90days':
        cutoffDate.setDate(now.getDate() - 90);
        break;
    }
    
    movements = movements.filter(m => new Date(m.timestamp) >= cutoffDate);
  }
  
  return movements;
};

const createStockMovement = async (movementData: Omit<StockMovement, 'id' | 'timestamp' | 'userId' | 'userName'>): Promise<StockMovement | null> => {
  // Simulate API call - in real app this would save to database
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newMovement: StockMovement = {
    ...movementData,
    id: `SM-${Date.now()}-${Math.random().toString(36).substr(2, 8)}`,
    timestamp: new Date().toISOString(),
    userId: 'admin-1',
    userName: 'Admin'
  };
  
  return newMovement;
};

const fetchStockSummary = async (): Promise<{
  totalIssued: number;
  totalReceived: number;
  totalReturns: number;
  netMovement: number;
}> => {
  // Simulate API call and calculate from real data
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const movements = generateStockMovements();
  const totalIssued = movements.filter(m => m.type === 'issued').reduce((sum, m) => sum + m.quantity, 0);
  const totalReceived = movements.filter(m => m.type === 'received').reduce((sum, m) => sum + m.quantity, 0);
  const totalReturns = movements.filter(m => m.type === 'return').reduce((sum, m) => sum + m.quantity, 0);
  
  return {
    totalIssued,
    totalReceived,
    totalReturns,
    netMovement: totalReceived + totalReturns - totalIssued
  };
};

export function StockManagement() {
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stockSummary, setStockSummary] = useState({
    totalIssued: 0,
    totalReceived: 0,
    totalReturns: 0,
    netMovement: 0
  });
  const [selectedType, setSelectedType] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [dateRange, setDateRange] = useState('today');
  const [showAddModal, setShowAddModal] = useState(false);

  const movementTypes = ['all', 'opening', 'issued', 'received', 'return', 'exchange'];
  const dateRanges = ['today', 'week', 'month', 'quarter'];

  // Fetch data on component mount and when filters change
  useEffect(() => {
    const loadStockData = async () => {
      setLoading(true);
      try {
        const [movementsData, summaryData] = await Promise.all([
          fetchStockMovements(),
          fetchStockSummary()
        ]);
        setMovements(movementsData);
        setStockSummary(summaryData);
        setError(null);
      } catch (err) {
        setError('Failed to load stock data');
        console.error('Error loading stock data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStockData();
  }, []);

  const handleAddMovement = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const productId = formData.get('productId') as string;
    const productName = getProductNameById(productId);
    
    const movementData = {
      productId: parseInt(productId),
      productName,
      type: formData.get('type') as 'opening' | 'issued' | 'received' | 'return' | 'exchange',
      quantity: parseInt(formData.get('quantity') as string),
      previousStock: 0, // This would be fetched from current product stock
      newStock: 0, // This would be calculated based on movement type
      reason: formData.get('reason') as string || 'Manual entry',
      reference: formData.get('reference') as string || `REF-${Date.now()}`,
    };

    const newMovement = await createStockMovement(movementData);
    if (newMovement) {
      setMovements([newMovement, ...movements]);
      setShowAddModal(false);
      setError(null);
      // Reload stock summary to reflect changes
      const updatedSummary = await fetchStockSummary();
      setStockSummary(updatedSummary);
    } else {
      setError('Failed to create stock movement');
    }
  };

  const getProductNameById = (productId: string): string => {
    const product = suiGenerisProducts.find(p => p.id.toString() === productId);
    return product ? product.name : 'Unknown Product';
  };

  const filteredMovements = movements.filter(movement => {
    const matchesType = selectedType === 'all' || movement.type === selectedType;
    const matchesProduct = selectedProduct === 'all' || movement.productId.toString() === selectedProduct;
    
    // Date filtering logic would go here
    return matchesType && matchesProduct;
  });

  const getMovementIcon = (type: string) => {
    const icons = {
      'opening': <Package className="h-4 w-4 text-blue-500" />,
      'issued': <ArrowDown className="h-4 w-4 text-red-500" />,
      'received': <ArrowUp className="h-4 w-4 text-green-500" />,
      'return': <RotateCcw className="h-4 w-4 text-yellow-500" />,
      'exchange': <RefreshCw className="h-4 w-4 text-purple-500" />
    };
    return icons[type as keyof typeof icons] || <Package className="h-4 w-4 text-gray-500" />;
  };

  const getMovementColor = (type: string) => {
    const colors = {
      'opening': 'bg-blue-100 text-blue-800',
      'issued': 'bg-red-100 text-red-800',
      'received': 'bg-green-100 text-green-800',
      'return': 'bg-yellow-100 text-yellow-800',
      'exchange': 'bg-purple-100 text-purple-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatDateTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-sg-black">Stock Management</h2>
          <p className="text-sg-gray-600">Track all stock movements and transactions</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-sg-navy hover:bg-sg-navy/90 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Movement
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sg-navy mx-auto mb-4"></div>
            <p className="text-sg-gray-600">Loading stock data...</p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="ml-4 text-red-600 hover:text-red-800 underline"
            >
              Retry
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-sg-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-sg-gray-600">Today's Issues</p>
                  <p className="text-2xl font-bold text-red-600">-{stockSummary.totalIssued}</p>
                </div>
                <ArrowDown className="h-8 w-8 text-red-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-sg-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-sg-gray-600">Today's Receipts</p>
                  <p className="text-2xl font-bold text-green-600">+{stockSummary.totalReceived}</p>
                </div>
                <ArrowUp className="h-8 w-8 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-sg-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-sg-gray-600">Returns</p>
                  <p className="text-2xl font-bold text-yellow-600">{stockSummary.totalReturns}</p>
                </div>
                <RotateCcw className="h-8 w-8 text-yellow-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-sg-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-sg-gray-600">Net Movement</p>
                  <p className="text-2xl font-bold text-orange-600">{stockSummary.netMovement}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-sg-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-sg-gray-300 rounded-lg focus:ring-2 focus:ring-sg-navy focus:border-transparent"
          >
            {movementTypes.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="px-4 py-2 border border-sg-gray-300 rounded-lg focus:ring-2 focus:ring-sg-navy focus:border-transparent"
          >
            <option value="all">All Products</option>
            {suiGenerisProducts.slice(0, 20).map(product => (
              <option key={product.id} value={product.id.toString()}>
                {product.name} - ${product.price}
              </option>
            ))}
          </select>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-sg-gray-300 rounded-lg focus:ring-2 focus:ring-sg-navy focus:border-transparent"
          >
            {dateRanges.map(range => (
              <option key={range} value={range}>
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </option>
            ))}
          </select>

          <button className="px-4 py-2 border border-sg-gray-300 rounded-lg hover:bg-sg-gray-50 flex items-center justify-center">
            <Calendar className="h-4 w-4 mr-2" />
            Custom Range
          </button>
        </div>
      </div>

      {/* Stock Movements Table */}
      <div className="bg-white rounded-lg shadow-sm border border-sg-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-sg-gray-50 border-b border-sg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase tracking-wider">
                  Previous Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase tracking-wider">
                  New Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase tracking-wider">
                  Reference
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase tracking-wider">
                  User
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-sg-gray-200">
              {filteredMovements.map((movement) => (
                <tr key={movement.id} className="hover:bg-sg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-sg-gray-900">
                    {formatDateTime(movement.timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-sg-black">{movement.productName}</div>
                    <div className="text-sm text-sg-gray-500">{movement.reason}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getMovementIcon(movement.type)}
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMovementColor(movement.type)}`}>
                        {movement.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${movement.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-sg-gray-900">
                    {movement.previousStock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-sg-gray-900">
                    {movement.newStock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-sg-gray-900">
                    {movement.reference}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-sg-gray-900">
                    {movement.userName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-sg-gray-200">
          <h3 className="text-lg font-semibold text-sg-black mb-4">Quick Stock Issue</h3>
          <div className="space-y-3">
            <select className="w-full px-3 py-2 border border-sg-gray-300 rounded-lg">
              <option>Select Product</option>
              <option>Premium Wireless Headphones</option>
              <option>Smart Fitness Watch</option>
            </select>
            <input
              type="number"
              placeholder="Quantity"
              className="w-full px-3 py-2 border border-sg-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Reference/Order #"
              className="w-full px-3 py-2 border border-sg-gray-300 rounded-lg"
            />
            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg">
              Issue Stock
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-sg-gray-200">
          <h3 className="text-lg font-semibold text-sg-black mb-4">Quick Stock Receipt</h3>
          <div className="space-y-3">
            <select className="w-full px-3 py-2 border border-sg-gray-300 rounded-lg">
              <option>Select Product</option>
              <option>Premium Wireless Headphones</option>
              <option>Smart Fitness Watch</option>
            </select>
            <input
              type="number"
              placeholder="Quantity"
              className="w-full px-3 py-2 border border-sg-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Supplier/PO #"
              className="w-full px-3 py-2 border border-sg-gray-300 rounded-lg"
            />
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
              Receive Stock
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-sg-gray-200">
          <h3 className="text-lg font-semibold text-sg-black mb-4">Stock Alerts</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-red-800">Gaming Mouse Pro</p>
                <p className="text-xs text-red-600">Out of stock</p>
              </div>
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-yellow-800">Smart Fitness Watch</p>
                <p className="text-xs text-yellow-600">Low stock (8 remaining)</p>
              </div>
              <TrendingUp className="h-5 w-5 text-yellow-500" />
            </div>
          </div>
        </div>
      </div>
        </>
      )}

      {/* Add Stock Movement Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-sg-black">Add Stock Movement</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-sg-gray-400 hover:text-sg-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddMovement} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-sg-gray-700 mb-2">
                  Product *
                </label>
                <select
                  name="productId"
                  required
                  className="w-full px-3 py-2 border border-sg-gray-300 rounded-lg focus:ring-2 focus:ring-sg-navy focus:border-transparent"
                >
                  <option value="">Select product</option>
                  <option value="1">Premium Wireless Headphones</option>
                  <option value="2">Smart Fitness Watch</option>
                  <option value="3">Gaming Mouse Pro</option>
                  <option value="4">Bluetooth Speaker</option>
                  <option value="5">Phone Case</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-sg-gray-700 mb-2">
                  Movement Type *
                </label>
                <select
                  name="type"
                  required
                  className="w-full px-3 py-2 border border-sg-gray-300 rounded-lg focus:ring-2 focus:ring-sg-navy focus:border-transparent"
                >
                  <option value="">Select type</option>
                  <option value="opening">Opening Stock</option>
                  <option value="issued">Stock Issued</option>
                  <option value="received">Stock Received</option>
                  <option value="return">Stock Return</option>
                  <option value="exchange">Stock Exchange</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-sg-gray-700 mb-2">
                  Quantity *
                </label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  required
                  className="w-full px-3 py-2 border border-sg-gray-300 rounded-lg focus:ring-2 focus:ring-sg-navy focus:border-transparent"
                  placeholder="Enter quantity"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-sg-gray-700 mb-2">
                  Reference/Notes
                </label>
                <input
                  type="text"
                  name="reference"
                  className="w-full px-3 py-2 border border-sg-gray-300 rounded-lg focus:ring-2 focus:ring-sg-navy focus:border-transparent"
                  placeholder="Order #, reason, etc."
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-sg-gray-300 rounded-lg hover:bg-sg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sg-navy hover:bg-sg-navy/90 text-white rounded-lg"
                >
                  Add Movement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
