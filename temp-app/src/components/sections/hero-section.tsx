import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShoppingBag, Star, Shield, Award, CheckCircle, TrendingUp, Users, Package2 } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-red-100/40 to-red-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-gray-100/40 to-gray-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-red-50/30 to-red-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Trust Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-full px-6 py-3 shadow-lg">
              <Shield className="w-5 h-5 text-red-600" />
              <span className="text-sm font-bold text-red-700">Trusted in Zimbabwe • Quality Guaranteed</span>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight">
                <span className="block text-gray-900">
                  Premium Technology
                </span>
                <span className="block bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                  For Your Business
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-700 font-medium max-w-xl leading-relaxed">
                Certified refurbished <span className="text-red-600 font-bold">laptops</span>, 
                <span className="text-red-600 font-bold"> desktops</span>, and 
                <span className="text-red-600 font-bold"> smartphones</span> with warranty included.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/products"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg rounded-2xl transition-all duration-300 shadow-xl shadow-red-500/30 hover:shadow-2xl hover:shadow-red-600/40 transform hover:-translate-y-1"
              >
                <ShoppingBag className="mr-3 h-6 w-6" />
                Shop Now
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-gray-300 hover:border-red-600 text-gray-900 hover:text-red-600 font-bold text-lg rounded-2xl transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
              >
                Contact Us
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Trust Indicators - Relevant Only */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="flex flex-col items-center text-center p-5 bg-white rounded-2xl border-2 border-gray-200 hover:border-red-300 transition-all duration-300 hover:shadow-lg group">
                <div className="p-3 bg-gradient-to-br from-red-50 to-red-100 rounded-full mb-3 group-hover:scale-110 transition-transform">
                  <Shield className="w-7 h-7 text-red-600" />
                </div>
                <span className="text-sm font-bold text-gray-900">Warranty</span>
                <span className="text-xs text-gray-600">Included</span>
              </div>
              
              <div className="flex flex-col items-center text-center p-5 bg-white rounded-2xl border-2 border-gray-200 hover:border-red-300 transition-all duration-300 hover:shadow-lg group">
                <div className="p-3 bg-gradient-to-br from-red-50 to-red-100 rounded-full mb-3 group-hover:scale-110 transition-transform">
                  <Award className="w-7 h-7 text-red-600" />
                </div>
                <span className="text-sm font-bold text-gray-900">Certified</span>
                <span className="text-xs text-gray-600">Quality</span>
              </div>
              
              <div className="flex flex-col items-center text-center p-5 bg-white rounded-2xl border-2 border-gray-200 hover:border-red-300 transition-all duration-300 hover:shadow-lg group">
                <div className="p-3 bg-gradient-to-br from-red-50 to-red-100 rounded-full mb-3 group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7 text-red-600" />
                </div>
                <span className="text-sm font-bold text-gray-900">Trusted</span>
                <span className="text-xs text-gray-600">Locally</span>
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                  JD
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                  SM
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                  TK
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                  +50
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  <span className="font-bold text-gray-900">50+</span> Happy Customers in Zimbabwe
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Product Showcase */}
          <div className="relative">
            {/* Featured Product Card */}
            <div className="bg-white rounded-3xl p-6 shadow-2xl border-2 border-gray-100 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative mb-4 group">
                <img 
                  src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=400&fit=crop&crop=center" 
                  alt="HP 250 G10 (i7)" 
                  className="w-full h-64 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  WARRANTY
                </div>
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm font-semibold">
                  💻 Premium Laptop
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-900">HP 250 G10 (i7)</h3>
                <p className="text-sm text-gray-600">Intel i7 13th Gen • 8GB RAM • 512GB SSD • 15.6″ Display</p>
                
                <div className="flex items-center justify-between py-3 border-t border-gray-100">
                  <div>
                    <span className="text-3xl font-black bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">$800</span>
                    <span className="text-sm text-gray-500 ml-2 line-through">$1,200</span>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-bold text-sm text-gray-900">4.8</span>
                    <span className="text-xs text-gray-600">(24)</span>
                  </div>
                </div>

                <Link 
                  href="/products"
                  className="block w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                >
                  View Details
                </Link>
              </div>
            </div>

            {/* Secondary Products Grid */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white rounded-2xl p-4 shadow-lg border-2 border-gray-100 hover:shadow-xl hover:border-red-200 transition-all duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300&h=200&fit=crop&crop=center" 
                  alt="Dell Latitude 5430 Rugged" 
                  className="w-full h-24 object-cover rounded-xl mb-3"
                />
                <h4 className="font-bold text-gray-900 text-sm mb-1">Dell Rugged Laptop</h4>
                <p className="text-xs text-gray-600 mb-2">16GB RAM • 512GB SSD</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-red-600">$1,200</span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-lg border-2 border-gray-100 hover:shadow-xl hover:border-red-200 transition-all duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop&crop=center" 
                  alt="Samsung Galaxy A51" 
                  className="w-full h-24 object-cover rounded-xl mb-3"
                />
                <h4 className="font-bold text-gray-900 text-sm mb-1">Samsung Galaxy A51</h4>
                <p className="text-xs text-gray-600 mb-2">8GB RAM • 128GB Storage</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-red-600">$120</span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              </div>
            </div>

            {/* Stats Banner */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white text-center py-4 rounded-2xl mt-6 shadow-xl">
              <p className="font-bold text-lg flex items-center justify-center gap-2">
                <Package2 className="w-5 h-5" />
                100+ Quality Products • All with Warranty
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </section>
  );
}
