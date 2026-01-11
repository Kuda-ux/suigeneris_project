'use client';

import { useState, useEffect } from 'react';
import { Mail, Phone, Loader2, AlertCircle, CheckCircle as CheckCircle2 } from 'lucide-react';
import {
  Code,
  Smartphone,
  Globe,
  Database,
  Cloud,
  ShoppingCart,
  BarChart,
  Lock,
  Zap,
  CheckCircle,
  ArrowRight,
  Laptop,
  Server,
  Palette,
  Users,
  TrendingUp,
  Shield,
  ChevronLeft,
  ChevronRight,
  Star
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Carousel slides for hero section
const heroSlides = [
  {
    id: 1,
    title: 'Website Development',
    subtitle: 'Modern & Responsive',
    description: 'Professional websites that convert visitors into customers',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80',
    icon: Globe,
    color: 'from-blue-500 to-blue-600',
    features: ['SEO Optimized', 'Mobile-First', 'Fast Loading'],
  },
  {
    id: 2,
    title: 'Custom Software',
    subtitle: 'Tailored Solutions',
    description: 'Enterprise software built specifically for your business needs',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80',
    icon: Code,
    color: 'from-purple-500 to-purple-600',
    features: ['Scalable', 'Secure', 'Cloud-Ready'],
  },
  {
    id: 3,
    title: 'Mobile Apps',
    subtitle: 'iOS & Android',
    description: 'Native and cross-platform apps that users love',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80',
    icon: Smartphone,
    color: 'from-green-500 to-green-600',
    features: ['Native Performance', 'Push Notifications', 'Offline Mode'],
  },
  {
    id: 4,
    title: 'E-Commerce Solutions',
    subtitle: 'Online Stores',
    description: 'Complete e-commerce platforms with payment integration',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&q=80',
    icon: ShoppingCart,
    color: 'from-orange-500 to-orange-600',
    features: ['Payment Gateway', 'Inventory', 'Analytics'],
  },
  {
    id: 5,
    title: 'Cloud Solutions',
    subtitle: 'AWS & Azure',
    description: 'Scalable cloud infrastructure for modern businesses',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80',
    icon: Cloud,
    color: 'from-cyan-500 to-cyan-600',
    features: ['Auto-Scaling', '99.9% Uptime', '24/7 Monitoring'],
  },
];

const services = [
  {
    icon: Globe,
    title: 'Website Development',
    description: 'Professional, responsive websites that drive business growth. From corporate sites to e-commerce platforms.',
    features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Mobile-First'],
    color: 'from-blue-500 to-blue-600',
    bgColor: 'from-blue-50 to-blue-100',
  },
  {
    icon: Code,
    title: 'Custom Software Development',
    description: 'Tailored software solutions built specifically for your business needs and workflows.',
    features: ['Custom Solutions', 'Scalable Architecture', 'Cloud Integration', 'API Development'],
    color: 'from-purple-500 to-purple-600',
    bgColor: 'from-purple-50 to-purple-100',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    features: ['iOS & Android', 'Cross-Platform', 'Push Notifications', 'Offline Support'],
    color: 'from-green-500 to-green-600',
    bgColor: 'from-green-50 to-green-100',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Solutions',
    description: 'Complete online store solutions with payment integration and inventory management.',
    features: ['Payment Gateway', 'Inventory System', 'Order Management', 'Analytics'],
    color: 'from-orange-500 to-orange-600',
    bgColor: 'from-orange-50 to-orange-100',
  },
  {
    icon: Database,
    title: 'Database Management',
    description: 'Secure, scalable database solutions for efficient data storage and retrieval.',
    features: ['Data Security', 'Backup Solutions', 'Performance Tuning', 'Migration Services'],
    color: 'from-red-500 to-red-600',
    bgColor: 'from-red-50 to-red-100',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Cloud infrastructure setup, migration, and management for modern businesses.',
    features: ['Cloud Migration', 'AWS/Azure Setup', 'Auto-Scaling', '24/7 Monitoring'],
    color: 'from-cyan-500 to-cyan-600',
    bgColor: 'from-cyan-50 to-cyan-100',
  },
  {
    icon: BarChart,
    title: 'Business Analytics',
    description: 'Data-driven insights and reporting tools to make informed business decisions.',
    features: ['Custom Dashboards', 'Real-time Reports', 'Data Visualization', 'KPI Tracking'],
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'from-indigo-50 to-indigo-100',
  },
  {
    icon: Lock,
    title: 'Cybersecurity Solutions',
    description: 'Protect your business with comprehensive security solutions and monitoring.',
    features: ['Security Audits', 'Threat Detection', 'Data Encryption', 'Compliance'],
    color: 'from-gray-700 to-gray-800',
    bgColor: 'from-gray-50 to-gray-100',
  },
];

const technologies = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Python', icon: '🐍' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'AWS', icon: '☁️' },
];

const benefits = [
  {
    icon: TrendingUp,
    title: 'Business Growth',
    description: 'Solutions designed to scale with your business and drive revenue growth.',
  },
  {
    icon: Zap,
    title: 'Fast Delivery',
    description: 'Agile development process ensures quick turnaround without compromising quality.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security and 99.9% uptime guarantee for your peace of mind.',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Experienced developers and consultants dedicated to your success.',
  },
];

const process = [
  {
    step: '01',
    title: 'Discovery & Planning',
    description: 'We understand your business needs, goals, and challenges.',
  },
  {
    step: '02',
    title: 'Design & Prototype',
    description: 'Create wireframes and prototypes for your approval.',
  },
  {
    step: '03',
    title: 'Development',
    description: 'Build your solution using cutting-edge technologies.',
  },
  {
    step: '04',
    title: 'Testing & Launch',
    description: 'Rigorous testing followed by smooth deployment.',
  },
  {
    step: '05',
    title: 'Support & Maintenance',
    description: 'Ongoing support to ensure optimal performance.',
  },
];

export function ITSolutionsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Form state
  const [formData, setFormData] = useState({
    companyName: '',
    name: '',
    email: '',
    phone: '',
    serviceInterest: '',
    budgetRange: '',
    timeline: '',
    projectDescription: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'consultation',
          ...formData,
          message: formData.projectDescription
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send request');
      }

      setFormStatus('success');
    } catch (error: any) {
      setFormStatus('error');
      setErrorMessage(error.message || 'Something went wrong');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen lg:h-[900px] overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-red-900/60 to-gray-900/75"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div className="container mx-auto px-4 h-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full py-20 lg:py-12">

            {/* Left Content */}
            <div className="space-y-6 order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-red-500/20 backdrop-blur-md border border-red-400/30 rounded-full px-6 py-3 shadow-xl w-fit">
                <Code className="w-5 h-5 text-red-400" />
                <span className="text-sm font-black text-white tracking-wide">PREMIUM IT SOLUTIONS</span>
              </div>

              {/* Main Heading */}
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight tracking-tight text-white drop-shadow-2xl mb-4">
                  Transform Your Business
                </h1>
                <p className="text-3xl md:text-4xl lg:text-6xl font-black bg-gradient-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-xl">
                  With World-Class Software
                </p>
              </div>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-xl">
                From cutting-edge websites to custom enterprise software, we deliver digital solutions that drive growth, efficiency, and innovation for businesses across Zimbabwe.
              </p>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-white font-bold text-sm">Expert Developers</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-white font-bold text-sm">Fast Delivery</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-white font-bold text-sm">24/7 Support</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-white font-bold text-sm">Proven Results</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/contact"
                  className="group bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-5 rounded-2xl font-black text-lg shadow-2xl hover:shadow-red-500/50 transition-all transform hover:scale-105 inline-flex items-center justify-center gap-3"
                >
                  <span>Get Free Consultation</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#services"
                  className="bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 text-white px-8 py-5 rounded-2xl font-black text-lg transition-all inline-flex items-center justify-center gap-3"
                >
                  <span>View Services</span>
                  <Code className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Right Content - Services Carousel */}
            <div className="relative order-1 lg:order-2">
              <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border-2 border-white/50 max-w-lg mx-auto">
                {/* Premium Badge */}
                <div className="absolute top-4 right-4 z-20 bg-gradient-to-br from-red-500 to-red-600 text-white px-4 py-2 rounded-xl font-black text-xs shadow-xl flex items-center gap-2">
                  <Star className="w-4 h-4 fill-current" />
                  PREMIUM
                </div>

                {/* Carousel Content */}
                <div className="relative h-[600px]">
                  {/* Image Section */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={currentSlideData.image}
                      alt={currentSlideData.title}
                      fill
                      className="object-cover transition-transform duration-700"
                      priority
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${currentSlideData.color} opacity-40`}></div>

                    {/* Icon Badge on Image */}
                    <div className={`absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br ${currentSlideData.color} rounded-2xl flex items-center justify-center shadow-xl`}>
                      <currentSlideData.icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8">
                    <div className="mb-6">
                      <p className={`text-sm font-black bg-gradient-to-r ${currentSlideData.color} bg-clip-text text-transparent mb-2`}>
                        {currentSlideData.subtitle}
                      </p>
                      <h3 className="text-3xl font-black text-gray-900 mb-3">
                        {currentSlideData.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {currentSlideData.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-6">
                      {currentSlideData.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-4 h-4 text-green-600" strokeWidth={3} />
                          </div>
                          <span className="text-sm font-bold text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button className={`w-full bg-gradient-to-r ${currentSlideData.color} text-white py-4 rounded-xl font-black text-sm hover:shadow-xl transition-all group/btn`}>
                      <span>Learn More</span>
                      <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-10 group"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-900 group-hover:scale-110 transition-transform" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-10 group"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-900 group-hover:scale-110 transition-transform" />
                  </button>
                </div>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {heroSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all ${index === currentSlide
                          ? 'w-8 bg-gradient-to-r ' + currentSlideData.color
                          : 'w-2 bg-gray-300 hover:bg-gray-400'
                        }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-red-100 text-red-600 px-6 py-2 rounded-full font-black text-sm mb-4">
              WHAT WE OFFER
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
              Premium IT Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive technology solutions designed to transform your business and drive measurable results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 hover:border-transparent transform hover:-translate-y-3 overflow-hidden"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                {/* Icon Container - Vibrant and Visible */}
                <div className="relative mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500 relative`}>
                    <service.icon className="w-10 h-10 text-white" strokeWidth={2.5} />
                    {/* Glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-black text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3.5 h-3.5 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button className={`relative w-full bg-gradient-to-r ${service.color} text-white py-4 rounded-xl font-black text-sm hover:shadow-2xl transition-all duration-300 overflow-hidden group/btn`}>
                  <span className="relative z-10">Learn More</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity"></div>
                  <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                {/* Corner Accent */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${service.color} opacity-5 rounded-bl-full`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Why Choose Sui Generis?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We deliver excellence in every project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <benefit.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Technologies We Use
            </h2>
            <p className="text-xl text-gray-600">
              Cutting-edge tools and frameworks
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl px-8 py-4 shadow-lg border-2 border-gray-100 hover:border-red-200 hover:shadow-xl transition-all transform hover:scale-105"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{tech.icon}</span>
                  <span className="font-bold text-gray-900">{tech.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Our Development Process
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A proven methodology for successful project delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {process.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all">
                  <div className="text-5xl font-black text-red-400 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-black mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {item.description}
                  </p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-red-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Form Section */}
      <section id="consultation" className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <div>
              <div className="inline-block bg-purple-500/20 text-purple-300 px-6 py-2 rounded-full font-black text-sm mb-6">
                🚀 FREE CONSULTATION
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Ready to Transform<br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Your Business?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Tell us about your project and our expert team will get back to you within 24 hours with a tailored solution.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/30 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <div className="font-bold">Free Project Assessment</div>
                    <div className="text-gray-400 text-sm">No obligation consultation</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/30 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <div className="font-bold">Expert Technical Team</div>
                    <div className="text-gray-400 text-sm">Senior developers on every project</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/30 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <div className="font-bold">24-Hour Response</div>
                    <div className="text-gray-400 text-sm">Fast turnaround on all inquiries</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+263784116938" className="flex items-center gap-3 bg-white/10 px-6 py-4 rounded-xl hover:bg-white/20 transition-all">
                  <Phone className="w-5 h-5 text-purple-400" />
                  <span className="font-bold">+263 78 411 6938</span>
                </a>
                <a href="mailto:info@suigeneriszim.co.zw" className="flex items-center gap-3 bg-white/10 px-6 py-4 rounded-xl hover:bg-white/20 transition-all">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <span className="font-bold">info@suigeneriszim.co.zw</span>
                </a>
              </div>
            </div>

            {/* Right - Form */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              {formStatus === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4">Request Submitted!</h3>
                  <p className="text-gray-600">Thank you for your interest. Our team will contact you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-black text-gray-900">Request Free Consultation</h3>
                    <p className="text-gray-600">Fill out the form below</p>
                  </div>

                  {formStatus === 'error' && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <p className="text-red-700 font-medium text-sm">{errorMessage}</p>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Company Name</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-gray-900"
                        placeholder="Your Company"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Contact Person *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-gray-900"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-gray-900"
                        placeholder="john@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-gray-900"
                        placeholder="+263 77 123 4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Service Interest *</label>
                    <select
                      name="serviceInterest"
                      value={formData.serviceInterest}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-gray-900"
                    >
                      <option value="">Select a service</option>
                      <option value="Website Development">Website Development</option>
                      <option value="Custom Software Development">Custom Software Development</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="E-Commerce Solutions">E-Commerce Solutions</option>
                      <option value="Cloud Solutions">Cloud Solutions</option>
                      <option value="Database Management">Database Management</option>
                      <option value="Business Analytics">Business Analytics</option>
                      <option value="Cybersecurity">Cybersecurity</option>
                      <option value="Multiple Services">Multiple Services</option>
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Budget Range</label>
                      <select
                        name="budgetRange"
                        value={formData.budgetRange}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-gray-900"
                      >
                        <option value="">Select budget</option>
                        <option value="$500 - $2,000">$500 - $2,000</option>
                        <option value="$2,000 - $5,000">$2,000 - $5,000</option>
                        <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                        <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                        <option value="$25,000+">$25,000+</option>
                        <option value="To be discussed">To be discussed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Timeline</label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-gray-900"
                      >
                        <option value="">Select timeline</option>
                        <option value="ASAP">ASAP</option>
                        <option value="1-2 weeks">1-2 weeks</option>
                        <option value="1 month">1 month</option>
                        <option value="1-3 months">1-3 months</option>
                        <option value="3-6 months">3-6 months</option>
                        <option value="Flexible">Flexible</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Project Description *</label>
                    <textarea
                      name="projectDescription"
                      value={formData.projectDescription}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none text-gray-900"
                      placeholder="Describe your project requirements, goals, and any specific features you need..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-black text-lg rounded-xl transition-all shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {formStatus === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Request
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting, you agree to be contacted about your project. We never share your information.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
