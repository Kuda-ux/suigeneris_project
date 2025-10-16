'use client';

import Link from 'next/link';
import { TrendingUp, Star, ShoppingCart, CheckCircle, Flame } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cart-store';
import { products } from '@/data/products';

// Get trending products from our real product data
const trendingProducts = [
  { ...products.find(p => p.id === 7)!, trend: '+32%' },
  { ...products.find(p => p.id === 8)!, trend: '+28%' },
  { ...products.find(p => p.id === 203)!, trend: '+41%' },
  { ...products.find(p => p.id === 205)!, trend: '+25%' },
  { ...products.find(p => p.id === 2)!, trend: '+18%' },
  { ...products.find(p => p.id === 4)!, trend: '+15%' },
].filter(p => p.id);

export function TrendingProducts() {
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
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-50 border-2 border-red-200 rounded-full px-6 py-2 mb-6">
            <Flame className="w-5 h-5 text-red-600" />
            <span className="text-sm font-bold text-red-700">Hot Right Now</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Trending Products
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Most popular products this month with <span className="text-red-600 font-bold">verified sales growth</span> and customer satisfaction.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingProducts.map((product) => (
            <div 
              key={product.id} 
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-red-200 transform hover:-translate-y-2"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Trending Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-bold rounded-full shadow-lg">
                  <TrendingUp className="w-4 h-4" />
                  {product.trend}
                </div>

                {/* Warranty Badge */}
                {product.warranty && (
                  <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold rounded-full shadow-lg">
                    <CheckCircle className="w-3 h-3" />
                    WARRANTY
                  </div>
                )}
              </div>
              
              {/* Product Info */}
              <div className="p-5">
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </Link>
                
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
                  className={`w-full py-3 px-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 ${
                    addedToCart === product.id 
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                      : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white'
                  }`}
                >
                  {addedToCart === product.id ? (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Added!
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

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link
            href="/trending"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            <TrendingUp className="w-5 h-5" />
            View All Trending
          </Link>
        </div>
      </div>
    </section>
  );
}
