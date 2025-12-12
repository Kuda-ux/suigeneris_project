'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, ShoppingCart, Heart, Share2, Minus, Plus, Shield, RotateCcw, Check, ChevronRight, Award, Zap, MessageCircle, Phone } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { getProductById, Product } from '@/data/products';

interface ProductDetailPageProps {
  productId: string;
}

export function ProductDetailPage({ productId }: ProductDetailPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        // First try to fetch from database API
        const response = await fetch(`/api/products/${productId}`);
        const result = await response.json();
        
        if (result.success && result.data) {
          setProduct(result.data);
        } else {
          // Fallback to static products if not found in database
          const staticProduct = getProductById(productId);
          setProduct(staticProduct || null);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        // Fallback to static products on error
        const staticProduct = getProductById(productId);
        setProduct(staticProduct || null);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-600 mx-auto mb-6"></div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Loading Product...</h3>
          <p className="text-gray-600">Please wait</p>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b-2 border-gray-100 py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm font-semibold">
            <Link href="/" className="text-gray-600 hover:text-red-600 transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link href="/products" className="text-gray-600 hover:text-red-600 transition-colors">Products</Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link href={`/categories/${product.category.toLowerCase()}`} className="text-gray-600 hover:text-red-600 transition-colors">{product.category}</Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-black font-bold">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              {product.originalPrice && (
                <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full font-black text-sm shadow-xl animate-pulse">
                  SAVE ${(product.originalPrice - product.price).toFixed(0)}
                </div>
              )}
              {product.stockCount <= 5 && (
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-xl">
                  ONLY {product.stockCount} LEFT!
                </div>
              )}
            </div>
            
            <div className="relative aspect-square bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-100 group">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-xl overflow-hidden border-4 transition-all transform hover:scale-105 ${
                    selectedImage === index 
                      ? 'border-red-600 shadow-lg ring-4 ring-red-100' 
                      : 'border-gray-200 hover:border-red-300 shadow-md'
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
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-sm font-bold">{product.brand}</span>
                <span className="bg-gray-100 text-gray-700 px-4 py-1.5 rounded-full text-sm font-bold">{product.category}</span>
                {product.condition && (
                  <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                    product.condition === 'Brand New' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {product.condition}
                  </span>
                )}
                {product.badge && (
                  <span className="bg-yellow-100 text-yellow-700 px-4 py-1.5 rounded-full text-sm font-bold">{product.badge}</span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border-2 border-yellow-200">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-500 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <div>
                  <span className="text-lg font-black text-gray-900">{product.rating}</span>
                  <span className="text-sm text-gray-600 ml-2">({product.reviews} reviews)</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-6 mb-6 border-2 border-red-200">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-5xl font-black bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-2xl text-gray-500 line-through font-semibold">${product.originalPrice}</span>
                  )}
                </div>
                {product.originalPrice && (
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-red-600" />
                    <span className="text-red-700 font-bold text-lg">
                      You save ${(product.originalPrice - product.price).toFixed(2)} ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF)
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t-2 border-gray-200 pt-6">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">{product.description}</p>

              {/* Quantity and Add to Cart */}
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <span className="text-lg font-black text-black">Quantity:</span>
                  <div className="flex items-center bg-white border-2 border-gray-300 rounded-xl shadow-md">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-4 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-5 w-5 text-red-600" />
                    </button>
                    <span className="px-8 py-3 border-x-2 border-gray-300 font-black text-xl text-black min-w-[80px] text-center">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-4 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={quantity >= product.stockCount}
                    >
                      <Plus className="h-5 w-5 text-red-600" />
                    </button>
                  </div>
                  <div className="bg-green-100 border-2 border-green-300 px-4 py-2 rounded-full">
                    <span className="text-sm font-bold text-green-700">
                      ✓ {product.stockCount} in stock
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={handleAddToCart}
                    className={`flex-1 py-5 px-8 rounded-2xl font-black text-lg transition-all transform hover:scale-105 flex items-center justify-center shadow-xl ${
                      addedToCart 
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                        : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white'
                    }`}
                  >
                    {addedToCart ? (
                      <>
                        <Check className="mr-3 h-6 w-6" />
                        Added to Cart!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-3 h-6 w-6" />
                        Add to Cart
                      </>
                    )}
                  </button>
                  <button className="p-5 bg-white border-2 border-gray-300 rounded-2xl hover:bg-red-50 hover:border-red-300 transition-all shadow-md group">
                    <Heart className="h-6 w-6 text-gray-600 group-hover:text-red-600 group-hover:fill-current transition-all" />
                  </button>
                  <button className="p-5 bg-white border-2 border-gray-300 rounded-2xl hover:bg-red-50 hover:border-red-300 transition-all shadow-md group">
                    <Share2 className="h-6 w-6 text-gray-600 group-hover:text-red-600 transition-colors" />
                  </button>
                </div>
              </div>

              {/* WhatsApp Order Button */}
              <div className="mt-6">
                <a
                  href={`https://wa.me/263784116938?text=${encodeURIComponent(`Hi Sui Generis! I'm interested in ordering:\n\n*${product.name}*\nPrice: $${product.price}\nQuantity: ${quantity}\n\nPlease confirm availability and payment options.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-5 px-8 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-black text-lg rounded-2xl transition-all transform hover:scale-105 flex items-center justify-center shadow-xl gap-3"
                >
                  <MessageCircle className="h-6 w-6" />
                  Order via WhatsApp
                </a>
                <p className="text-center text-sm text-gray-600 mt-2 font-medium">
                  <Phone className="inline h-4 w-4 mr-1" />
                  Or call us: +263 78 411 6938
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-5 flex items-center gap-3 shadow-md hover:shadow-lg transition-shadow">
                  <div className="bg-green-600 p-3 rounded-xl">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-black text-black text-sm">WhatsApp Orders</p>
                    <p className="text-xs text-gray-600">Quick & Easy</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-5 flex items-center gap-3 shadow-md hover:shadow-lg transition-shadow">
                  <div className="bg-blue-600 p-3 rounded-xl">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-black text-black text-sm">Warranty Included</p>
                    <p className="text-xs text-gray-600">Full coverage</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-2xl p-5 flex items-center gap-3 shadow-md hover:shadow-lg transition-shadow">
                  <div className="bg-orange-600 p-3 rounded-xl">
                    <RotateCcw className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-black text-black text-sm">Quality Guaranteed</p>
                    <p className="text-xs text-gray-600">Certified products</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-20">
          <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 overflow-hidden">
            <nav className="flex border-b-2 border-gray-200 bg-gray-50">
              {['description', 'features', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-5 px-6 font-black text-sm uppercase transition-all ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
                      : 'text-gray-600 hover:text-red-600 hover:bg-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>

            <div className="p-8">
              {activeTab === 'description' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border-2 border-red-200">
                    <h3 className="text-2xl font-black text-black mb-4 flex items-center gap-2">
                      <Award className="h-6 w-6 text-red-600" />
                      Product Description
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Our premium products represent the pinnacle of engineering and design. 
                    Crafted with meticulous attention to detail, this product delivers an unparalleled 
                    experience that will transform how you work and play.
                  </p>
                </div>
              )}

              {activeTab === 'features' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4 bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border-2 border-gray-200 hover:border-red-300 transition-all">
                      <div className="bg-gradient-to-br from-red-600 to-red-700 p-2 rounded-lg flex-shrink-0">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-gray-800 font-semibold text-base leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-5 border-2 border-gray-200 hover:shadow-md transition-all">
                      <span className="font-black text-black text-sm uppercase block mb-2">{key}</span>
                      <span className="text-gray-700 font-semibold text-base">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-200">
                    <Star className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-black text-black mb-2">Customer Reviews</h3>
                    <p className="text-gray-600 text-lg">Reviews section coming soon with customer feedback and ratings.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
