import Link from 'next/link';
import { ArrowRight, ShoppingBag, Shield, Award, CheckCircle, Star } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1920&h=1080&fit=crop&crop=center&q=80" 
          alt="Premium Technology"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay with red gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-red-900/60"></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 h-full relative z-10">
        <div className="flex flex-col justify-center h-full max-w-3xl">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 shadow-xl mb-6 w-fit">
            <Shield className="w-5 h-5 text-red-400" />
            <span className="text-sm font-bold text-white">Trusted in Zimbabwe • Quality Guaranteed</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-6">
            <span className="block text-white drop-shadow-2xl">
              Premium Technology
            </span>
            <span className="block bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent drop-shadow-2xl">
              For Your Business
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-200 font-medium mb-8 leading-relaxed max-w-2xl">
            Certified refurbished <span className="text-red-400 font-bold">laptops</span>, 
            <span className="text-red-400 font-bold"> desktops</span>, and 
            <span className="text-red-400 font-bold"> smartphones</span> with warranty included.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-white font-semibold text-sm">Warranty Included</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-semibold text-sm">Certified Quality</span>
            </div>
            <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
              <span className="text-white font-semibold text-sm ml-2">4.8/5</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/products"
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-2xl shadow-red-900/50 hover:shadow-red-900/70 transform hover:-translate-y-1 hover:scale-105"
            >
              <ShoppingBag className="mr-3 h-6 w-6" />
              Shop Now
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 hover:border-white/50 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
            >
              Contact Us
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-4 mt-8">
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
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </section>
  );
}
