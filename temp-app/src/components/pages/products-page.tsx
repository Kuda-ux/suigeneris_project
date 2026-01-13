'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, Filter, Grid, List, Star, ShoppingCart, CheckCircle, 
  Award, X, ChevronDown, Check, Package, Zap, Shield, Eye, 
  ArrowUpDown, RefreshCw, Laptop, Smartphone, Monitor, Cpu, Printer, Headphones
} from 'lucide-react';
import { useCartStore } from '@/store/cart-store';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  description?: string;
  inStock?: boolean;
  in_stock?: boolean;
  stock_count?: number;
  stockCount?: number;
  condition?: string;
  badge?: string;
  originalPrice?: number;
  original_price?: number;
  specifications?: Record<string, string>;
  features?: string[];
  warranty?: boolean;
}

const categoryIcons: Record<string, any> = {
  'Laptops': Laptop, 'Smartphones': Smartphone, 'Monitors': Monitor,
  'Desktops': Cpu, 'Printers': Printer, 'Accessories': Headphones,
};

const conditions = ['All', 'Brand New', 'Refurbished', 'Ex-UK'];
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
  { value: 'name-asc', label: 'Name: A-Z' },
];

export function ProductsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addItem = useCartStore((state) => state.addItem);

  // Fetch products from database
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/products');
        const result = await response.json();
        if (result.success && result.data) {
          setProducts(result.data);
        } else {
          setError('Failed to load products');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category });
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  // Dynamic filters from products
  const availableBrands = useMemo(() => {
    const brandSet = new Set(products.map(p => p.brand).filter(Boolean));
    return ['All', ...Array.from(brandSet).sort()];
  }, [products]);

  const availableCategories = useMemo(() => {
    const categorySet = new Set(products.map(p => p.category).filter(Boolean));
    return ['All', ...Array.from(categorySet).sort()];
  }, [products]);

  const maxPrice = useMemo(() => {
    if (products.length === 0) return 5000;
    return Math.ceil(Math.max(...products.map(p => p.price)) / 100) * 100;
  }, [products]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { 'All': products.length };
    products.forEach(p => { if (p.category) counts[p.category] = (counts[p.category] || 0) + 1; });
    return counts;
  }, [products]);

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category?.toLowerCase() === selectedCategory.toLowerCase();
      const matchesBrand = selectedBrand === 'All' || product.brand?.toLowerCase() === selectedBrand.toLowerCase();
      const matchesCondition = selectedCondition === 'All' || product.condition?.toLowerCase() === selectedCondition.toLowerCase();
      const matchesSearch = !searchQuery || product.name?.toLowerCase().includes(searchQuery.toLowerCase()) || product.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesBrand && matchesCondition && matchesSearch && matchesPrice;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return (b.rating || 0) - (a.rating || 0);
        case 'newest': return b.id - a.id;
        case 'name-asc': return a.name.localeCompare(b.name);
        default: return (b.reviews || 0) - (a.reviews || 0);
      }
    });
  }, [products, selectedCategory, selectedBrand, selectedCondition, searchQuery, priceRange, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedBrand('All');
    setSelectedCondition('All');
    setPriceRange([0, maxPrice]);
    setSortBy('featured');
    setSearchQuery('');
    setShowMobileFilters(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header - Mobile Optimized */}
      <div className="relative bg-gradient-to-r from-gray-900 via-red-900 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
        <div className="absolute top-10 left-5 md:top-20 md:left-10 w-48 md:w-72 h-48 md:h-72 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-5 right-5 md:bottom-10 md:right-10 w-64 md:w-96 h-64 md:h-96 bg-red-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 py-10 md:py-16 lg:py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-full text-red-300 text-sm font-semibold mb-6">
              <Zap className="w-4 h-4" />
              Premium Electronics Store
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 md:mb-6 leading-tight px-2">
              Discover Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">Premium</span> Collection
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-10 max-w-2xl mx-auto px-2">
              Shop the latest laptops, smartphones, and electronics with <span className="text-red-400 font-semibold">warranty guarantee</span> and civil servant financing options.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 rounded-2xl blur-xl opacity-30 group-focus-within:opacity-50 transition-opacity" />
                <div className="relative flex items-center">
                  <Search className="absolute left-5 text-gray-400 w-5 h-5 group-focus-within:text-red-500 transition-colors z-10" />
                  <input
                    type="text"
                    placeholder="Search for laptops, phones, monitors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 bg-white/95 backdrop-blur-sm border-0 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-500/30 text-gray-900 placeholder-gray-500 shadow-2xl text-lg"
                  />
                </div>
              </div>
            </div>

            {/* Quick Stats - Mobile Grid */}
            <div className="grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-8 mt-8 md:mt-12 px-2">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-white/80 text-center sm:text-left">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Package className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
                </div>
                <div>
                  <div className="text-lg sm:text-2xl font-black text-white">{products.length}+</div>
                  <div className="text-xs sm:text-sm text-gray-400">Products</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-white/80 text-center sm:text-left">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                </div>
                <div>
                  <div className="text-lg sm:text-2xl font-black text-white">100%</div>
                  <div className="text-xs sm:text-sm text-gray-400">Warranty</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-white/80 text-center sm:text-left">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                </div>
                <div>
                  <div className="text-lg sm:text-2xl font-black text-white">Fast</div>
                  <div className="text-xs sm:text-sm text-gray-400">Delivery</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills - Mobile Scrollable */}
      <div className="sticky top-14 sm:top-16 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center gap-2 sm:gap-3 py-3 sm:py-4 overflow-x-auto scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0">
            {availableCategories.map(category => {
              const IconComponent = categoryIcons[category] || Package;
              const count = categoryCounts[category] || 0;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm whitespace-nowrap transition-all duration-300 touch-manipulation ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/30 scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  {category}
                  {category !== 'All' && (
                    <span className={`text-xs px-1.5 py-0.5 rounded-md ${selectedCategory === category ? 'bg-white/20' : 'bg-gray-200'}`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Toolbar - Mobile Optimized */}
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-xs sm:text-sm hover:bg-red-600 transition-colors touch-manipulation active:scale-95"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden xs:inline">Filters</span>
            </button>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
              <span className="font-bold text-gray-900">{filteredProducts.length}</span>
              <span className="text-gray-500">products</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-3 sm:pl-4 pr-8 sm:pr-10 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 cursor-pointer"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="hidden sm:flex bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 sm:p-2.5 rounded-lg transition-all touch-manipulation ${viewMode === 'grid' ? 'bg-white shadow-sm text-red-600' : 'text-gray-500 hover:text-gray-900'}`}
              >
                <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 sm:p-2.5 rounded-lg transition-all touch-manipulation ${viewMode === 'list' ? 'bg-white shadow-sm text-red-600' : 'text-gray-500 hover:text-gray-900'}`}
              >
                <List className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className={`${showMobileFilters ? 'fixed inset-0 z-50 bg-white overflow-y-auto' : 'hidden lg:block lg:w-72 flex-shrink-0'}`}>
            <div className={`${showMobileFilters ? 'p-6' : 'sticky top-40'}`}>
              {showMobileFilters && (
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-gray-900">Filters</h2>
                  <button onClick={() => setShowMobileFilters(false)} className="p-2 hover:bg-gray-100 rounded-xl">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              )}

              <div className="space-y-6">
                {/* Brands Filter */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <h3 className="text-base font-black text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-red-600" />
                    Brands
                  </h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {availableBrands.map(brand => (
                      <label key={brand} className="flex items-center gap-3 cursor-pointer group py-1">
                        <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${selectedBrand === brand ? 'bg-red-600 border-red-600' : 'border-gray-300 group-hover:border-red-400'}`}>
                          {selectedBrand === brand && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <input type="radio" name="brand" className="hidden" checked={selectedBrand === brand} onChange={() => setSelectedBrand(brand)} />
                        <span className={`text-sm font-medium ${selectedBrand === brand ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'}`}>{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Condition Filter */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <h3 className="text-base font-black text-gray-900 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-red-600" />
                    Condition
                  </h3>
                  <div className="space-y-2">
                    {conditions.map(condition => (
                      <label key={condition} className="flex items-center gap-3 cursor-pointer group py-1">
                        <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${selectedCondition === condition ? 'bg-red-600 border-red-600' : 'border-gray-300 group-hover:border-red-400'}`}>
                          {selectedCondition === condition && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <input type="radio" name="condition" className="hidden" checked={selectedCondition === condition} onChange={() => setSelectedCondition(condition)} />
                        <span className={`text-sm font-medium ${selectedCondition === condition ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'}`}>{condition}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <h3 className="text-base font-black text-gray-900 mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <input type="range" min="0" max={maxPrice} step="50" value={priceRange[1]} onChange={(e) => setPriceRange([0, parseInt(e.target.value)])} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">$0</span>
                      <span className="text-sm font-bold text-red-600 bg-red-50 px-3 py-1 rounded-lg">${priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Reset Filters */}
                <button onClick={resetFilters} className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-all flex items-center justify-center gap-2 group">
                  <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                  Reset All Filters
                </button>

                {showMobileFilters && (
                  <button onClick={() => setShowMobileFilters(false)} className="w-full py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-xl shadow-lg">
                    Show {filteredProducts.length} Products
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                    <div className="aspect-square bg-gray-200" />
                    <div className="p-5 space-y-3">
                      <div className="h-3 bg-gray-200 rounded w-1/3" />
                      <div className="h-5 bg-gray-200 rounded w-full" />
                      <div className="h-5 bg-gray-200 rounded w-2/3" />
                      <div className="h-8 bg-gray-200 rounded w-1/2 mt-4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <X className="w-10 h-10 text-red-600" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Something went wrong</h3>
                <p className="text-gray-500 mb-6">{error}</p>
                <button onClick={() => window.location.reload()} className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors">
                  Try Again
                </button>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
                <button onClick={resetFilters} className="px-6 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-red-600 transition-colors">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'flex flex-col gap-4'}>
                {filteredProducts.map(product => {
                  const originalPrice = product.originalPrice || product.original_price;
                  const hasDiscount = originalPrice && originalPrice > product.price;
                  const discountPercent = hasDiscount ? Math.round(((originalPrice - product.price) / originalPrice) * 100) : 0;
                  const isInStock = product.inStock !== false && product.in_stock !== false;

                  return (
                    <div key={product.id} className={`group bg-white rounded-2xl border border-gray-100 hover:border-red-200 transition-all duration-300 hover:shadow-2xl overflow-hidden ${viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''}`}>
                      <Link href={`/products/${product.id}`} className={`block relative ${viewMode === 'list' ? 'sm:w-64 h-64 sm:h-auto' : 'aspect-square'} bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden`}>
                        <img src={product.image || '/placeholder-product.png'} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {hasDiscount && <div className="px-2.5 py-1 bg-red-600 text-white text-xs font-bold rounded-full shadow-lg">-{discountPercent}% OFF</div>}
                          {product.badge && <div className="px-2.5 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">{product.badge}</div>}
                          {product.warranty && <div className="px-2.5 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1"><Shield className="w-3 h-3" />Warranty</div>}
                        </div>

                        {/* Stock Badge */}
                        <div className="absolute top-3 right-3">
                          {isInStock ? (
                            <div className="px-2.5 py-1 bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full">In Stock</div>
                          ) : (
                            <div className="px-2.5 py-1 bg-gray-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full">Out of Stock</div>
                          )}
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex gap-2">
                            <span className="p-3 bg-white/95 backdrop-blur-sm rounded-xl text-gray-900 font-bold text-sm shadow-lg flex items-center gap-2">
                              <Eye className="w-4 h-4" /> View Details
                            </span>
                          </div>
                        </div>
                      </Link>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md uppercase tracking-wider">{product.category}</span>
                          <span className="text-xs font-semibold text-gray-500">{product.brand}</span>
                        </div>

                        <Link href={`/products/${product.id}`}>
                          <h3 className="font-bold text-gray-900 text-base mb-3 line-clamp-2 group-hover:text-red-600 transition-colors min-h-[48px]">{product.name}</h3>
                        </Link>

                        {viewMode === 'list' && <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">{product.description}</p>}

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 4.5) ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} />
                            ))}
                          </div>
                          <span className="text-sm font-semibold text-gray-600">{product.rating || 4.5}</span>
                          <span className="text-sm text-gray-400">({product.reviews || 0})</span>
                        </div>

                        {/* Price & Add to Cart */}
                        <div className={`pt-4 border-t border-gray-100 ${viewMode === 'list' ? 'flex items-center justify-between' : ''}`}>
                          <div className="mb-3">
                            <div className="flex items-baseline gap-2">
                              <span className="text-2xl font-black text-gray-900">${product.price.toLocaleString()}</span>
                            </div>
                            {hasDiscount && <span className="text-sm text-gray-400 line-through">${originalPrice.toLocaleString()}</span>}
                          </div>
                          
                          <button
                            onClick={(e) => handleAddToCart(product, e)}
                            className={`${viewMode === 'list' ? 'px-6' : 'w-full'} py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                              addedToCart === product.id
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-900 hover:bg-red-600 text-white shadow-lg hover:shadow-xl'
                            }`}
                          >
                            {addedToCart === product.id ? (
                              <><CheckCircle className="w-4 h-4" /> Added</>
                            ) : (
                              <><ShoppingCart className="w-4 h-4" /> Add to Cart</>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
