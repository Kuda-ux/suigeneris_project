'use client';

import { useState, useEffect, useRef } from 'react';
import { Plus, Edit, Trash2, Search, Filter, Eye, Package, AlertTriangle, TrendingUp, TrendingDown, X, Shield, Save, RefreshCw, DollarSign, Boxes, Grid, List, Tag, AlertCircle, Upload, Image as ImageIcon, Camera } from 'lucide-react';
import Image from 'next/image';

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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    lowStockCount: 0,
    outOfStockCount: 0,
    averagePrice: 0,
    totalStock: 0
  });
  
  // Image upload state
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Handle image file selection and upload
  const handleImageUpload = async (file: File) => {
    if (!file) return;
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File too large. Maximum size is 5MB.');
      return;
    }
    
    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // Upload to server
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'products');
      
      const response = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload image');
      }
      
      const data = await response.json();
      setUploadedImageUrl(data.url);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to upload image');
      setImagePreview(null);
    } finally {
      setUploadingImage(false);
    }
  };
  
  // Reset image state when modal closes
  const resetImageState = () => {
    setImagePreview(null);
    setUploadedImageUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const categories = ['all', 'Laptops', 'Desktops', 'Smartphones', 'Monitors', 'Processors', 'Accessories'];

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
      
      // Calculate stats
      const totalProducts = fetchedProducts.length;
      const totalValue = fetchedProducts.reduce((sum, p) => sum + (p.price * p.currentStock), 0);
      const lowStockCount = fetchedProducts.filter(p => p.currentStock > 0 && p.currentStock <= p.reorderLevel).length;
      const outOfStockCount = fetchedProducts.filter(p => p.currentStock === 0).length;
      const averagePrice = fetchedProducts.reduce((sum, p) => sum + p.price, 0) / totalProducts;
      const totalStock = fetchedProducts.reduce((sum, p) => sum + p.currentStock, 0);
      
      setStats({ totalProducts, totalValue, lowStockCount, outOfStockCount, averagePrice, totalStock });
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
    // Use uploaded image URL, or fallback to URL input, or default image
    const imageUrl = uploadedImageUrl || 
                     formData.get('image') as string || 
                     'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop';
    
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
      resetImageState();
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
    
    // Use uploaded image URL, or fallback to URL input, or keep existing image
    const imageUrl = uploadedImageUrl || 
                     formData.get('image') as string || 
                     selectedProduct.images?.[0] || '';
    
    const productData = {
      name: formData.get('name') as string,
      sku: formData.get('sku') as string,
      category: formData.get('category') as string,
      price: parseFloat(formData.get('price') as string),
      description: formData.get('description') as string,
      brand: formData.get('brand') as string,
      currentStock: parseInt(formData.get('currentStock') as string),
      image: imageUrl,
      images: [imageUrl],
    };

    try {
      await updateProduct(selectedProduct.id, productData);
      await loadProducts();
      setShowEditModal(false);
      setSelectedProduct(null);
      resetImageState();
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to update product');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading products from database...</p>
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
          <h2 className="text-3xl font-bold text-gray-900">Product Management</h2>
          <p className="text-gray-600 mt-1">Manage your entire product catalog</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={loadProducts}
            className="flex items-center px-4 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Product
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-start justify-between mb-3">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
              <Package className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-white text-3xl font-bold mb-1">{stats.totalProducts}</h3>
          <p className="text-blue-100 text-sm font-medium">Total Products</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-start justify-between mb-3">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-white text-3xl font-bold mb-1">${stats.totalValue.toLocaleString()}</h3>
          <p className="text-emerald-100 text-sm font-medium">Total Value</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-start justify-between mb-3">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
              <Boxes className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-white text-3xl font-bold mb-1">{stats.totalStock}</h3>
          <p className="text-purple-100 text-sm font-medium">Total Stock</p>
        </div>

        <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-start justify-between mb-3">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
              <Tag className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-white text-3xl font-bold mb-1">${stats.averagePrice.toFixed(2)}</h3>
          <p className="text-cyan-100 text-sm font-medium">Avg Price</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-start justify-between mb-3">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-white text-3xl font-bold mb-1">{stats.lowStockCount}</h3>
          <p className="text-orange-100 text-sm font-medium">Low Stock</p>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-start justify-between mb-3">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-white text-3xl font-bold mb-1">{stats.outOfStockCount}</h3>
          <p className="text-red-100 text-sm font-medium">Out of Stock</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, SKU, or brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Status' : status.replace('-', ' ').toUpperCase()}
              </option>
            ))}
          </select>

          {/* View Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex-1 px-4 py-3 rounded-xl flex items-center justify-center transition-all ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex-1 px-4 py-3 rounded-xl flex items-center justify-center transition-all ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm border border-sg-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-sg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-sg-gray-500 uppercase">Product</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-sg-gray-500 uppercase">Category</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-sg-gray-500 uppercase">Stock</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-sg-gray-500 uppercase">Price</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-sg-gray-500 uppercase">Status</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-sg-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-sg-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-sg-gray-50">
                  <td className="px-3 py-2">
                    <div className="flex items-center">
                      <img
                        src={product.images?.[0] || '/placeholder-product.jpg'}
                        alt={product.name}
                        className="h-8 w-8 rounded object-cover mr-2 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-sg-black truncate max-w-[150px]" title={product.name}>{product.name}</div>
                        <div className="text-xs text-sg-gray-500">{product.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-xs text-sg-gray-900">
                    {product.category}
                  </td>
                  <td className="px-3 py-2">
                    <div className="text-xs font-medium text-sg-gray-900">{product.currentStock}</div>
                  </td>
                  <td className="px-3 py-2 text-xs font-medium text-sg-gray-900">
                    ${product.price}
                  </td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusBadge(product.status)}`}>
                      {product.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="p-1 text-sg-navy hover:text-sg-navy/80 hover:bg-gray-100 rounded"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowEditModal(true);
                          if (product.images?.[0]) {
                            setImagePreview(product.images[0]);
                          }
                        }}
                        className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                        title="Delete"
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Add New Product</h3>
                <p className="text-gray-600 text-sm mt-1">Fill in the details to add a new product to your inventory</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleAddProduct} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="e.g., HP 250 G10 Laptop"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    SKU *
                  </label>
                  <input
                    type="text"
                    name="sku"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono"
                    placeholder="e.g., LAP-HP-250-G10"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="">Select category</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Desktops">Desktops</option>
                    <option value="Smartphones">Smartphones</option>
                    <option value="Monitors">Monitors</option>
                    <option value="Processors">Processors</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Price ($) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">$</span>
                    <input
                      type="number"
                      name="price"
                      step="0.01"
                      min="0"
                      required
                      className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Initial Stock *
                  </label>
                  <input
                    type="number"
                    name="currentStock"
                    min="0"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="e.g., 50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="e.g., HP, Dell, Apple"
                  />
                </div>
                
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Product Image
                  </label>
                  
                  {/* Image Upload Area */}
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                    {imagePreview ? (
                      <div className="relative">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="max-h-48 mx-auto rounded-lg shadow-md"
                        />
                        {uploadingImage && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                          </div>
                        )}
                        {uploadedImageUrl && (
                          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            ✓ Uploaded
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            resetImageState();
                          }}
                          className="mt-3 text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Remove Image
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 font-medium mb-2">
                          Drag & drop an image or click to upload
                        </p>
                        <p className="text-xs text-gray-500 mb-3">
                          JPEG, PNG, WebP, GIF (max 5MB)
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file);
                          }}
                          className="hidden"
                          id="product-image-upload"
                        />
                        <label
                          htmlFor="product-image-upload"
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          Choose Image
                        </label>
                      </div>
                    )}
                  </div>
                  
                  {/* Alternative: URL Input */}
                  <div className="mt-4">
                    <p className="text-xs text-gray-500 mb-2">Or enter an image URL:</p>
                    <input
                      type="url"
                      name="image"
                      disabled={!!uploadedImageUrl}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="https://example.com/product-image.jpg"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                  placeholder="Enter a detailed description of the product..."
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-6 border-t-2 border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  disabled={submitting}
                  className="px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 font-semibold transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 font-semibold shadow-lg transition-all disabled:opacity-50 flex items-center"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Edit Product</h3>
                <p className="text-gray-600 text-sm mt-1">Update product details and image</p>
              </div>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedProduct(null);
                  resetImageState();
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleUpdateProduct} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    defaultValue={selectedProduct.name}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    SKU *
                  </label>
                  <input
                    type="text"
                    name="sku"
                    required
                    defaultValue={selectedProduct.sku}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    required
                    defaultValue={selectedProduct.category}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="">Select category</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Desktops">Desktops</option>
                    <option value="Smartphones">Smartphones</option>
                    <option value="Monitors">Monitors</option>
                    <option value="Processors">Processors</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Price ($) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">$</span>
                    <input
                      type="number"
                      name="price"
                      step="0.01"
                      min="0"
                      required
                      defaultValue={selectedProduct.price}
                      className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Current Stock *
                  </label>
                  <input
                    type="number"
                    name="currentStock"
                    min="0"
                    required
                    defaultValue={selectedProduct.currentStock}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    defaultValue={selectedProduct.brand || ''}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Product Image
                  </label>
                  
                  {/* Image Upload Area */}
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                    {imagePreview ? (
                      <div className="relative">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="max-h-48 mx-auto rounded-lg shadow-md"
                        />
                        {uploadingImage && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                          </div>
                        )}
                        {uploadedImageUrl && (
                          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            ✓ New Image Uploaded
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            resetImageState();
                          }}
                          className="mt-3 text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Remove / Change Image
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 font-medium mb-2">
                          Upload a new image
                        </p>
                        <p className="text-xs text-gray-500 mb-3">
                          JPEG, PNG, WebP, GIF (max 5MB)
                        </p>
                        <input
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file);
                          }}
                          className="hidden"
                          id="edit-product-image-upload"
                        />
                        <label
                          htmlFor="edit-product-image-upload"
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          Choose Image
                        </label>
                      </div>
                    )}
                  </div>
                  
                  {/* Alternative: URL Input */}
                  <div className="mt-4">
                    <p className="text-xs text-gray-500 mb-2">Or enter an image URL:</p>
                    <input
                      type="url"
                      name="image"
                      disabled={!!uploadedImageUrl}
                      defaultValue={selectedProduct.images?.[0] || ''}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="https://example.com/product-image.jpg"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  defaultValue={selectedProduct.description || ''}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                  placeholder="Enter a detailed description of the product..."
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-6 border-t-2 border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedProduct(null);
                    resetImageState();
                  }}
                  disabled={submitting}
                  className="px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 font-semibold transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || uploadingImage}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 font-semibold shadow-lg transition-all disabled:opacity-50 flex items-center"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Details Modal */}
      {selectedProduct && !showEditModal && (
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
