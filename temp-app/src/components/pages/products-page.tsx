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
  condition?: string;
  badge?: string;
  originalPrice?: number;
  specifications?: Record<string, string>;
  features?: string[];
  warranty?: boolean;
}

const categories = ['All', 'Laptops', 'Smartphones', 'Monitors', 'Desktops', 'Printers', 'Accessories'];
const brands = ['All', 'HP', 'Dell', 'Lenovo', 'Samsung', 'Apple', 'Asus', 'Acer'];
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
];

export function ProductsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [addedToCart, setAddedToCart] = useState<number | null>(null);

  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    // Simulate API fetch delay for smoother UX
    const timer = setTimeout(() => {
      setProducts(staticProducts);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (product: Product) => {
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

  // Filter and Sort Logic
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesBrand = selectedBrand === 'All' || product.brand.toLowerCase() === selectedBrand.toLowerCase();
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesCategory && matchesBrand && matchesSearch && matchesPrice;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'newest': return b.id - a.id; // improved heuristic for newest
      default: return (b.reviews || 0) - (a.reviews || 0); // Featured by popularity
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-white to-gray-50 z-0" />

      <div className="container mx-auto px-4 pt-8 lg:pt-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              Our Products
            </h1>
            <p className="text-gray-600 max-w-xl">
              Discover our extensive collection of premium electronics, from laptops to accessories, all backed by our <span className="text-red-600 font-bold">warranty guarantee</span>.
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-auto min-w-[300px]">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-red-600 transition-colors" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-md border border-white/40 shadow-sm rounded-2xl p-4 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg font-bold text-sm"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <span className="text-sm font-semibold text-gray-600">
              {filteredProducts.length} Results
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <div className="relative hidden sm:block">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 focus:outline-none focus:border-red-500 cursor-pointer hover:border-gray-300 transition-colors"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-red-600' : 'text-gray-500 hover:text-gray-900'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-red-600' : 'text-gray-500 hover:text-gray-900'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className={`lg:w-72 flex-shrink-0 ${showMobileFilters ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden lg:block'}`}>
            <div className="lg:sticky lg:top-40 space-y-8">
              {showMobileFilters && (
                <div className="flex items-center justify-between mb-8 lg:hidden">
                  <h2 className="text-2xl font-black">Filters</h2>
                  <button onClick={() => setShowMobileFilters(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>
              )}

              {/* Categories */}
              <div>
                <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-red-600" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${selectedCategory === category ? 'bg-red-600 border-red-600' : 'border-gray-300 group-hover:border-red-400'}`}>
                        {selectedCategory === category && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <input
                        type="radio"
                        name="category"
                        className="hidden"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                      />
                      <span className={`text-sm font-medium transition-colors ${selectedCategory === category ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'}`}>
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-red-600" />
                  Brands
                </h3>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${selectedBrand === brand ? 'bg-red-600 border-red-600' : 'border-gray-300 group-hover:border-red-400'}`}>
                        {selectedBrand === brand && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <input
                        type="radio"
                        name="brand"
                        className="hidden"
                        checked={selectedBrand === brand}
                        onChange={() => setSelectedBrand(brand)}
                      />
                      <span className={`text-sm font-medium transition-colors ${selectedBrand === brand ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'}`}>
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-lg font-black text-gray-900 mb-4">Price Range</h3>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                  <div className="flex justify-between mt-2 text-sm font-bold text-gray-600">
                    <span>$0</span>
                    <span>${priceRange[1]}+</span>
                  </div>
                </div>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedBrand('All');
                  setPriceRange([0, 5000]);
                  setSortBy('featured');
                  setSearchQuery('');
                  setShowMobileFilters(false);
                }}
                className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Product List */}
          <main className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 h-[400px] animate-pulse">
                    <div className="w-full h-48 bg-gray-200 rounded-xl mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                    <div className="h-10 bg-gray-200 rounded-xl mt-auto" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <Search className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <h3 className="text-2xl font-black text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'}>
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className={`group bg-white rounded-2xl border border-gray-100 hover:border-red-100 transition-all duration-300 hover:shadow-xl overflow-hidden ${viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''}`}
                  >
                    {/* Image */}
                    <Link
                      href={`/products/${product.id}`}
                      className={`relative overflow-hidden ${viewMode === 'list' ? 'sm:w-64 h-64 sm:h-auto' : 'aspect-[4/3]'} block bg-gray-50`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.warranty && (
                          <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                            <CheckCircle className="w-3 h-3" />
                            Warranty
                          </div>
                        )}
                        {(product.originalPrice || 0) > product.price && (
                          <div className="inline-flex items-center justify-center px-2.5 py-1 bg-red-600 text-white text-xs font-bold rounded-full shadow-lg">
                            -{Math.round((((product.originalPrice || product.price) - product.price) / (product.originalPrice || product.price)) * 100)}%
                          </div>
                        )}
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-sm text-gray-900 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          View Details
                        </div>
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md uppercase tracking-wider">
                            {product.category}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                            <span className="text-xs font-bold text-gray-700">{product.rating}</span>
                          </div>
                        </div>

                        <Link href={`/products/${product.id}`}>
                          <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                            {product.name}
                          </h3>
                        </Link>

                        {viewMode === 'list' && (
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                            {product.description}
                          </p>
                        )}
                      </div>

                      <div className={`mt-4 pt-4 border-t border-gray-100 ${viewMode === 'list' ? 'flex items-center justify-between' : ''}`}>
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500 font-medium">Price</span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl sm:text-2xl font-black text-gray-900">
                              ${product.price}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-400 line-through font-medium">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => handleAddToCart(product)}
                          className={`mt-3 ${viewMode === 'list' ? 'mt-0 w-auto px-6' : 'w-full'} py-2.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${addedToCart === product.id
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-900 hover:bg-red-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                            }`}
                        >
                          {addedToCart === product.id ? (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              Added
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4" />
                              Add to Cart
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
