'use client';

import Link from 'next/link';
import { Star, ShoppingCart, CheckCircle, Zap, Award, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cart-store';
import { products } from '@/data/products';

// Get featured products from our real product data
const featuredProducts = [
  products.find(p => p.id === 11), // Lenovo ThinkPad T490 - Top Rated
  products.find(p => p.id === 30), // HP 15 (i5) - Brand New
  products.find(p => p.id === 84), // Xiaomi Redmi 13 - Popular
  products.find(p => p.id === 85), // Samsung Galaxy M14 5G - 5G Ready
].filter((p): p is NonNullable<typeof p> => p !== undefined);

export function FeaturedProducts() {
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
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-50/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-50 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-5 py-2 mb-4">
            <Award className="w-4 h-4 text-red-600" />
            <span className="text-sm font-semibold text-red-700">Premium Selection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked premium brand new and refurbished technology with{' '}
            <span className="text-red-600 font-semibold">full warranty coverage</span>.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-gray-100 hover:border-red-200 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden bg-gray-50 aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.warranty && (
                    <div className="flex items-center gap-1 px-2.5 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      WARRANTY
                    </div>
                  )}
                  {product.originalPrice && (
                    <div className="px-2.5 py-1 bg-red-600 text-white text-xs font-semibold rounded-full">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </div>
                  )}
                </div>

                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <Link
                    href={`/products/${product.id}`}
                    className="px-4 py-2 bg-white text-gray-900 font-semibold rounded-lg text-sm hover:bg-gray-100 transition-colors"
                  >
                    Quick View
                  </Link>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 sm:p-5">
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

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-xl sm:text-2xl font-black text-gray-900">
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
                      : 'bg-red-600 hover:bg-red-700 text-white'
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
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-10 lg:mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <Zap className="w-5 h-5" />
            View All Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
