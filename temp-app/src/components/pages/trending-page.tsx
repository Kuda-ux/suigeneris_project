'use client';

import Link from 'next/link';
import { TrendingUp, Star, ShoppingCart, Flame, ArrowUp, Shield, Laptop, Smartphone, Monitor } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { products } from '@/data/products';
import { useState } from 'react';

// Select trending products from real Sui Generis inventory
const trendingProducts = [
  {
    ...products.find(p => p.id === 14)!, // Dell Latitude 5430 Rugged
    trend: '+45%',
    badge: 'Hot',
    rank: 1
  },
  {
    ...products.find(p => p.id === 3)!, // HP 250 G10 (i7)
    trend: '+38%',
    badge: 'Trending',
    rank: 2
  },
  {
    ...products.find(p => p.id === 6)!, // Apple MacBook Pro 2017
    trend: '+35%',
    badge: 'Premium',
    rank: 3
  },
  {
    ...products.find(p => p.id === 7)!, // MSI GF63 Gaming
    trend: '+32%',
    badge: 'Gaming',
    rank: 4
  },
  {
    ...products.find(p => p.id === 203)!, // Samsung Galaxy A51
    trend: '+28%',
    badge: 'Popular',
    rank: 5
  },
  {
    ...products.find(p => p.id === 205)!, // Xiaomi Redmi 13
    trend: '+25%',
    badge: 'Rising',
    rank: 6
  },
  {
    ...products.find(p => p.id === 8)!, // Asus ZenBook 14
    trend: '+22%',
    badge: 'New',
    rank: 7
  },
  {
    ...products.find(p => p.id === 102)!, // Dell Vostro 3888
    trend: '+18%',
    badge: 'Value',
    rank: 8
  }
].filter(Boolean);

const trendingCategories = [
  { 
    name: '💻 Laptops', 
    growth: '+42%', 
    products: 67,
    icon: Laptop,
    description: 'Professional & Gaming Laptops'
  },
  { 
    name: '📱 Smartphones', 
    growth: '+35%', 
    products: 11,
    icon: Smartphone,
    description: 'Samsung & Xiaomi Devices'
  },
  { 
    name: '🖥️ Desktops', 
    growth: '+28%', 
    products: 20,
    icon: Monitor,
    description: 'Desktop Computers & CPUs'
  },
  { 
    name: '🖨️ Printers', 
    growth: '+15%', 
    products: 1,
    icon: Shield,
    description: 'All-in-One Printers'
  }
];

export function TrendingPage() {
  const addItem = useCartStore((state) => state.addItem);
  const [addedToCart, setAddedToCart] = useState<number | null>(null);

  const handleAddToCart = (product: any) => {
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
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-sg-red via-sg-navy to-sg-black text-white py-24 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-sg-aqua/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-sg-red/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <Flame className="h-16 w-16 text-sg-aqua mr-4 animate-pulse" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-sg-red rounded-full animate-bounce"></div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-heading bg-gradient-to-r from-white via-sg-aqua to-white bg-clip-text text-transparent">
              Trending Now
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover Sui Generis' <span className="text-sg-aqua font-semibold">hottest products</span> - 
            Premium refurbished technology that's flying off our shelves!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <TrendingUp className="h-5 w-5 text-sg-aqua mr-2" />
              <span>Real-time trends</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <ArrowUp className="h-5 w-5 text-sg-aqua mr-2" />
              <span>Updated daily</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Shield className="h-5 w-5 text-sg-aqua mr-2" />
              <span>All with warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Stats */}
      <section className="py-16 bg-gradient-to-br from-sg-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-sg-black mb-4">Trending Categories</h2>
            <p className="text-lg text-sg-gray-600 max-w-2xl mx-auto">
              See which product categories are experiencing the highest demand
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div key={index} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative">
                      <IconComponent className="h-12 w-12 text-sg-navy group-hover:text-sg-red transition-colors" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-sg-aqua rounded-full flex items-center justify-center">
                        <TrendingUp className="h-2 w-2 text-white" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-sg-black mb-2 text-center">{category.name}</h3>
                  <p className="text-sm text-sg-gray-600 mb-3 text-center">{category.description}</p>
                  <div className="flex items-center justify-center mb-3">
                    <span className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                      {category.growth}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="inline-flex items-center bg-sg-gray-100 text-sg-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      {category.products} products
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-sg-black mb-6">
              🔥 Hottest Products Right Now
            </h2>
            <p className="text-xl text-sg-gray-600 max-w-3xl mx-auto leading-relaxed">
              These <span className="text-sg-red font-semibold">Sui Generis products</span> are experiencing massive growth in popularity. 
              Premium refurbished technology with full warranty coverage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trendingProducts.map((product, index) => (
              <div key={product?.id} className="group bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2 hover:border-sg-aqua/30">
                <div className="relative">
                  <img
                    src={product?.image}
                    alt={product?.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Trending Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg ${
                      product?.badge === 'Hot' ? 'bg-gradient-to-r from-sg-red to-red-600 text-white' :
                      product?.badge === 'Trending' ? 'bg-gradient-to-r from-sg-aqua to-cyan-500 text-white' :
                      product?.badge === 'Premium' ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white' :
                      product?.badge === 'Gaming' ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white' :
                      product?.badge === 'Popular' ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white' :
                      product?.badge === 'Rising' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' :
                      product?.badge === 'New' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' :
                      'bg-gradient-to-r from-sg-navy to-blue-800 text-white'
                    }`}>
                      <Flame className="h-3 w-3 mr-1" />
                      {product?.badge}
                    </span>
                  </div>
                  
                  {/* Trend Indicator */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-sg-navy px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg">
                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                    {product?.trend}
                  </div>

                  {/* Ranking Badge */}
                  <div className="absolute bottom-3 left-3 bg-gradient-to-r from-sg-navy to-blue-800 text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    #{product?.rank}
                  </div>

                  {/* Warranty Badge */}
                  <div className="absolute bottom-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                    <Shield className="h-3 w-3 mr-1" />
                    WARRANTY
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-sg-gray-500 uppercase tracking-wide">{product?.category}</span>
                    <span className="text-xs bg-gradient-to-r from-sg-aqua to-cyan-500 text-white px-2 py-1 rounded-full font-bold">
                      #{product?.rank}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-lg text-sg-black mb-3 group-hover:text-sg-red transition-colors line-clamp-2">
                    {product?.name}
                  </h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product?.rating || 0)
                              ? 'text-yellow-400 fill-current'
                              : 'text-sg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-sg-gray-600 font-medium">
                      {product?.rating} ({product?.reviews})
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold bg-gradient-to-r from-sg-red to-red-600 bg-clip-text text-transparent">
                        ${product?.price}
                      </span>
                    </div>
                    <div className="flex items-center text-green-500 text-sm font-bold bg-green-50 px-2 py-1 rounded-full">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      {product?.trend}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Link href={`/products/${product?.id}`}>
                      <button className="w-full bg-gradient-to-r from-sg-navy to-blue-800 hover:from-sg-navy/90 hover:to-blue-900 text-white py-3 px-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl">
                        View Details
                        <ArrowUp className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform rotate-45" />
                      </button>
                    </Link>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className={`w-full py-2 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center text-sm ${
                        addedToCart === product?.id
                          ? 'bg-green-500 text-white'
                          : 'bg-sg-aqua hover:bg-sg-aqua/90 text-white'
                      }`}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {addedToCart === product?.id ? '✓ Added!' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Products CTA */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-sg-gray-50 to-white rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-sg-black mb-4">Want to see more?</h3>
              <p className="text-sg-gray-600 mb-6">Browse our complete collection of premium refurbished technology</p>
              <Link href="/products">
                <button className="bg-gradient-to-r from-sg-red to-red-600 hover:from-sg-red/90 hover:to-red-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center mx-auto shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  View All Products
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-sg-navy via-sg-navy to-blue-900 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-sg-aqua/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-sg-red/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Flame className="h-12 w-12 text-sg-aqua mr-4 animate-pulse" />
              <h2 className="text-4xl md:text-5xl font-bold font-heading bg-gradient-to-r from-white via-sg-aqua to-white bg-clip-text text-transparent">
                Stay Ahead of the Trends
              </h2>
            </div>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Get notified about the latest <span className="text-sg-aqua font-semibold">trending products</span>, 
              <span className="text-sg-aqua font-semibold"> exclusive deals</span>, and 
              <span className="text-sg-aqua font-semibold"> new arrivals</span> from Sui Generis before everyone else.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto mb-8">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl text-sg-black placeholder-sg-gray-500 focus:outline-none focus:ring-2 focus:ring-sg-aqua border-2 border-transparent focus:border-sg-aqua transition-all"
              />
              <button className="bg-gradient-to-r from-sg-red to-red-600 hover:from-sg-red/90 hover:to-red-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <Flame className="mr-2 h-5 w-5" />
                Get Trends
              </button>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center">
                <Shield className="h-4 w-4 text-sg-aqua mr-2" />
                <span>No spam, unsubscribe anytime</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-sg-aqua mr-2" />
                <span>Weekly trend reports</span>
              </div>
              <div className="flex items-center">
                <Flame className="h-4 w-4 text-sg-aqua mr-2" />
                <span>Exclusive early access</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
