'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Shield, Award, CheckCircle, Star, ChevronLeft, ChevronRight, Tag, Zap, CreditCard, FileText, DollarSign } from 'lucide-react';

const slides = [
  {
    id: 'loan',
    type: 'loan',
    title: 'Zero Deposit Laptops',
    subtitle: 'For Zimbabwe Civil Servants',
    description: 'Get your laptop today with NO deposit required. Pay through salary deductions.',
    features: [
      '💻 Zero Deposit Required',
      '💰 Affordable Monthly Payments',
      '⚡ Instant Approval',
      '✅ Salary Deduction Payment'
    ],
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop&crop=center&q=80',
    ctaText: 'Apply for Laptop',
    ctaLink: '/loan-application',
    badge: 'ZERO DEPOSIT'
  },
  ...[

  {
    id: 1,
    name: 'HP 250 G10',
    subtitle: 'Intel i7 13th Gen',
    specs: '8GB RAM • 512GB SSD • 15.6″',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop&crop=center&q=80',
    price: 800,
    originalPrice: 1200,
    discount: 33,
    rating: 4.8,
    reviews: 24,
    badge: 'BEST SELLER'
  },
  {
    id: 2,
    name: 'Dell Latitude 5430',
    subtitle: 'Rugged Business Laptop',
    specs: '16GB RAM • 1TB SSD • 14″',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&h=600&fit=crop&crop=center&q=80',
    price: 1200,
    originalPrice: 1800,
    discount: 33,
    rating: 4.9,
    reviews: 18,
    badge: 'PREMIUM'
  },
  {
    id: 3,
    name: 'Samsung Galaxy A51',
    subtitle: 'Unlocked Smartphone',
    specs: '8GB RAM • 128GB Storage • 6.5″',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&crop=center&q=80',
    price: 120,
    originalPrice: 200,
    discount: 40,
    rating: 4.7,
    reviews: 42,
    badge: 'HOT DEAL'
  },
  {
    id: 4,
    name: 'HP EliteDesk 800',
    subtitle: 'Mini Desktop PC',
    specs: '16GB RAM • 512GB SSD • i5 10th Gen',
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&h=600&fit=crop&crop=center&q=80',
    price: 450,
    originalPrice: 700,
    discount: 36,
    rating: 4.6,
    reviews: 15,
    badge: 'LIMITED',
    type: 'product'
  }
].map(p => ({ ...p, type: 'product' }))
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Auto-rotate every 5 seconds

    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const currentSlide = slides[currentIndex];
  const isLoanSlide = currentSlide?.type === 'loan';

  return (
    <section className="relative min-h-screen lg:h-[800px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1920&h=1080&fit=crop&crop=center&q=80" 
          alt="Premium Technology"
          className="w-full h-full object-cover"
        />
        {/* Lighter overlay with red gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/40"></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 h-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full py-8 lg:py-12">
          
          {/* Left Content */}
          <div className="space-y-4 order-2 lg:order-1">
            {/* Trust Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 md:px-6 py-2 md:py-3 shadow-xl w-fit">
              <Shield className="w-4 md:w-5 h-4 md:h-5 text-red-400" />
              <span className="text-xs md:text-sm font-bold text-white">Trusted in Zimbabwe • Quality Guaranteed</span>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight tracking-tight text-white drop-shadow-2xl">
                Premium Technology
              </h1>
              <p className="text-2xl md:text-3xl lg:text-5xl font-black bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent drop-shadow-xl">
                For Your Business
              </p>
            </div>
            
            {/* Subheading */}
            <p className="text-sm md:text-base lg:text-lg text-gray-200 font-medium leading-relaxed max-w-xl">
              Certified refurbished <span className="text-red-400 font-bold">laptops</span>, 
              <span className="text-red-400 font-bold"> desktops</span>, and 
              <span className="text-red-400 font-bold"> smartphones</span> with warranty included.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-2 md:gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 md:px-4 py-1.5 md:py-2">
                <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-green-400" />
                <span className="text-white font-semibold text-xs md:text-sm">Warranty Included</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 md:px-4 py-1.5 md:py-2">
                <Award className="w-4 md:w-5 h-4 md:h-5 text-yellow-400" />
                <span className="text-white font-semibold text-xs md:text-sm">Certified Quality</span>
              </div>
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 md:px-4 py-1.5 md:py-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 md:w-4 h-3 md:h-4 text-yellow-400 fill-current" />
                ))}
                <span className="text-white font-semibold text-xs md:text-sm ml-2">4.8/5</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/products"
                className="group inline-flex items-center justify-center px-5 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-sm md:text-base rounded-xl transition-all duration-300 shadow-2xl shadow-red-900/50 hover:shadow-red-900/70 transform hover:-translate-y-1 hover:scale-105"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-5 md:px-6 py-2.5 md:py-3 bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 hover:border-white/50 text-white font-bold text-sm md:text-base rounded-xl transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
              >
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 border-2 border-white flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  JD
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 border-2 border-white flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  SM
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 border-2 border-white flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  TK
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 border-2 border-white flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  +50
                </div>
              </div>
              <div>
                <p className="text-white font-bold text-sm">
                  Join <span className="text-red-400">50+</span> Happy Customers
                </p>
                <p className="text-gray-300 text-xs">Trusted across Zimbabwe</p>
              </div>
            </div>
          </div>

          {/* Right Content - Product Carousel */}
          <div className="relative order-1 lg:order-2">
            <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-4 md:p-5 shadow-2xl border-2 border-white/50 overflow-hidden max-w-md mx-auto">
              {/* Badge */}
              <div className="absolute top-4 right-4 z-10">
                <div className={`${isLoanSlide ? 'bg-gradient-to-r from-red-600 to-red-700' : 'bg-gradient-to-r from-red-600 to-red-700'} text-white px-4 py-2 rounded-full font-bold text-xs shadow-xl flex items-center gap-2 animate-pulse`}>
                  <Zap className="w-4 h-4" />
                  {currentSlide.badge}
                </div>
              </div>

              {!isLoanSlide && 'discount' in currentSlide && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-black text-sm shadow-xl">
                    -{currentSlide.discount}%
                  </div>
                </div>
              )}

              {/* Image */}
              <div className="relative mb-4 group">
                <div className={`transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                  <img 
                    src={currentSlide.image}
                    alt={isLoanSlide ? (currentSlide as any).title : (currentSlide as any).name}
                    className="w-full h-48 object-cover rounded-xl shadow-lg"
                  />
                </div>
              </div>

              {/* Content */}
              <div className={`space-y-3 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                {isLoanSlide ? (
                  <>
                    <div>
                      <h3 className="text-xl font-black text-gray-900 mb-1">{(currentSlide as any).title}</h3>
                      <p className="text-sm font-semibold text-red-600 mb-2">{currentSlide.subtitle}</p>
                      <p className="text-xs text-gray-600 mb-3">{(currentSlide as any).description}</p>
                    </div>
                    <div className="space-y-2 bg-red-50 rounded-xl p-3">
                      {(currentSlide as any).features.map((feature: string, i: number) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-800">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href={(currentSlide as any).ctaLink}
                      className="block w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-center text-sm transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      {(currentSlide as any).ctaText}
                    </Link>
                  </>
                ) : (
                  <>
                    <div>
                      <h3 className="text-xl font-black text-gray-900 mb-1">{(currentSlide as any).name}</h3>
                      <p className="text-sm font-semibold text-red-600 mb-1">{currentSlide.subtitle}</p>
                      <p className="text-xs text-gray-600">{(currentSlide as any).specs}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="font-bold text-sm text-gray-900">{(currentSlide as any).rating}</span>
                      <span className="text-xs text-gray-500">({(currentSlide as any).reviews})</span>
                    </div>
                    <div className="flex items-baseline gap-2 py-3 border-t border-gray-200">
                      <span className="text-2xl font-black bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                        ${(currentSlide as any).price}
                      </span>
                      <span className="text-base text-gray-400 line-through font-semibold">
                        ${(currentSlide as any).originalPrice}
                      </span>
                      <span className="ml-auto bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
                        Save ${(currentSlide as any).originalPrice - (currentSlide as any).price}
                      </span>
                    </div>
                    <Link
                      href="/products"
                      className="block w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-center text-sm transform hover:scale-105"
                    >
                      View Details
                    </Link>
                  </>
                )}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={prevSlide}
                  disabled={isAnimating}
                  className="p-2 bg-gray-100 hover:bg-red-600 text-gray-700 hover:text-white rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Dots Indicator */}
                <div className="flex gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (!isAnimating) {
                          setIsAnimating(true);
                          setCurrentIndex(index);
                          setTimeout(() => setIsAnimating(false), 500);
                        }
                      }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? 'w-8 bg-gradient-to-r from-red-600 to-red-700' 
                          : 'w-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  disabled={isAnimating}
                  className="p-2 bg-gray-100 hover:bg-red-600 text-gray-700 hover:text-white rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Counter */}
            <div className="mt-4 text-center">
              <p className="text-white font-semibold text-sm bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 inline-block">
                <Tag className="w-4 h-4 inline mr-2" />
                {isLoanSlide ? 'Special Offer' : `Product ${currentIndex} of ${slides.length - 1}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </section>
  );
}
