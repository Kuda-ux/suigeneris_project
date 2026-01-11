'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, ShoppingCart, Heart, Share2, Minus, Plus, Shield, RotateCcw, Check, ChevronRight, Award, Zap, MessageCircle, Phone, Truck, Box } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { getProductById, Product } from '@/data/products';

interface ProductDetailPageProps {
  productId: string;
}

export function ProductDetailPage({ productId }: ProductDetailPageProps) {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    // Simulate fetching
    const foundProduct = getProductById(Number(productId));
    setProduct(foundProduct);
    setLoading(false);
  }, [productId]);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    // Add item multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category
      });
    }

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-black text-gray-900 mb-4">Product Not Found</h1>
        <Link href="/products" className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition">
          Return to Shop
        </Link>
      </div>
    );
  }

  const allImages = product.images && product.images.length > 0
    ? product.images
    : [product.image];

  return (
    <div className="min-h-screen bg-gray-50 py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
          <Link href="/products" className="hover:text-red-600 transition-colors">Products</Link>
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
          <Link href={`/products?category=${product.category.toLowerCase()}`} className="hover:text-red-600 transition-colors">{product.category}</Link>
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
          <span className="font-semibold text-gray-900 truncate">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Images */}
          <div className="space-y-6">
            <div className="relative aspect-[4/3] bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group">
              <img
                src={allImages[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Floating Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {(product.originalPrice || 0) > product.price && (
                  <div className="px-3 py-1.5 bg-red-600 text-white text-sm font-bold rounded-full shadow-lg">
                    Save ${product.originalPrice! - product.price}
                  </div>
                )}
                {product.warranty && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-500/90 backdrop-blur-md text-white text-sm font-bold rounded-full shadow-lg">
                    <Shield className="w-4 h-4" />
                    Warranty
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-red-600 ring-2 ring-red-100 ring-offset-2' : 'border-transparent hover:border-gray-300'
                      }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Key Benefits Grid */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                <div className="p-2 bg-red-50 rounded-lg text-red-600">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Fast Delivery</h4>
                  <p className="text-xs text-gray-500 mt-1">Free delivery in Harare CBD</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                <div className="p-2 bg-green-50 rounded-lg text-green-600">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Warranty Protected</h4>
                  <p className="text-xs text-gray-500 mt-1">Comprehensive coverage included</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Genuine Products</h4>
                  <p className="text-xs text-gray-500 mt-1">100% Authentic Quality</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Expert Support</h4>
                  <p className="text-xs text-gray-500 mt-1">Technical assistance available</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <div className="mb-6 border-b border-gray-100 pb-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full uppercase tracking-wider">
                    {product.brand}
                  </span>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold text-gray-900 ml-1">{product.rating}</span>
                    <span className="text-sm text-gray-400 font-medium">({product.reviews} reviews)</span>
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 leading-tight">
                  {product.name}
                </h1>

                <div className="flex items-end gap-3 mb-6">
                  <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <div className="flex flex-col mb-2">
                      <span className="text-lg text-gray-400 line-through font-semibold">
                        ${product.originalPrice}
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-gray-600 leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center border-2 border-gray-100 rounded-xl bg-gray-50 p-1">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-gray-600 hover:text-red-600 shadow-sm transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-gray-600 hover:text-green-600 shadow-sm transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-sm text-green-600 font-bold flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    In Stock & Ready to Ship
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={handleAddToCart}
                    className={`py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 ${isAdded
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-900 hover:bg-black text-white'
                      }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-5 h-5" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </>
                    )}
                  </button>

                  <a
                    href={`https://wa.me/263784116938?text=I'm interested in the ${product.name} listed for $${product.price}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-4 px-6 rounded-xl font-bold text-lg bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2 transition-all shadow-xl shadow-green-200 hover:shadow-2xl hover:-translate-y-1"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Buy on WhatsApp
                  </a>
                </div>

                <p className="text-center text-sm text-gray-500 mt-4">
                  Tax included. Shipping calculated at checkout.
                </p>
              </div>
            </div>

            {/* Specifications Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mt-8">
              <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500 fill-current" />
                Technical Specifications
              </h3>

              <div className="space-y-4">
                {product.specifications ? (
                  Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 px-2 rounded-lg transition-colors">
                      <span className="font-semibold text-gray-600">{key}</span>
                      <span className="font-bold text-gray-900">{value}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex justify-between py-3 border-b border-gray-50">
                      <span className="font-semibold text-gray-600">Brand</span>
                      <span className="font-bold text-gray-900">{product.brand}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-50">
                      <span className="font-semibold text-gray-600">Category</span>
                      <span className="font-bold text-gray-900">{product.category}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-50">
                      <span className="font-semibold text-gray-600">Condition</span>
                      <span className="font-bold text-gray-900">{product.condition || 'New'}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
