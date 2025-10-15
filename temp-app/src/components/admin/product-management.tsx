'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter, Eye, Package, AlertTriangle, TrendingUp, TrendingDown, X, Shield, Save } from 'lucide-react';

interface AdminProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  sku: string;
  brand?: string;
  currentStock: number;
  openingStock: number;
  stockIssued: number;
  stockReceived: number;
  stockReturns: number;
  stockExchanges: number;
  reorderLevel: number;
  status: 'active' | 'inactive' | 'low-stock' | 'out-of-stock';
  images: string[];
  createdAt: string;
  updatedAt: string;
}

// API Functions - Connected to Supabase Database
const fetchProducts = async (): Promise<AdminProduct[]> => {
  const response = await fetch('/api/admin/products');
  if (!response.ok) throw new Error('Failed to fetch products');
  return await response.json();
};

const createProduct = async (productData: any): Promise<AdminProduct> => {
  const response = await fetch('/api/admin/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  if (!response.ok) throw new Error('Failed to create product');
  return await response.json();
};

const updateProduct = async (id: string, productData: any): Promise<AdminProduct> => {
  const response = await fetch(`/api/admin/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  if (!response.ok) throw new Error('Failed to update product');
  return await response.json();
};

const deleteProduct = async (id: string): Promise<boolean> => {
  const response = await fetch(`/api/admin/products/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete product');
  return true;
};

export function ProductManagement() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<AdminProduct | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const categories = ['all', 'Laptops', 'Desktops', 'Smartphones', 'Monitors'];

  // Fetch products on component mount
  useEffect(() => {
    loadProducts();
  }, []);
  const statuses = ['all', 'active', 'inactive', 'low-stock', 'out-of-stock'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800',
      'low-stock': 'bg-yellow-100 text-yellow-800',
      'out-of-stock': 'bg-red-100 text-red-800'
    };
    return statusConfig[status as keyof typeof statusConfig] || 'bg-gray-100 text-gray-800';
  };

  const getStockIcon = (product: AdminProduct) => {
    if (product.currentStock === 0) return <AlertTriangle className="h-4 w-4 text-red-500" />;
    if (product.currentStock <= product.reorderLevel) return <TrendingDown className="h-4 w-4 text-yellow-500" />;
    return <TrendingUp className="h-4 w-4 text-green-500" />;
  };

  // Reload products from database
  const loadProducts = async () => {
    setLoading(true);
    try {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  // Handle product deletion
  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await deleteProduct(productId);
      await loadProducts();
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to delete product');
    }
  };

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const imageUrl = formData.get('image') as string || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop';
    
    const productData = {
      name: formData.get('name') as string,
      sku: formData.get('sku') as string,
      category: formData.get('category') as string,
      price: parseFloat(formData.get('price') as string),
      description: formData.get('description') as string || '',
      brand: formData.get('brand') as string || 'Generic',
      currentStock: parseInt(formData.get('currentStock') as string),
      images: [imageUrl],
    };

    try {
      await createProduct(productData);
      await loadProducts();
      setShowAddModal(false);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to create product');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle product update
  const handleUpdateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedProduct) return;
    
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    const productData = {
      name: formData.get('name') as string,
      sku: formData.get('sku') as string,
      category: formData.get('category') as string,
      price: parseFloat(formData.get('price') as string),
      description: formData.get('description') as string,
      brand: formData.get('brand') as string,
      currentStock: parseInt(formData.get('currentStock') as string),
      image: formData.get('image') as string,
      images: [formData.get('image') as string],
    };

    try {
      await updateProduct(selectedProduct.id, productData);
      await loadProducts();
      setShowEditModal(false);
      setSelectedProduct(null);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to update product');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products from database...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
          <p className="text-red-700">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="ml-4 text-red-600 hover:text-red-800 underline"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
          <p className="text-gray-600">Manage your inventory - {products.length} products in database</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-sg-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sg-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-sg-gray-300 rounded-lg focus:ring-2 focus:ring-sg-navy focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-sg-gray-300 rounded-lg focus:ring-2 focus:ring-sg-navy focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-sg-gray-300 rounded-lg focus:ring-2 focus:ring-sg-navy focus:border-transparent"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Status' : status.replace('-', ' ').toUpperCase()}
              </option>
            ))}
          </select>

          {/* Export Button */}
          <button className="px-4 py-2 border border-sg-gray-300 rounded-lg hover:bg-sg-gray-50 flex items-center justify-center">
            <Filter className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm border border-sg-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-sg-gray-50 border-b border-sg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase tracking-wider">
                  Stock Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase tracking-wider">
                  Current Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-sg-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-sg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-10 w-10 rounded-lg object-cover mr-3"
                      />
                      <div>
                        <div className="text-sm font-medium text-sg-black">{product.name}</div>
                        <div className="text-sm text-sg-gray-500 truncate max-w-xs">
                          {product.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-sg-gray-900">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-sg-gray-900">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStockIcon(product)}
                      <span className="ml-2 text-sm text-sg-gray-900">
                        {product.currentStock <= product.reorderLevel ? 'Reorder' : 'Good'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-sg-gray-900">{product.currentStock}</div>
                    <div className="text-xs text-sg-gray-500">
                      Reorder at: {product.reorderLevel}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-sg-gray-900">
                    ${product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(product.status)}`}>
                      {product.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="text-sg-navy hover:text-sg-navy/80"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-sg-gray-600 hover:text-sg-gray-800">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-sg-gray-700">
          Showing {filteredProducts.length} of {products.length} products
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border border-sg-gray-300 rounded text-sm hover:bg-sg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 bg-sg-navy text-white rounded text-sm">1</button>
          <button className="px-3 py-1 border border-sg-gray-300 rounded text-sm hover:bg-sg-gray-50">
            2
          </button>
          <button className="px-3 py-1 border border-sg-gray-300 rounded text-sm hover:bg-sg-gray-50">
            Next
          </button>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-sg-black">Add New Product</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-sg-gray-400 hover:text-sg-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-sg-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-3 py-2 border border-sg-gray-300 rounded-lg focus:ring-2 focus:ring-sg-navy focus:border-transparent"
                    placeholder="Enter product name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-sg-gray-700 mb-2">
                    SKU *
                  </label>
                  <input
                    type="text"
                    name="sku"
                    required
                    className="w-full px-3 py-2 border border-sg-gray-300 rounded-lg focus:ring-2 focus:ring-sg-navy focus:border-transparent"
                    placeholder="Enter SKU"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-sg-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    required
                    className="w-full px-3 py-2 border border-sg-gray-300 rounded-lg focus:ring-2 focus:ring-sg-navy focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    <option value="Audio">Audio</option>
                    <option value="Wearables">Wearables</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home">Home</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-sg-gray-700 mb-2">
                    Price *
                  </label>
                  <input
                    type="number"
                    name="price"
                    step="0.01"
                    min="0"
                    required
                    className="w-full px-3 py-2 border border-sg-gray-300 rounded-lg focus:ring-2 focus:ring-sg-navy focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-sg-gray-700 mb-2">
                    Current Stock *
                  </label>
                  <input
                    type="number"
                    name="currentStock"
                    min="0"
                    required
                    className="w-full px-3 py-2 border border-sg-gray-300 rounded-lg focus:ring-2 focus:ring-sg-navy focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-sg-gray-700 mb-2">
                    Reorder Level *
                  </label>
                  <input
                    type="number"
                    name="reorderLevel"
                    min="0"
                    required
                    className="w-full px-3 py-2 border border-sg-gray-300 rounded-lg focus:ring-2 focus:ring-sg-navy focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-sg-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    name="status"
                    required
                    className="w-full px-3 py-2 border border-sg-gray-300 rounded-lg focus:ring-2 focus:ring-sg-navy focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="out-of-stock">Out of Stock</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-sg-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    className="w-full px-3 py-2 border border-sg-gray-300 rounded-lg focus:ring-2 focus:ring-sg-navy focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-sg-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  className="w-full px-3 py-2 border border-sg-gray-300 rounded-lg focus:ring-2 focus:ring-sg-navy focus:border-transparent"
                  placeholder="Enter product description"
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
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-sg-black">Product Details</h3>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-sg-gray-400 hover:text-sg-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                {selectedProduct.images && selectedProduct.images.length > 0 && (
                  <img
                    src={selectedProduct.images[0]}
                    alt={selectedProduct.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h4 className="text-xl font-semibold text-sg-black mb-2">{selectedProduct.name}</h4>
                <p className="text-sg-gray-600 mb-4">{selectedProduct.description || 'No description available'}</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-sg-gray-500">SKU:</span>
                  <p className="text-sg-black">{selectedProduct.sku}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-sg-gray-500">Category:</span>
                  <p className="text-sg-black">{selectedProduct.category}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-sg-gray-500">Price:</span>
                  <p className="text-sg-black">${selectedProduct.price}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-sg-gray-500">Current Stock:</span>
                  <p className="text-sg-black">{selectedProduct.currentStock}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-sg-gray-500">Reorder Level:</span>
                  <p className="text-sg-black">{selectedProduct.reorderLevel}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-sg-gray-500">Status:</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(selectedProduct.status)}`}>
                    {selectedProduct.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
