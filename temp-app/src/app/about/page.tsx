'use client';

import { Award, Target, Users, Heart, Shield, TrendingUp, CheckCircle, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-600 to-red-700 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-2 mb-6">
              <Award className="w-5 h-5 text-white" />
              <span className="text-sm font-bold text-white">About Us</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              Sui Generis Technologies
            </h1>
            <p className="text-lg md:text-xl text-red-100 leading-relaxed">
              Zimbabwe's trusted source for <span className="font-bold text-white">premium refurbished technology</span> with warranty protection and certified quality.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Our Mission */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 hover:border-red-200">
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              To provide affordable, high-quality refurbished technology to businesses and individuals across Zimbabwe, making premium devices accessible to everyone while promoting sustainability and reducing electronic waste.
            </p>
          </div>

          {/* Our Vision */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 hover:border-red-200">
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Our Vision</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              To become Zimbabwe's leading technology provider, known for exceptional quality, reliability, and customer service. We aim to bridge the digital divide by making technology affordable and accessible to all.
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="mb-16">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop&crop=center&q=80"
            alt="Sui Generis Technologies Team"
            className="w-full h-96 object-cover rounded-2xl shadow-2xl"
          />
        </div>

        {/* Our Story */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Founded with a passion for technology and a commitment to quality
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Sui Generis Technologies was established to address a critical need in Zimbabwe's technology market: access to reliable, affordable computing devices. We recognized that many businesses and individuals were priced out of the new technology market, yet they needed quality devices to succeed in today's digital world.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our journey began with a simple belief: everyone deserves access to premium technology. By specializing in certified refurbished laptops, desktops, smartphones, and accessories, we've made it possible for countless Zimbabweans to own high-quality devices at prices they can afford.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Today, we're proud to serve customers across Zimbabwe, offering an extensive selection of refurbished technology from trusted brands like HP, Dell, Lenovo, Samsung, and more—all backed by our comprehensive warranty and quality guarantee.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Our Core Values</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 text-center hover:shadow-2xl transition-all duration-300 hover:border-red-200 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Quality First</h3>
              <p className="text-gray-600">Every device is thoroughly tested and certified to meet our high standards.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 text-center hover:shadow-2xl transition-all duration-300 hover:border-red-200 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Customer Care</h3>
              <p className="text-gray-600">Your satisfaction is our priority. We're here to support you every step of the way.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 text-center hover:shadow-2xl transition-all duration-300 hover:border-red-200 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Integrity</h3>
              <p className="text-gray-600">Honest pricing, transparent processes, and reliable service you can trust.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 text-center hover:shadow-2xl transition-all duration-300 hover:border-red-200 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">Continuously improving our services to better serve our customers.</p>
            </div>
          </div>
        </div>

        {/* What We Offer */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">What We Offer</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Premium refurbished technology with unbeatable value
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative overflow-hidden rounded-2xl shadow-lg group">
              <img 
                src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=400&fit=crop&crop=center&q=80"
                alt="Laptops"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-2xl font-black text-white mb-2">Laptops</h3>
                  <p className="text-white/90">HP, Dell, Lenovo & more</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl shadow-lg group">
              <img 
                src="https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600&h=400&fit=crop&crop=center&q=80"
                alt="Desktops"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-2xl font-black text-white mb-2">Desktops</h3>
                  <p className="text-white/90">Powerful workstations</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl shadow-lg group">
              <img 
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop&crop=center&q=80"
                alt="Smartphones"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-2xl font-black text-white mb-2">Smartphones</h3>
                  <p className="text-white/90">Samsung & Xiaomi</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-12 text-white">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Why Choose Sui Generis?</h2>
            <p className="text-xl text-red-100">
              We're committed to your success
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-black mb-4">100%</div>
              <div className="text-xl font-bold mb-2">Warranty Coverage</div>
              <p className="text-red-100">Every device comes with comprehensive warranty protection</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black mb-4">500+</div>
              <div className="text-xl font-bold mb-2">Happy Customers</div>
              <p className="text-red-100">Trusted by businesses and individuals across Zimbabwe</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black mb-4">4.8★</div>
              <div className="text-xl font-bold mb-2">Customer Rating</div>
              <p className="text-red-100">Consistently high ratings for quality and service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
