'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShoppingBag, Shield, Award, CheckCircle, Star, ChevronLeft, ChevronRight, Tag, Zap, CreditCard, FileText, DollarSign, Truck, Headphones, RefreshCw } from 'lucide-react';

// Featured product slides data
const slides = [
  {
    id: 'loan',
    type: 'loan',
    title: 'Zero Deposit Laptops',
    subtitle: 'For Zimbabwe Civil Servants',
    description: 'Get your laptop today with NO deposit required. Pay through salary deductions.',
    features: [
      'No upfront payment required',
      'Convenient salary deductions',
      'Full warranty included',
      'Immediate delivery'
    ],
    cta: 'Apply Now',
    href: '/loan-application',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop&crop=center&q=80',
  },
  {
    id: 1,
    name: 'HP EliteBook 840 G5',
    subtitle: 'Premium Business Laptop',
    specs: 'Intel i7 • 16GB RAM • 512GB SSD',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=600&fit=crop&crop=center&q=80',
    price: 750,
    originalPrice: 1100,
    discount: 32,
    rating: 4.9,
    reviews: 23,
    badge: 'BESTSELLER',
    type: 'product'
  },
  {
    id: 2,
    name: 'MacBook Pro M1',
    subtitle: 'Professional Performance',
    specs: 'M1 Chip • 8GB RAM • 256GB SSD',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&h=600&fit=crop&crop=center&q=80',
    price: 1200,
    originalPrice: 1800,
    discount: 33,
    rating: 4.9,
    reviews: 18,
    badge: 'PREMIUM',
    type: 'product'
  },
  {
    id: 3,
    name: 'Samsung Galaxy A51',
    subtitle: 'Unlocked Smartphone',
    specs: '8GB RAM • 128GB Storage • 6.5″',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&crop=center&q=80',
    price: 280,
    originalPrice: 450,
    discount: 38,
    rating: 4.7,
    reviews: 31,
    badge: 'HOT DEAL',
    type: 'product'
  }
];

// Trust badges data
const trustBadges = [
  { icon: Shield, title: 'Secure Payments', desc: '100% Protected' },
  { icon: Truck, title: 'Fast Delivery', desc: 'Nationwide' },
  { icon: RefreshCw, title: 'Easy Returns', desc: '30-Day Policy' },
  { icon: Headphones, title: '24/7 Support', desc: 'Always Here' },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentItem = slides[currentSlide];

  return (
    <section className="relative min-h-[100vh] lg:min-h-[90vh] overflow-hidden">
      {/* Modern Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-red-50/30">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-50/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-100/30 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-red-100/20 rounded-full blur-3xl" />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-16 pb-20">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh]">

          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-red-200 rounded-full px-4 py-2 mb-6 shadow-sm animate-fade-in">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              <span className="text-sm font-semibold text-gray-700">
                {currentItem.type === 'loan' ? '🔥 Civil Servants Special' : `✨ ${(currentItem as any).badge || 'Featured'}`}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 mb-4 lg:mb-6 leading-[1.1] tracking-tight">
              {currentItem.type === 'loan' ? (
                <>
                  <span className="block">Zero Deposit</span>
                  <span className="block bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                    Laptops
                  </span>
                </>
              ) : (
                <>
                  <span className="block">{(currentItem as any).name?.split(' ').slice(0, 2).join(' ')}</span>
                  <span className="block bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                    {(currentItem as any).name?.split(' ').slice(2).join(' ') || 'Premium'}
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle & Description */}
            {currentItem.type === 'loan' ? (
              <>
                <p className="text-lg sm:text-xl text-gray-600 mb-6 max-w-lg mx-auto lg:mx-0">
                  {currentItem.description}
                </p>
                <div className="grid grid-cols-2 gap-3 mb-8 max-w-lg mx-auto lg:mx-0">
                  {currentItem.features?.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="text-lg text-gray-500 mb-2">{(currentItem as any).specs}</p>
                <div className="flex items-center gap-3 justify-center lg:justify-start mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.floor((currentItem as any).rating || 5) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-gray-600 font-medium">{(currentItem as any).rating} ({(currentItem as any).reviews} reviews)</span>
                </div>
                <div className="flex items-baseline gap-3 justify-center lg:justify-start mb-8">
                  <span className="text-4xl sm:text-5xl font-black text-gray-900">${(currentItem as any).price}</span>
                  {(currentItem as any).originalPrice && (
                    <>
                      <span className="text-xl text-gray-400 line-through">${(currentItem as any).originalPrice}</span>
                      <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-bold rounded-full">
                        Save ${(currentItem as any).originalPrice - (currentItem as any).price}
                      </span>
                    </>
                  )}
                </div>
              </>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href={currentItem.type === 'loan' ? '/loan-application' : `/products/${currentItem.id}`}
                className="group px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg rounded-2xl transition-all duration-300 shadow-xl shadow-red-600/25 hover:shadow-2xl hover:shadow-red-600/30 transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                {currentItem.type === 'loan' ? (
                  <>
                    <FileText className="w-5 h-5" />
                    Apply Now
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    Buy Now
                  </>
                )}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/products"
                className="px-8 py-4 bg-white border-2 border-gray-200 hover:border-red-300 text-gray-900 font-bold text-lg rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5 text-red-600" />
                Browse All Products
              </Link>
            </div>
          </div>

          {/* Right - Product Showcase */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative">
              {/* Decorative backdrop */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-100/50 to-red-50/30 rounded-[3rem] transform rotate-3 scale-105" />
              <div className="absolute inset-0 bg-gradient-to-tl from-gray-100/50 to-transparent rounded-[3rem] transform -rotate-2 scale-105" />

              {/* Product Image Container */}
              <div className="relative bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border border-gray-100/50 backdrop-blur-sm overflow-hidden">
                <div className="relative aspect-square max-w-md mx-auto">
                  <img
                    src={currentItem.image}
                    alt={currentItem.type === 'loan' ? 'Laptop' : (currentItem as any).name}
                    className="w-full h-full object-cover rounded-2xl transition-all duration-500"
                  />

                  {/* Floating Badges */}
                  {currentItem.type !== 'loan' && (
                    <>
                      <div className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-bold rounded-full shadow-lg">
                        -{(currentItem as any).discount}% OFF
                      </div>
                      <div className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-bold rounded-full shadow-lg border border-gray-100 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-green-600" />
                        Warranty Included
                      </div>
                    </>
                  )}
                  {currentItem.type === 'loan' && (
                    <div className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white text-sm font-bold rounded-full shadow-lg flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      $0 Deposit
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prevSlide}
                disabled={isAnimating}
                className="w-12 h-12 bg-white border-2 border-gray-200 hover:border-red-300 rounded-full flex items-center justify-center text-gray-600 hover:text-red-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all duration-300 rounded-full ${currentSlide === index
                        ? 'w-8 h-3 bg-red-600'
                        : 'w-3 h-3 bg-gray-300 hover:bg-red-300'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                disabled={isAnimating}
                className="w-12 h-12 bg-white border-2 border-gray-200 hover:border-red-300 rounded-full flex items-center justify-center text-gray-600 hover:text-red-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badges Strip */}
        <div className="mt-12 lg:mt-16">
          <div className="bg-white/60 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-4 justify-center md:justify-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <badge.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{badge.title}</div>
                    <div className="text-xs text-gray-500">{badge.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
