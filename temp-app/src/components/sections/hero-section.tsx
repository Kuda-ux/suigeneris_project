'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Shield, CheckCircle, Star, ChevronLeft, ChevronRight, Zap, CreditCard, FileText, DollarSign, Truck, Award, Clock } from 'lucide-react';

// Hero slides with different campaigns
const heroSlides = [
  {
    id: 'loan',
    type: 'promo',
    badge: '🔥 Civil Servants Special',
    title: 'Zero Deposit Laptops',
    subtitle: 'For Zimbabwe Government Employees',
    description: 'Get your laptop today with NO deposit required. Pay conveniently through salary deductions with full warranty included.',
    features: ['No upfront payment', 'Salary deductions', 'Full warranty', 'Immediate delivery'],
    cta: 'Apply Now',
    href: '/loan-application',
    bgImage: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1920&h=1080&fit=crop&crop=center&q=90',
    ctaIcon: FileText,
  },
  {
    id: 'laptops',
    type: 'category',
    badge: '💻 Best Sellers',
    title: 'Premium Laptops',
    subtitle: 'HP • Dell • Lenovo • MacBook',
    description: 'Certified refurbished and brand new laptops with up to 40% off retail prices. Every device includes warranty protection.',
    features: ['Up to 40% savings', '6-month warranty', 'Quality tested', 'Same-day pickup'],
    cta: 'Shop Laptops',
    href: '/products?category=laptops',
    bgImage: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1920&h=1080&fit=crop&crop=center&q=90',
    ctaIcon: ShoppingBag,
  },
  {
    id: 'phones',
    type: 'category',
    badge: '📱 New Arrivals',
    title: 'Smartphones',
    subtitle: 'Samsung • Xiaomi • iPhone',
    description: 'Latest smartphones at unbeatable prices. From budget-friendly options to flagship devices, all with warranty.',
    features: ['Factory unlocked', 'Original accessories', 'Warranty included', 'Trade-in available'],
    cta: 'Shop Phones',
    href: '/products?category=smartphones',
    bgImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1920&h=1080&fit=crop&crop=center&q=90',
    ctaIcon: ShoppingBag,
  },
  {
    id: 'deals',
    type: 'promo',
    badge: '⚡ Limited Time',
    title: 'Flash Sale',
    subtitle: 'Up to 50% Off Selected Items',
    description: 'Don\'t miss out on incredible savings. Premium tech at the lowest prices of the year. Limited stock available.',
    features: ['50% off select items', 'Free delivery', 'Extended warranty', 'Easy returns'],
    cta: 'View Deals',
    href: '/products',
    bgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&crop=center&q=90',
    ctaIcon: Zap,
  },
];

// Trust badges
const trustBadges = [
  { icon: Shield, label: 'Secure Payment' },
  { icon: Truck, label: 'Fast Delivery' },
  { icon: Award, label: '6-Month Warranty' },
  { icon: Clock, label: '24/7 Support' },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];
  const CtaIcon = slide.ctaIcon;

  return (
    <section className="relative h-[100vh] min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Background Images with Transition */}
      {heroSlides.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <img
            src={s.bgImage}
            alt=""
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
      ))}

      {/* Content Container */}
      <div className="relative z-10 h-full container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Animated Badge */}
          <div
            key={`badge-${currentSlide}`}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 sm:px-5 py-2 mb-4 sm:mb-6 animate-fade-in-up"
          >
            <span className="text-sm sm:text-base font-semibold text-white">
              {slide.badge}
            </span>
          </div>

          {/* Main Title */}
          <h1
            key={`title-${currentSlide}`}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-2 sm:mb-4 leading-[1.1] animate-fade-in-up animation-delay-100"
          >
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p
            key={`subtitle-${currentSlide}`}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-red-400 mb-4 sm:mb-6 animate-fade-in-up animation-delay-150"
          >
            {slide.subtitle}
          </p>

          {/* Description */}
          <p
            key={`desc-${currentSlide}`}
            className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl leading-relaxed animate-fade-in-up animation-delay-200"
          >
            {slide.description}
          </p>

          {/* Features Grid */}
          <div
            key={`features-${currentSlide}`}
            className="grid grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10 animate-fade-in-up animation-delay-250"
          >
            {slide.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-white">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                <span className="text-sm sm:text-base font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            key={`cta-${currentSlide}`}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up animation-delay-300"
          >
            <Link
              href={slide.href}
              className="group px-6 sm:px-8 py-3 sm:py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-base sm:text-lg rounded-xl transition-all duration-300 shadow-xl shadow-red-600/30 hover:shadow-2xl hover:shadow-red-600/40 flex items-center justify-center gap-2"
            >
              <CtaIcon className="w-5 h-5" />
              {slide.cta}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/products"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold text-base sm:text-lg rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Browse All Products
            </Link>
          </div>
        </div>

        {/* Trust Badges - Bottom */}
        <div className="absolute bottom-6 sm:bottom-10 left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-8">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2 text-white/80">
                <badge.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium hidden sm:inline">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel Navigation */}
      <div className="absolute right-4 sm:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
        <button
          onClick={prevSlide}
          disabled={isAnimating}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white transition-all disabled:opacity-50"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={nextSlide}
          disabled={isAnimating}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white transition-all disabled:opacity-50"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 sm:bottom-10 right-4 sm:right-8 lg:right-12 z-20 flex items-center gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${currentSlide === index
                ? 'w-8 h-2 bg-red-500'
                : 'w-2 h-2 bg-white/50 hover:bg-white/80'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .animation-delay-100 {
          animation-delay: 0.1s;
          opacity: 0;
        }
        .animation-delay-150 {
          animation-delay: 0.15s;
          opacity: 0;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        .animation-delay-250 {
          animation-delay: 0.25s;
          opacity: 0;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
