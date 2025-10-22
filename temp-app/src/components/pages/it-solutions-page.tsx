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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-600 to-red-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-6">
              <Laptop className="w-5 h-5" />
              <span className="font-bold">IT Software Solutions</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              Transform Your Business with
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Premium Software Solutions
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-red-100 mb-8 leading-relaxed max-w-3xl mx-auto">
              From websites to custom software, we build digital solutions that drive growth and efficiency for businesses across Zimbabwe.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-red-600 px-8 py-4 rounded-2xl font-black text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-black text-lg hover:bg-white/20 transition-all inline-flex items-center justify-center gap-2">
                View Portfolio
                <Code className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive IT solutions tailored to your business needs
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
