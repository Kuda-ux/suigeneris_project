'use client';

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
  Shield
} from 'lucide-react';
import Link from 'next/link';

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

            {/* Right Content - Services Preview Card */}
            <div className="relative order-1 lg:order-2">
              <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-white/50 max-w-lg mx-auto">
                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-red-500 to-red-600 text-white px-6 py-3 rounded-2xl font-black text-sm shadow-xl transform rotate-3">
                  🚀 PREMIUM QUALITY
                </div>

                <h3 className="text-2xl font-black text-gray-900 mb-6">Our Services Include:</h3>
                
                <div className="space-y-4">
                  {[
                    { icon: Globe, title: 'Website Development', color: 'text-blue-600' },
                    { icon: Code, title: 'Custom Software', color: 'text-purple-600' },
                    { icon: Smartphone, title: 'Mobile Apps', color: 'text-green-600' },
                    { icon: ShoppingCart, title: 'E-Commerce Solutions', color: 'text-orange-600' },
                    { icon: Cloud, title: 'Cloud Infrastructure', color: 'text-cyan-600' },
                    { icon: Lock, title: 'Cybersecurity', color: 'text-gray-700' },
                  ].map((service, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all group cursor-pointer">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <service.icon className={`w-6 h-6 ${service.color}`} />
                      </div>
                      <span className="font-bold text-gray-900">{service.title}</span>
                      <ArrowRight className="w-4 h-4 text-gray-400 ml-auto group-hover:translate-x-1 transition-transform" />
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t-2 border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Trusted by</p>
                      <p className="text-2xl font-black text-gray-900">50+ Businesses</p>
                    </div>
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 border-2 border-white flex items-center justify-center text-white font-bold text-xs">
                          {i === 4 ? '+' : '✓'}
                        </div>
                      ))}
                    </div>
                  </div>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-red-200 transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${service.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className={`w-8 h-8 bg-gradient-to-br ${service.color} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }} />
                </div>
                
                <h3 className="text-xl font-black text-gray-900 mb-3">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`mt-6 w-full bg-gradient-to-r ${service.color} text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all`}>
                  Learn More
                </button>
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create a solution that drives real results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-red-600 px-10 py-5 rounded-2xl font-black text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              Get Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+263"
              className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/20 transition-all inline-flex items-center justify-center gap-2"
            >
              Call Us Now
              <Server className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
