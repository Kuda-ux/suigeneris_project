'use client';

import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cart-store';
import { products } from '@/data/products';

// Get featured products from our real product data
const featuredProducts = [
  products.find(p => p.id === 1), // HP EliteBook x360 1030 G3
  products.find(p => p.id === 6), // Apple MacBook Pro 2017
  products.find(p => p.id === 201), // Samsung Galaxy A05
  products.find(p => p.id === 102), // Dell Vostro 3888 Desktop
].filter(Boolean); // Remove any undefined products

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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-sg-black mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-sg-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium refurbished technology with full warranty coverage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.warranty && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full">
                      Warranty
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
                  onClick={() => handleAddToCart(product)}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                    addedToCart === product.id 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gradient-to-r from-sg-red to-pink-500 hover:from-sg-red/90 hover:to-pink-500/90 text-white'
                  }`}
                >
                  {addedToCart === product.id ? 'Added to Cart!' : 'Add to Cart'}
                  <ShoppingCart className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-sg-aqua to-cyan-400 hover:from-sg-aqua/90 hover:to-cyan-400/90 text-sg-navy font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
