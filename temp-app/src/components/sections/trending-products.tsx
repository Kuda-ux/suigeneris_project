'use client';

import Link from 'next/link';
import { TrendingUp, Star, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cart-store';
import { products } from '@/data/products';

// Get trending products from our real product data
const trendingProducts = [
  { ...products.find(p => p.id === 7), trend: '+32%' }, // MSI GF63 Gaming
  { ...products.find(p => p.id === 8), trend: '+28%' }, // Asus ZenBook 14
  { ...products.find(p => p.id === 203), trend: '+41%' }, // Samsung Galaxy A51
  { ...products.find(p => p.id === 205), trend: '+25%' }, // Xiaomi Redmi 13
  { ...products.find(p => p.id === 2), trend: '+18%' }, // HP 250 G10 (i5)
  { ...products.find(p => p.id === 4), trend: '+15%' }, // Dell Latitude 5410
].filter(p => p.id); // Remove any undefined products

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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-12">
          <TrendingUp className="h-8 w-8 text-sg-red mr-3" />
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-sg-black">
            Trending Now
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingProducts.map((product) => (
            <div key={product.id} className="group bg-white border border-sg-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-sg-aqua text-sg-navy px-2 py-1 rounded-full text-sm font-semibold flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {product.trend}
                </div>
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
                    {product.rating} ({product.reviews})
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-sg-black">
                    ${product.price}
                  </span>
                  <button className="bg-gradient-to-r from-sg-red to-pink-500 hover:from-sg-red/90 hover:to-pink-500/90 text-white p-2 rounded-lg transition-all duration-300 group shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    <ShoppingCart className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/trending"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-sg-red to-pink-500 hover:from-sg-red/90 hover:to-pink-500/90 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <TrendingUp className="mr-2 h-5 w-5" />
            View All Trending
          </Link>
        </div>
      </div>
    </section>
  );
}
