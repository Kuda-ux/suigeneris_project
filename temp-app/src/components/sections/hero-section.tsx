import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShoppingBag, Star, Zap, Shield, Award, TrendingUp, Sparkles, CheckCircle, Package } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-950 text-white overflow-hidden">
      {/* Animated Background Elements - More vibrant */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-gradient-to-r from-emerald-400/10 to-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-16 pb-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[85vh]">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Main Heading */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 backdrop-blur-md border border-cyan-400/40 rounded-full px-5 py-2.5 shadow-lg shadow-cyan-500/20">
                <Sparkles className="w-5 h-5 text-cyan-300 animate-pulse" />
                <span className="text-sm font-bold bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent">Premium Quality • Warranty Included</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black leading-[1.1] tracking-tight">
                <span className="block bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent drop-shadow-2xl">
                  Discover
                </span>
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                  Premium Tech
                </span>
                <span className="block text-4xl md:text-5xl mt-2 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                  At Unbeatable Prices
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 font-medium max-w-2xl leading-relaxed">
                Certified Refurbished <span className="text-cyan-300 font-bold">Laptops</span>, 
                <span className="text-blue-300 font-bold"> Desktops</span>, 
                <span className="text-purple-300 font-bold"> Smartphones</span> & More.
                <span className="block mt-2 text-lg text-gray-300">All backed by our quality guarantee.</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/products"
                className="group relative inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-400 text-white font-black text-lg rounded-2xl transition-all duration-300 shadow-2xl shadow-blue-500/50 hover:shadow-blue-400/60 transform hover:-translate-y-1 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <ShoppingBag className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                Shop Now
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/categories"
                className="group inline-flex items-center justify-center px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 hover:border-white/50 text-white font-bold text-lg rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-white/20 transform hover:-translate-y-1"
              >
                <Package className="mr-3 h-5 w-5" />
                Browse Categories
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="flex flex-col items-center text-center p-4 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 backdrop-blur-md rounded-2xl border border-emerald-400/30 hover:border-emerald-400/50 transition-all duration-300 hover:scale-105">
                <div className="p-2 bg-emerald-500/20 rounded-full mb-2">
                  <Shield className="w-6 h-6 text-emerald-300" />
                </div>
                <span className="text-sm font-bold text-white">Warranty</span>
                <span className="text-xs text-emerald-200">Included</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-md rounded-2xl border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
                <div className="p-2 bg-blue-500/20 rounded-full mb-2">
                  <Zap className="w-6 h-6 text-blue-300" />
                </div>
                <span className="text-sm font-bold text-white">Fast</span>
                <span className="text-xs text-blue-200">Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-md rounded-2xl border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
                <div className="p-2 bg-purple-500/20 rounded-full mb-2">
                  <Award className="w-6 h-6 text-purple-300" />
                </div>
                <span className="text-sm font-bold text-white">Premium</span>
                <span className="text-xs text-purple-200">Quality</span>
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
