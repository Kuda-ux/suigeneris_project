'use client';

import { useState, useEffect } from 'react';
import { 
  Package, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Plus, 
  RefreshCw,
  X,
  ArrowDown,
  ArrowUp,
  RotateCcw,
  AlertCircle,
  Filter,
  Download,
  Search
} from 'lucide-react';

interface StockMovement {
  id: string;
  product_id: number;
  product_name: string;
  type: 'opening' | 'issued' | 'received' | 'return' | 'exchange';
  quantity: number;
  previous_stock: number;
  new_stock: number;
  reason: string;
  reference: string;
  created_at: string;
  user_name: string;
}

interface Product {
  id: number;
  name: string;
  stock_count: number;
  category: string;
  price: number;
}

interface StockSummary {
  totalIssued: number;
  totalReceived: number;
  totalReturns: number;
  netMovement: number;
  lowStockItems: number;
  outOfStockItems: number;
}

export function StockManagement() {
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<StockSummary>({
    totalIssued: 0,
    totalReceived: 0,
    totalReturns: 0,
    netMovement: 0,
    lowStockItems: 0,
    outOfStockItems: 0
  });
  
  const [selectedType, setSelectedType] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showQuickIssue, setShowQuickIssue] = useState(false);
  const [showQuickReceive, setShowQuickReceive] = useState(false);

  // Load data
  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch products
      const productsRes = await fetch('/api/admin/products');
      if (!productsRes.ok) throw new Error('Failed to fetch products');
      const productsData = await productsRes.json();
      setProducts(productsData);

      // Fetch stock movements
      const movementsRes = await fetch(`/api/admin/stock-movements?type=${selectedType}&productId=${selectedProduct}`);
      if (!movementsRes.ok) throw new Error('Failed to fetch movements');
      const movementsData = await movementsRes.json();
      setMovements(movementsData);

      // Calculate summary
      const issued = movementsData.filter((m: StockMovement) => m.type === 'issued')
        .reduce((sum: number, m: StockMovement) => sum + m.quantity, 0);
      const received = movementsData.filter((m: StockMovement) => m.type === 'received')
        .reduce((sum: number, m: StockMovement) => sum + m.quantity, 0);
      const returns = movementsData.filter((m: StockMovement) => m.type === 'return')
        .reduce((sum: number, m: StockMovement) => sum + m.quantity, 0);
      
      const lowStock = productsData.filter((p: Product) => p.stock_count > 0 && p.stock_count <= 10).length;
      const outOfStock = productsData.filter((p: Product) => p.stock_count === 0).length;

      setSummary({
        totalIssued: issued,
        totalReceived: received,
        totalReturns: returns,
        netMovement: received + returns - issued,
        lowStockItems: lowStock,
        outOfStockItems: outOfStock
      });
    } catch (err: any) {
      setError(err.message);
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedType, selectedProduct]);

  // Handle stock movement creation
  const handleCreateMovement = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('/api/admin/stock-movements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: parseInt(formData.get('product_id') as string),
          type: formData.get('type'),
          quantity: parseInt(formData.get('quantity') as string),
          reason: formData.get('reason'),
          reference: formData.get('reference')
        })
      });

      if (!response.ok) throw new Error('Failed to create movement');
      
      setShowAddModal(false);
      loadData(); // Reload data
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Quick actions
  const handleQuickAction = async (type: 'issued' | 'received', productId: number, quantity: number, reference: string) => {
    try {
      const response = await fetch('/api/admin/stock-movements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: productId,
          type,
          quantity,
          reason: type === 'issued' ? 'Quick issue' : 'Quick receipt',
          reference
        })
      });

      if (!response.ok) throw new Error('Failed to process');
      
      setShowQuickIssue(false);
      setShowQuickReceive(false);
      loadData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const getMovementIcon = (type: string) => {
    const icons = {
      'opening': <Package className="h-5 w-5 text-blue-500" />,
      'issued': <ArrowDown className="h-5 w-5 text-red-500" />,
      'received': <ArrowUp className="h-5 w-5 text-green-500" />,
      'return': <RotateCcw className="h-5 w-5 text-yellow-500" />,
      'exchange': <RefreshCw className="h-5 w-5 text-purple-500" />
    };
    return icons[type as keyof typeof icons];
  };

  const getMovementBadge = (type: string) => {
    const badges = {
      'opening': 'bg-blue-100 text-blue-800 border-blue-200',
      'issued': 'bg-red-100 text-red-800 border-red-200',
      'received': 'bg-green-100 text-green-800 border-green-200',
      'return': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'exchange': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return badges[type as keyof typeof badges];
  };

  const filteredMovements = movements.filter(m => 
    m.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading stock data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Stock Management</h2>
          <p className="text-gray-600 mt-1">Track and manage all inventory movements</p>
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
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Movement
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
            <p className="text-red-800 font-medium">{error}</p>
          </div>
          <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-red-100 text-sm font-medium mb-1">Stock Issued</p>
              <h3 className="text-white text-4xl font-bold mb-2">-{summary.totalIssued}</h3>
              <p className="text-red-100 text-sm">Items issued from inventory</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <ArrowDown className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-green-100 text-sm font-medium mb-1">Stock Received</p>
              <h3 className="text-white text-4xl font-bold mb-2">+{summary.totalReceived}</h3>
              <p className="text-green-100 text-sm">Items added to inventory</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <ArrowUp className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-yellow-100 text-sm font-medium mb-1">Returns</p>
              <h3 className="text-white text-4xl font-bold mb-2">{summary.totalReturns}</h3>
              <p className="text-yellow-100 text-sm">Items returned to stock</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <RotateCcw className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-purple-100 text-sm font-medium mb-1">Net Movement</p>
              <h3 className="text-white text-4xl font-bold mb-2">{summary.netMovement > 0 ? '+' : ''}{summary.netMovement}</h3>
              <p className="text-purple-100 text-sm">Overall stock change</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-orange-100 text-sm font-medium mb-1">Low Stock Items</p>
              <h3 className="text-white text-4xl font-bold mb-2">{summary.lowStockItems}</h3>
              <p className="text-orange-100 text-sm">Items need reordering</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-gray-300 text-sm font-medium mb-1">Out of Stock</p>
              <h3 className="text-white text-4xl font-bold mb-2">{summary.outOfStockItems}</h3>
              <p className="text-gray-300 text-sm">Items currently unavailable</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <AlertCircle className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search movements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            <option value="all">All Types</option>
            <option value="opening">Opening Stock</option>
            <option value="issued">Issued</option>
            <option value="received">Received</option>
            <option value="return">Returns</option>
            <option value="exchange">Exchange</option>
          </select>

          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            <option value="all">All Products</option>
            {products.map(product => (
              <option key={product.id} value={product.id.toString()}>
                {product.name}
              </option>
            ))}
          </select>

          <button className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors border-2 border-gray-200">
            <Download className="h-5 w-5 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Movements Table */}
      <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase">Date</th>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase">Product</th>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase">Type</th>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase">Qty</th>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase">Stock Change</th>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMovements.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">No stock movements found</p>
                    <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
                  </td>
                </tr>
              ) : (
                filteredMovements.map((movement) => (
                  <tr key={movement.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-3 text-xs text-gray-600">
                      {new Date(movement.created_at).toLocaleDateString('en-GB')}
                    </td>
                    <td className="px-3 py-3">
                      <div className="text-sm font-semibold text-gray-900 truncate max-w-[150px]" title={movement.product_name}>{movement.product_name}</div>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-bold rounded-full ${getMovementBadge(movement.type)}`}>
                        {movement.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`text-sm font-bold ${
                        movement.type === 'issued' || movement.type === 'exchange' 
                          ? 'text-red-600' 
                          : 'text-green-600'
                      }`}>
                        {movement.type === 'issued' || movement.type === 'exchange' ? '-' : '+'}{movement.quantity}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1 text-xs">
                        <span className="text-gray-500">{movement.previous_stock}</span>
                        <span className="text-gray-400">→</span>
                        <span className="font-bold text-gray-900">{movement.new_stock}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-xs text-gray-600 font-mono truncate max-w-[100px]" title={movement.reference}>
                      {movement.reference || '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Movement Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">New Stock Movement</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleCreateMovement} className="space-y-5">
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
                      {product.name} (Stock: {product.stock_count})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Movement Type *
                </label>
                <select
                  name="type"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="">Select type</option>
                  <option value="issued">Issue Stock</option>
                  <option value="received">Receive Stock</option>
                  <option value="return">Return to Stock</option>
                  <option value="exchange">Exchange</option>
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
                  placeholder="Enter quantity"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Reason
                </label>
                <input
                  type="text"
                  name="reason"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="e.g., Customer order, Supplier delivery"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Reference
                </label>
                <input
                  type="text"
                  name="reference"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="e.g., PO-001, SO-123"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 font-semibold shadow-lg transition-all"
                >
                  Create Movement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
