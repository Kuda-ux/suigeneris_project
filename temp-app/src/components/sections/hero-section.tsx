import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShoppingBag, Star, Zap, Shield, Award, Play, Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-sg-navy via-sg-navy to-blue-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-sg-aqua/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-sg-red/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-sg-aqua/5 to-sg-red/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-16 pb-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[85vh]">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Main Heading - Moved to top */}
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-sg-red/20 to-sg-aqua/20 backdrop-blur-sm border border-sg-aqua/30 rounded-full px-4 py-2 mb-4">
                <Shield className="w-4 h-4 text-sg-aqua" />
                <span className="text-sm font-semibold text-sg-aqua">Premium Quality Guaranteed</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-sg-aqua to-white bg-clip-text text-transparent">
                  Premium
                </span>
                <span className="block bg-gradient-to-r from-sg-aqua via-sg-red to-sg-aqua bg-clip-text text-transparent">
                  Tech Store
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 font-medium max-w-2xl leading-relaxed">
                Quality Refurbished <span className="text-sg-aqua font-semibold">Laptops</span>, 
                <span className="text-sg-aqua font-semibold"> Desktops</span> & 
                <span className="text-sg-aqua font-semibold"> Smartphones</span>!
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-sg-red to-red-600 hover:from-sg-red/90 hover:to-red-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-red-500/25 transform hover:-translate-y-1 hover:scale-105"
              >
                <ShoppingBag className="mr-3 h-5 w-5 group-hover:animate-bounce" />
                Shop Now
                <Sparkles className="ml-2 h-4 w-4" />
              </Link>
              
              <Link
                href="/categories"
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-transparent to-transparent border-2 border-sg-aqua/50 backdrop-blur-sm text-sg-aqua hover:bg-gradient-to-r hover:from-sg-aqua/10 hover:to-sg-aqua/20 hover:border-sg-aqua font-bold text-lg rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-sg-aqua/20"
              >
                Browse Categories
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="flex flex-col items-center text-center p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <Shield className="w-6 h-6 text-sg-aqua mb-2" />
                <span className="text-xs font-semibold text-gray-300">Warranty</span>
                <span className="text-xs text-gray-400">Coverage</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <Zap className="w-6 h-6 text-sg-red mb-2" />
                <span className="text-xs font-semibold text-gray-300">Fast</span>
                <span className="text-xs text-gray-400">Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <Award className="w-6 h-6 text-sg-aqua mb-2" />
                <span className="text-xs font-semibold text-gray-300">Premium</span>
                <span className="text-xs text-gray-400">Quality</span>
              </div>
            </div>
          </div>

          {/* Right Content - Product Showcase */}
          <div className="relative">
            {/* Product Grid */}
            <div className="grid grid-cols-1 gap-4">
              {/* Featured Product */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-5 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative mb-3">
                  <img 
                    src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop&crop=center" 
                    alt="HP 250 G10 (i7)" 
                    className="w-full h-40 object-cover rounded-xl"
                  />
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-sg-red to-red-600 text-white px-3 py-1 rounded-full font-bold text-xs shadow-lg">
                    WARRANTY ✔
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs">
                    💻 Laptop
                  </div>
                </div>
                <h3 className="text-lg font-bold text-sg-black mb-1">HP 250 G10 (i7)</h3>
                <p className="text-xs text-gray-600 mb-3">i7 13th Gen • 8GB RAM • 512GB SSD • 15.6″</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold bg-gradient-to-r from-sg-red to-red-600 bg-clip-text text-transparent">$800</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold text-sm">4.8</span>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-sg-aqua to-cyan-500 hover:from-sg-aqua/90 hover:to-cyan-600 text-white font-bold py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                  View Details
                </button>
              </div>

              {/* Secondary Products */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-3 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=200&h=150&fit=crop&crop=center" 
                    alt="Dell Latitude 5430 Rugged" 
                    className="w-full h-16 object-cover rounded-lg mb-2"
                  />
                  <h4 className="font-bold text-sg-black text-xs mb-1">Dell Rugged</h4>
                  <p className="text-xs text-gray-600 mb-2">16GB RAM</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-sg-red">$1,200</span>
                    <span className="text-xs text-green-600">✔</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-3 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=150&fit=crop&crop=center" 
                    alt="Samsung Galaxy A51" 
                    className="w-full h-16 object-cover rounded-lg mb-2"
                  />
                  <h4 className="font-bold text-sg-black text-xs mb-1">Galaxy A51</h4>
                  <p className="text-xs text-gray-600 mb-2">8GB RAM</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-sg-red">$120</span>
                    <span className="text-xs text-green-600">✔</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Banner */}
            <div className="bg-gradient-to-r from-sg-aqua/10 to-sg-red/10 backdrop-blur-sm border border-sg-aqua/20 text-center py-3 rounded-2xl mt-4">
              <p className="font-bold text-sg-aqua text-sm">🛡️ 100+ Products • All with Warranty</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>

    </section>
  );
}
