'use client';

import Link from 'next/link';
import { TrendingUp, Star, ShoppingCart, CheckCircle, Flame, ArrowRight } from 'lucide-react';
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
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-red-50/30 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/3 w-72 h-72 bg-gray-50 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-5 py-2 mb-4">
            <Flame className="w-4 h-4 text-red-600" />
            <span className="text-sm font-semibold text-red-700">Hot Right Now</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            Trending Products
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Most popular products this month with{' '}
            <span className="text-red-600 font-semibold">verified sales growth</span>.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-gray-100 hover:border-red-200 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl flex flex-col sm:flex-row lg:flex-col"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden bg-gray-50 sm:w-40 lg:w-full aspect-square sm:aspect-auto lg:aspect-[4/3] flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Trending Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
                  <TrendingUp className="w-3 h-3" />
                  {product.trend}
                </div>

                {/* Warranty Badge */}
                {product.warranty && (
                  <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                    <CheckCircle className="w-3 h-3" />
                    WARRANTY
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors line-clamp-2 text-sm sm:text-base">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-200'
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">
                      ({product.reviews})
                    </span>
                  </div>
                </div>

                {/* Price & Button */}
                <div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-xl font-black text-gray-900">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`w-full py-2.5 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center text-sm ${addedToCart === product.id
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 hover:bg-red-600 text-gray-900 hover:text-white'
                      }`}
                  >
                    {addedToCart === product.id ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Added!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-10 lg:mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <TrendingUp className="w-5 h-5" />
            View All Trending
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
