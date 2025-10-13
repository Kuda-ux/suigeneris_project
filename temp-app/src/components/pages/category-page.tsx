import Link from 'next/link';
import { Search, Filter, Grid, List, Star, ShoppingCart } from 'lucide-react';

const categoryData = {
  electronics: {
    name: 'Electronics',
    description: 'Latest gadgets and tech innovations',
    products: [
      {
        id: 5,
        name: 'Wireless Charging Pad',
        price: 49.99,
        rating: 4.5,
        reviews: 203,
        image: '/api/placeholder/300/300',
        inStock: true
      },
      {
        id: 7,
        name: 'Gaming Mouse',
        price: 79.99,
        rating: 4.9,
        reviews: 245,
        image: '/api/placeholder/300/300',
        inStock: true
      },
      {
        id: 8,
        name: 'Portable Monitor',
        price: 299.99,
        rating: 4.5,
        reviews: 134,
        image: '/api/placeholder/300/300',
        inStock: true
      }
    ]
  },
  audio: {
    name: 'Audio',
    description: 'Premium sound experience',
    products: [
      {
        id: 1,
        name: 'Premium Wireless Headphones',
        price: 299.99,
        originalPrice: 399.99,
        rating: 4.8,
        reviews: 124,
        image: '/api/placeholder/300/300',
        inStock: true,
        badge: 'Best Seller'
      },
      {
        id: 6,
        name: 'Bluetooth Speaker',
        price: 129.99,
        rating: 4.8,
        reviews: 167,
        image: '/api/placeholder/300/300',
        inStock: false
      }
    ]
  },
  wearables: {
    name: 'Wearables',
    description: 'Smart watches and fitness trackers',
    products: [
      {
        id: 2,
        name: 'Smart Fitness Watch',
        price: 199.99,
        rating: 4.6,
        reviews: 89,
        image: '/api/placeholder/300/300',
        inStock: true,
        badge: 'New'
      }
    ]
  },
  fashion: {
    name: 'Fashion',
    description: 'Style and comfort essentials',
    products: [
      {
        id: 3,
        name: 'Minimalist Backpack',
        price: 89.99,
        rating: 4.9,
        reviews: 156,
        image: '/api/placeholder/300/300',
        inStock: true,
        badge: 'Popular'
      }
    ]
  },
  home: {
    name: 'Home & Living',
    description: 'Comfort and functionality for your space',
    products: [
      {
        id: 4,
        name: 'Ergonomic Office Chair',
        price: 449.99,
        originalPrice: 599.99,
        rating: 4.7,
        reviews: 67,
        image: '/api/placeholder/300/300',
        inStock: true,
        badge: 'Sale'
      }
    ]
  },
  photography: {
    name: 'Photography',
    description: 'Capture every moment perfectly',
    products: []
  }
};

interface CategoryPageProps {
  category: string;
}

export function CategoryPage({ category }: CategoryPageProps) {
  const categoryInfo = categoryData[category as keyof typeof categoryData] || categoryData.electronics;
  const products = categoryInfo.products;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-sg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm mb-4">
            <Link href="/" className="text-sg-gray-600 hover:text-sg-navy">Home</Link>
            <span className="text-sg-gray-400">/</span>
            <Link href="/categories" className="text-sg-gray-600 hover:text-sg-navy">Categories</Link>
            <span className="text-sg-gray-400">/</span>
            <span className="text-sg-black">{categoryInfo.name}</span>
          </nav>
          <h1 className="text-4xl font-bold font-heading text-sg-black mb-4">{categoryInfo.name}</h1>
          <p className="text-lg text-sg-gray-600">{categoryInfo.description}</p>
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
                  className="w-full pl-10 pr-4 py-2 border border-sg-gray-300 rounded-lg focus:ring-2 focus:ring-sg-navy focus:border-transparent"
                />
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
              <p className="text-sg-gray-600">{products.length} products found</p>
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
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-sg-gray-200">
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.badge && (
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-sg-red text-white text-sm font-semibold rounded-full">
                              {product.badge}
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
                          className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center group ${
                            product.inStock
                              ? 'bg-sg-navy hover:bg-sg-navy/90 text-white'
                              : 'bg-sg-gray-300 text-sg-gray-500 cursor-not-allowed'
                          }`}
                          disabled={!product.inStock}
                        >
                          <ShoppingCart className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-sg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <Filter className="h-12 w-12 text-sg-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-sg-black mb-2">No Products Found</h3>
                <p className="text-sg-gray-600 mb-6">
                  We're working on adding products to this category. Check back soon!
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center px-6 py-3 bg-sg-navy hover:bg-sg-navy/90 text-white font-semibold rounded-lg transition-colors"
                >
                  Browse All Products
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
