'use client';

import { useState, useEffect } from 'react';
import { Package, Download, Plus, Eye, Search, Filter, X, ShoppingCart } from 'lucide-react';

export function OrdersManagement() {
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    product_id: '',
    quantity: 1,
    payment_method: 'cash',
    shipping_address: '',
    notes: ''
  });
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    loadOrders();
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch('/api/admin/products');
      if (!res.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await res.json();
      console.log('Loaded products:', data);
      // Filter products that have stock available
      const availableProducts = data.filter((p: any) => {
        const stock = p.currentStock || p.stock_count || 0;
        return stock > 0;
      });
      console.log('Available products:', availableProducts);
      setProducts(availableProducts);
    } catch (err) {
      console.error('Error loading products:', err);
      alert('Failed to load products. Please refresh the page.');
    } finally {
      setLoadingProducts(false);
    }
  };

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProductSelect = (productId: string) => {
    const product = products.find(p => p.id === productId);
    console.log('Selected product:', product);
    setSelectedProduct(product);
    setFormData({ ...formData, product_id: productId, quantity: 1 });
  };

  const calculateTotal = () => {
    if (!selectedProduct) return 0;
    return selectedProduct.price * formData.quantity;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.error || 'Failed to create order');
        return;
      }

      alert('Order created successfully!');
      setShowAddModal(false);
      setFormData({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        product_id: '',
        quantity: 1,
        payment_method: 'cash',
        shipping_address: '',
        notes: ''
      });
      setSelectedProduct(null);
      loadOrders();
      loadProducts();
    } catch (err) {
      console.error('Error creating order:', err);
      alert('Failed to create order');
    } finally {
      setSubmitting(false);
    }
  };

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

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.order_number.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: orders.length,
    revenue: orders.reduce((sum, o) => sum + o.total_amount, 0),
    pending: orders.filter(o => o.status === 'pending' || o.status === 'processing').length,
    delivered: orders.filter(o => o.status === 'delivered').length
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900 mb-1">{stats.total}</div>
          <div className="text-sm font-semibold text-gray-600">Total Orders</div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">$</span>
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900 mb-1">${stats.revenue}</div>
          <div className="text-sm font-semibold text-gray-600">Total Revenue</div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">⏳</span>
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900 mb-1">{stats.pending}</div>
          <div className="text-sm font-semibold text-gray-600">Pending Orders</div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">✓</span>
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900 mb-1">{stats.delivered}</div>
          <div className="text-sm font-semibold text-gray-600">Delivered</div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100">
        {/* Table Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-gray-900">Orders</h2>
              <p className="text-sm text-gray-600 font-medium">Manage all customer orders</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl transition-all shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Add Order
              </button>
              <button
                onClick={handleExportOrders}
                className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-all"
              >
                <Download className="w-5 h-5" />
                Export
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mt-4 flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none font-medium"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none font-semibold"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center">
              <div className="text-4xl mb-4">⏳</div>
              <p className="text-gray-600 font-semibold">Loading orders...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Orders Found</h3>
              <p className="text-gray-600">No orders match your search criteria</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Order #</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-bold text-gray-900">{order.order_number}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{order.customer_name}</div>
                      <div className="text-sm text-gray-500">{order.customer_email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">{order.product_name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">{order.quantity}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-gray-900">${order.total_amount}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-600">
                        {new Date(order.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add Order Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-gray-900">Create New Order</h3>
                <p className="text-sm text-gray-600 font-medium">Add a new sales order</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmitOrder} className="p-6 space-y-6">
              {/* Customer Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-red-600" />
                  Customer Information
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Customer Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.customer_name}
                      onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none font-medium"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.customer_email}
                      onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none font-medium"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.customer_phone}
                    onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none font-medium"
                    placeholder="+263 77 123 4567"
                  />
                </div>
              </div>

              {/* Product Selection */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Package className="w-5 h-5 text-red-600" />
                  Product Details
                </h4>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Select Product *</label>
                  <select
                    required
                    value={formData.product_id}
                    onChange={(e) => handleProductSelect(e.target.value)}
                    disabled={loadingProducts}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none font-semibold disabled:opacity-50"
                  >
                    <option value="">{loadingProducts ? 'Loading products...' : 'Choose a product...'}</option>
                    {!loadingProducts && products.length === 0 ? (
                      <option disabled>No products with stock available</option>
                    ) : (
                      products.map((product) => {
                        const stock = product.currentStock || product.stock_count || 0;
                        return (
                          <option key={product.id} value={product.id}>
                            {product.name} - ${product.price} (Stock: {stock})
                          </option>
                        );
                      })
                    )}
                  </select>
                  {!loadingProducts && products.length === 0 && (
                    <p className="text-sm text-red-600 font-semibold mt-2">
                      No products available. Please add products first.
                    </p>
                  )}
                </div>

                {selectedProduct && (
                  <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 font-medium">Product:</span>
                        <p className="font-bold text-gray-900">{selectedProduct.name}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 font-medium">Price:</span>
                        <p className="font-bold text-gray-900">${selectedProduct.price}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 font-medium">Available Stock:</span>
                        <p className="font-bold text-gray-900">{selectedProduct.currentStock || selectedProduct.stock_count || 0} units</p>
                      </div>
                      <div>
                        <span className="text-gray-600 font-medium">Category:</span>
                        <p className="font-bold text-gray-900">{selectedProduct.category}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Quantity *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      max={selectedProduct ? (selectedProduct.currentStock || selectedProduct.stock_count || 999) : 999}
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none font-bold text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Total Amount</label>
                    <div className="w-full px-4 py-3 bg-green-50 border-2 border-green-200 rounded-xl font-black text-2xl text-green-700">
                      ${calculateTotal().toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment & Shipping */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900">Payment & Shipping</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Payment Method *</label>
                    <select
                      required
                      value={formData.payment_method}
                      onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none font-semibold"
                    >
                      <option value="cash">Cash</option>
                      <option value="ecocash">EcoCash</option>
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="credit_card">Credit Card</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Shipping Address *</label>
                  <textarea
                    required
                    value={formData.shipping_address}
                    onChange={(e) => setFormData({ ...formData, shipping_address: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none font-medium resize-none"
                    placeholder="Enter full shipping address..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Notes (Optional)</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none font-medium resize-none"
                    placeholder="Any additional notes..."
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || !selectedProduct}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Creating Order...' : 'Create Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
