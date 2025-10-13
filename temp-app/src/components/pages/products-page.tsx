'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, Grid, List, Star, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { products as allProducts, categories as allCategories, getProductsByCategory, searchProducts } from '@/data/products';

const categories = ['All', 'Laptops', 'Desktops', 'Smartphones', 'Printers'];

export function ProductsPage() {
  const addItem = useCartStore((state) => state.addItem);
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let products = allProducts;
    
    // Filter by category
    if (selectedCategory !== 'All') {
      products = getProductsByCategory(selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      products = searchProducts(searchQuery);
    }
    
    setFilteredProducts(products);
  }, [selectedCategory, searchQuery]);

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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-sg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold font-heading text-sg-black mb-4">All Products</h1>
          <p className="text-lg text-sg-gray-600">Discover our complete collection of premium products</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            {/* Search */}
            <div>
              <h3 className="text-lg font-semibold text-sg-black mb-3">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sg-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-sg-gray-300 rounded-lg focus:ring-2 focus:ring-sg-navy focus:border-transparent"
                />
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold text-sg-black mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={selectedCategory === category}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="text-sg-navy focus:ring-sg-navy"
                    />
                    <span className="ml-2 text-sg-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-lg font-semibold text-sg-black mb-3">Price Range</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full px-3 py-2 border border-sg-gray-300 rounded-lg focus:ring-2 focus:ring-sg-navy focus:border-transparent"
                  />
                  <span className="text-sg-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full px-3 py-2 border border-sg-gray-300 rounded-lg focus:ring-2 focus:ring-sg-navy focus:border-transparent"
                  />
                </div>
                <button className="w-full bg-sg-navy hover:bg-sg-navy/90 text-white py-2 px-4 rounded-lg transition-colors">
                  Apply
                </button>
              </div>
            </div>

            {/* Rating */}
            <div>
              <h3 className="text-lg font-semibold text-sg-black mb-3">Rating</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center">
                    <input type="checkbox" className="text-sg-navy focus:ring-sg-navy" />
                    <div className="ml-2 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < rating ? 'text-yellow-400 fill-current' : 'text-sg-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-sm text-sg-gray-600">& up</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-sg-gray-200">
              <p className="text-sg-gray-600">{filteredProducts.length} products found</p>
              <div className="flex items-center space-x-4">
                <select className="px-3 py-2 border border-sg-gray-300 rounded-lg focus:ring-2 focus:ring-sg-navy focus:border-transparent">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                  <option>Best Rating</option>
                </select>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-sg-gray-600 hover:text-sg-navy border border-sg-gray-300 rounded-lg">
                    <Grid className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-sg-gray-600 hover:text-sg-navy border border-sg-gray-300 rounded-lg">
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-sg-gray-200">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.warranty && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full">
                            ✓ Warranty
                          </span>
                        </div>
                      )}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="bg-white text-sg-black px-4 py-2 rounded-lg font-semibold">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <div className="mb-2">
                        <span className="text-sm text-sg-gray-500">{product.category}</span>
                      </div>
                      <h3 className="font-semibold text-lg text-sg-black mb-2 group-hover:text-sg-red transition-colors">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-sg-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-sg-gray-600">
                          ({product.reviews})
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-sg-black">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-sg-gray-500 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center group ${
                          product.inStock
                            ? addedToCart === product.id
                              ? 'bg-green-500 text-white'
                              : 'bg-sg-navy hover:bg-sg-navy/90 text-white'
                            : 'bg-sg-gray-300 text-sg-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                        {addedToCart === product.id 
                          ? '✓ Added to Cart!' 
                          : product.inStock 
                            ? 'Add to Cart' 
                            : 'Out of Stock'
                        }
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center mt-12 space-x-2">
              <button className="px-4 py-2 border border-sg-gray-300 rounded-lg text-sg-gray-600 hover:bg-sg-gray-50">
                Previous
              </button>
              <button className="px-4 py-2 bg-sg-navy text-white rounded-lg">1</button>
              <button className="px-4 py-2 border border-sg-gray-300 rounded-lg text-sg-gray-600 hover:bg-sg-gray-50">
                2
              </button>
              <button className="px-4 py-2 border border-sg-gray-300 rounded-lg text-sg-gray-600 hover:bg-sg-gray-50">
                3
              </button>
              <button className="px-4 py-2 border border-sg-gray-300 rounded-lg text-sg-gray-600 hover:bg-sg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
