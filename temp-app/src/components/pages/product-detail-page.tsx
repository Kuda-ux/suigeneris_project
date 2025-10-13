'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, ShoppingCart, Heart, Share2, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { getProductById } from '@/data/products';

interface ProductDetailPageProps {
  productId: string;
}

export function ProductDetailPage({ productId }: ProductDetailPageProps) {
  const product = getProductById(productId);
  const addItem = useCartStore((state) => state.addItem);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-sg-black mb-4">Product Not Found</h1>
          <Link href="/products" className="text-sg-navy hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stockCount) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category
      });
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-sg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-sg-gray-600 hover:text-sg-navy">Home</Link>
            <span className="text-sg-gray-400">/</span>
            <Link href="/products" className="text-sg-gray-600 hover:text-sg-navy">Products</Link>
            <span className="text-sg-gray-400">/</span>
            <Link href={`/categories/${product.category.toLowerCase()}`} className="text-sg-gray-600 hover:text-sg-navy">{product.category}</Link>
            <span className="text-sg-gray-400">/</span>
            <span className="text-sg-black">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-sg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-sg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-sg-navy' : 'border-transparent hover:border-sg-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-sg-gray-600">{product.brand}</span>
                <span className="text-sm text-sg-gray-400">•</span>
                <span className="text-sm text-sg-gray-600">{product.category}</span>
              </div>
              <h1 className="text-3xl font-bold text-sg-black mb-4">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-sg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-sg-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-sg-black">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-sg-gray-500 line-through">${product.originalPrice}</span>
                )}
                {product.originalPrice && (
                  <span className="bg-sg-red text-white px-2 py-1 rounded text-sm font-semibold">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <div className="border-t border-sg-gray-200 pt-6">
              <p className="text-sg-gray-700 mb-6">{product.description}</p>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-sg-black">Quantity:</span>
                  <div className="flex items-center border border-sg-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-2 hover:bg-sg-gray-100 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 border-x border-sg-gray-300">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-2 hover:bg-sg-gray-100 transition-colors"
                      disabled={quantity >= product.stockCount}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-sm text-sg-gray-600">
                    {product.stockCount} in stock
                  </span>
                </div>

                <div className="flex space-x-4">
                  <button 
                    onClick={handleAddToCart}
                    className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center ${
                      addedToCart 
                        ? 'bg-green-500 text-white' 
                        : 'bg-sg-navy hover:bg-sg-navy/90 text-white'
                    }`}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
                  </button>
                  <button className="p-3 border border-sg-gray-300 rounded-lg hover:bg-sg-gray-50 transition-colors">
                    <Heart className="h-5 w-5 text-sg-gray-600" />
                  </button>
                  <button className="p-3 border border-sg-gray-300 rounded-lg hover:bg-sg-gray-50 transition-colors">
                    <Share2 className="h-5 w-5 text-sg-gray-600" />
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 p-4 bg-sg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-sg-navy" />
                  <span className="text-sm text-sg-gray-700">Free shipping over $50</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-sg-navy" />
                  <span className="text-sm text-sg-gray-700">2-year warranty</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="h-5 w-5 text-sg-navy" />
                  <span className="text-sm text-sg-gray-700">30-day returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-sg-gray-200">
            <nav className="flex space-x-8">
              {['description', 'features', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab
                      ? 'border-sg-navy text-sg-navy'
                      : 'border-transparent text-sg-gray-500 hover:text-sg-gray-700 hover:border-sg-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-sg-gray-700 leading-relaxed">{product.description}</p>
                <p className="text-sg-gray-700 leading-relaxed mt-4">
                  Our premium wireless headphones represent the pinnacle of audio engineering and design. 
                  Crafted with meticulous attention to detail, these headphones deliver an unparalleled 
                  listening experience that will transform how you enjoy music, podcasts, and calls.
                </p>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-sg-navy rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sg-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-sg-gray-200">
                    <span className="font-medium text-sg-black">{key}:</span>
                    <span className="text-sg-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="text-center py-8">
                  <p className="text-sg-gray-600">Reviews section would be implemented here with customer feedback and ratings.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
