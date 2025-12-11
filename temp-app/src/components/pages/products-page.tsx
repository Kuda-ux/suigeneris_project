'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, Grid, List, Star, ShoppingCart, CheckCircle, SlidersHorizontal, TrendingUp, Award, X, ChevronDown, Loader2 } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { products as staticProducts } from '@/data/products';

// Product type that works with both database and static products
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
}

const categories = ['All', 'Laptops', 'Smartphones', 'Monitors', 'Desktops', 'Processors', 'Accessories'];
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
];

export function ProductsPage() {
  const addItem = useCartStore((state) => state.addItem);
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>(staticProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(staticProducts);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [loading, setLoading] = useState(true);

  // Fetch products from database on mount
  useEffect(() => {
    const fetchProductsFromDB = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const result = await response.json();
          // API returns { success, count, data } format
          const dbProducts = result.data || result;
          if (dbProducts && dbProducts.length > 0) {
            // Map database products to match expected format
            const mappedProducts: Product[] = dbProducts.map((p: any) => ({
              id: p.id,
              name: p.name,
              price: p.price,
              image: p.images?.[0] || p.image || '/placeholder-product.jpg',
              images: p.images || [p.image],
              category: p.category || 'Uncategorized',
              brand: p.brand || 'Generic',
              rating: p.rating || 4.5,
              reviews: p.reviews || 0,
              description: p.description,
              inStock: p.in_stock ?? (p.stock_count > 0),
            }));
            setAllProducts(mappedProducts);
            setFilteredProducts(mappedProducts);
          }
        }
      } catch (error) {
        console.error('Failed to fetch products from database, using static products:', error);
        // Keep using static products as fallback
      } finally {
        setLoading(false);
      }
    };

    fetchProductsFromDB();
  }, []);

  // Filter and sort products when criteria change
  useEffect(() => {
    let products = [...allProducts];
    
    // Filter by category
    if (selectedCategory !== 'All') {
      products = products.filter(p => 
        p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.brand?.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query)
      );
    }

    // Filter by price range
    products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort products
    products = [...products].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'newest':
          return b.id - a.id;
        default:
          return 0;
      }
    });
    
    setFilteredProducts(products);
  }, [allProducts, selectedCategory, searchQuery, sortBy, priceRange]);

  const handleAddToCart = (product: typeof allProducts[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    });
    
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-red-600 to-red-700 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-2 mb-6">
              <Award className="w-5 h-5 text-white" />
              <span className="text-sm font-bold text-white">Premium Collection</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
              All Products
            </h1>
            <p className="text-lg md:text-xl text-red-100 leading-relaxed">
              Discover our complete collection of <span className="font-bold text-white">brand new and certified refurbished technology</span> with warranty protection.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Controls Bar */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 w-full">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products by name, brand, or specs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none font-medium"
                />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none font-semibold bg-white cursor-pointer"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>

            {/* View Toggle */}
            <div className="flex gap-2 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-md text-red-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-md text-red-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all"
            >
              <SlidersHorizontal className="h-5 w-5" />
              Filters
            </button>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-600">
              Showing <span className="text-red-600 font-bold">{filteredProducts.length}</span> products
              {selectedCategory !== 'All' && <span> in <span className="text-red-600 font-bold">{selectedCategory}</span></span>}
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5 text-red-600" />
                  Filters
                </h3>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                    setPriceRange([0, 2000]);
                  }}
                  className="text-sm font-semibold text-red-600 hover:text-red-700"
                >
                  Clear All
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Price Range</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="text-xs font-semibold text-gray-600 mb-1 block">Min</label>
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none font-semibold"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs font-semibold text-gray-600 mb-1 block">Max</label>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none font-semibold"
                      />
                    </div>
                  </div>
                  <div className="text-center text-sm font-bold text-gray-700">
                    ${priceRange[0]} - ${priceRange[1]}
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Features</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-700">Warranty Included</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-lg border border-yellow-200">
                    <Star className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-semibold text-yellow-700">Top Rated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">😔</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                    setPriceRange([0, 2000]);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl hover:from-red-700 hover:to-red-800 transition-all"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-6'}>
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-red-200 transform hover:-translate-y-2 ${
                      viewMode === 'list' ? 'flex flex-row' : 'flex flex-col'
                    }`}
                  >
                    {/* Product Image */}
                    <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48' : 'w-full'}`}>
                      <Link href={`/products/${product.id}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className={`object-cover group-hover:scale-110 transition-transform duration-500 ${
                            viewMode === 'list' ? 'w-48 h-full' : 'w-full h-64'
                          }`}
                        />
                      </Link>
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.condition && (
                          <div className={`px-3 py-1.5 text-white text-xs font-bold rounded-full shadow-lg ${
                            product.condition === 'Brand New' 
                              ? 'bg-gradient-to-r from-green-500 to-green-600' 
                              : 'bg-gradient-to-r from-blue-500 to-blue-600'
                          }`}>
                            {product.condition === 'Brand New' ? '✨ NEW' : '✓ EXCELLENT'}
                          </div>
                        )}
                        {product.badge && (
                          <div className="px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                            {product.badge}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-5 flex-1 flex flex-col">
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-red-600 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>
                      
                      {/* Brand & Specs */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded">{product.brand}</span>
                        {product.specifications?.Processor && (
                          <span className="text-xs text-gray-500">{product.specifications.Processor}</span>
                        )}
                        {product.specifications?.RAM && (
                          <span className="text-xs text-gray-500">• {product.specifications.RAM}</span>
                        )}
                      </div>
                      
                      {/* Rating */}
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm font-semibold text-gray-900">
                          {product.rating}
                        </span>
                        <span className="ml-1 text-sm text-gray-500">
                          ({product.reviews})
                        </span>
                      </div>
                      
                      {/* Price */}
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-2xl font-black bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through font-semibold">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      
                      {/* Add to Cart Button */}
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className={`w-full py-3 px-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 mt-auto ${
                          addedToCart === product.id 
                            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                            : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white'
                        }`}
                      >
                        {addedToCart === product.id ? (
                          <>
                            <CheckCircle className="mr-2 h-5 w-5" />
                            Added to Cart!
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Add to Cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
