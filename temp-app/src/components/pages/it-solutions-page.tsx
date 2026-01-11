'use client';

import { useState, useEffect } from 'react';
import {
  Code, Smartphone, Globe, Database, Cloud, ShoppingCart, BarChart, Lock, Zap,
  CheckCircle, ArrowRight, Server, Palette, Users, TrendingUp, Shield,
  ChevronDown, Star, MapPin, Clock, Check, Phone
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const services = [
  {
    icon: Globe,
    title: 'Website Development',
    description: 'Professional, responsive websites designed to dominate the Zimbabwean market. From corporate sites to high-converting landing pages.',
    features: ['SEO Optimized for Zimbabwe', 'Mobile-First Design', 'Fast Loading Speeds', 'CMS Integration'],
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'hover:border-blue-500/50'
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile apps (iOS & Android) that engage users. Perfect for startups and enterprises in Harare and beyond.',
    features: ['iOS & Android', 'Offline Capabilities', 'Push Notifications', 'User-Centric UI/UX'],
    color: 'text-green-500',
    bg: 'bg-green-500/10',
    border: 'hover:border-green-500/50'
  },
  {
    icon: Code,
    title: 'Custom Software',
    description: 'Tailored software solutions built to automate your specific business processes. Scalable, secure, and designed for your unique workflow.',
    features: ['Workflow Automation', 'CRM & ERP Systems', 'Legacy Migration', 'API Integration'],
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    border: 'hover:border-purple-500/50'
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Solutions',
    description: 'Robust online stores that sell 24/7. content integrated with local payment gateways (PayNow, EcoCash) and international standards.',
    features: ['Inventory Management', 'Secure Payments', 'Order Tracking', 'Sales Analytics'],
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    border: 'hover:border-orange-500/50'
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Secure cloud infrastructure setup and management (AWS, Azure). ensuring your business data is safe, accessible, and scalable.',
    features: ['Cloud Migration', 'Data Backup', '24/7 Monitoring', 'Cost Optimization'],
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
    border: 'hover:border-cyan-500/50'
  },
  {
    icon: Lock,
    title: 'Cybersecurity',
    description: 'Comprehensive security audits and implementation to protect your digital assets from threats. Trusted by Zimbabwean businesses.',
    features: ['Penetration Testing', 'Security Audits', 'Data Encryption', 'Compliance'],
    color: 'text-red-500',
    bg: 'bg-red-500/10',
    border: 'hover:border-red-500/50'
  }
];

const faqs = [
  {
    question: 'Why is Sui Generis the best IT solutions provider in Zimbabwe?',
    answer: 'Sui Generis combines world-class technical expertise with deep local market understanding. We deliver enterprise-grade software that is reliable, scalable, and tailored for the unique challenges and opportunities of the Zimbabwean business environment.'
  },
  {
    question: 'Do you offer services outside of Harare?',
    answer: 'Yes! While we are based in Harare, we proudly serve clients in Bulawayo, Gweru, Mutare, and across all major cities in Zimbabwe. Our remote collaboration tools ensure seamless project delivery regardless of location.'
  },
  {
    question: 'How much does a custom website or app cost?',
    answer: 'Every project is unique. Our pricing is competitive and depends on features, complexity, and platform. We offer free consultations to understand your needs and provide a tailored, transparent quote.'
  },
  {
    question: 'How long does it take to develop a software project?',
    answer: 'Timelines vary by project scope. A standard website might take 2-4 weeks, while a complex custom application could take 3-6 months. We prioritize agile delivery to get you to market fast without compromising quality.'
  }
];

export function ITSolutionsPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Form state
  const [formData, setFormData] = useState({
    companyName: '',
    name: '',
    email: '',
    phone: '',
    serviceInterest: 'Website Development',
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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gray-900 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.png"
            alt="Digital Technology Background"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-900/80 to-gray-900" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 border border-red-600/30 text-red-400 font-bold mb-8 animate-fade-in-up">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            #1 IT Solutions Provider in Zimbabwe
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-tight max-w-5xl mx-auto">
            Innovating the Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              Your Business
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            We build world-class digital solutions that drive growth, efficiency, and competitive advantage for businesses across Harare, Bulawayo, and all of Zimbabwe.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#consultation" className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-red-600/20 flex items-center justify-center gap-2">
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#services" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2">
              Explore Services
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid with Glassmorphism */}
      <section id="services" className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-red-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Comprehensive IT Services
            </h2>
            <p className="text-xl text-gray-600">
              End-to-end technology solutions tailored to modernize your operations and elevate your customer experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className={`group bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-2 ${service.border} border-t-4 border-t-transparent hover:border-t-current`}
              >
                <div className={`w-14 h-14 ${service.bg} ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-7 h-7" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-8 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                      <div className={`w-1.5 h-1.5 rounded-full ${service.bg.replace('/10', '')}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Local Focus */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&q=80')] bg-cover bg-fixed opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/80" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-red-600/20 text-red-400 font-bold text-sm mb-6">
                Why Partner With Us?
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                Local Expertise, <br />
                <span className="text-red-500">Global Standards.</span>
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Finding a reliable software partner in Zimbabwe can be challenging. We bridge the gap by offering world-class development quality with the accessibility and understanding of a local partner.
              </p>

              <div className="space-y-6">
                {[
                  { title: 'Trusted Nationwide', desc: 'Serving clients in Harare, Mutare, Gweru, and Bulawayo.' },
                  { title: 'Reliable Support', desc: 'Direct access to your development team. No timezone barriers.' },
                  { title: 'Scalable Solutions', desc: 'Technology that grows with your business, from startup to enterprise.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center flex-shrink-0 text-red-500">
                      <Check className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-[2rem] opacity-30 blur-2xl animate-pulse" />
              <div className="relative bg-gray-800 border border-gray-700 rounded-[2rem] p-8 md:p-12 overflow-hidden group hover:border-red-500/50 transition-colors">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Globe className="w-48 h-48 text-white" />
                </div>

                <h3 className="text-3xl font-black mb-6">Ready to Scale?</h3>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-700/50 p-4 rounded-xl">
                    <div className="text-3xl font-black text-red-400 mb-1">98%</div>
                    <div className="text-sm text-gray-400 font-medium">Client Retention</div>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded-xl">
                    <div className="text-3xl font-black text-red-400 mb-1">50+</div>
                    <div className="text-sm text-gray-400 font-medium">Projects Delivered</div>
                  </div>
                </div>
                <a href="#consultation" className="inline-flex items-center gap-2 text-white font-bold hover:text-red-400 transition-colors group-hover:translate-x-2 duration-300">
                  Book Your Consultation <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Excellent for AEO */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Common Questions
            </h2>
            <p className="text-gray-600">
              Everything you need to know about working with Zimbabwe's leading IT solutions provider.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 ${activeFaq === idx ? 'bg-gray-50 border-gray-300 shadow-md' : 'hover:border-red-200'}`}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={`text-lg font-bold ${activeFaq === idx ? 'text-red-600' : 'text-gray-900'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${activeFaq === idx ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className="p-6 pt-0 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Form Section */}
      <section id="consultation" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
            <div className="grid lg:grid-cols-5">

              {/* Left Side Info */}
              <div className="lg:col-span-2 bg-gray-900 text-white p-10 md:p-14 relative overflow-hidden">
                <div className="absolute inset-0 bg-red-600/10" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/20 rounded-full blur-[80px]" />

                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-black mb-6">Let's Build Something Great</h2>
                    <p className="text-gray-400 mb-12 text-lg leading-relaxed">
                      Ready to transform your business with technology? Fill out the form and our team will get back to you within 24 hours.
                    </p>

                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Call Us</div>
                          <div className="font-bold">+263 78 411 6938</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Head Office</div>
                          <div className="font-bold">109 Leopold Takawira St, Harare</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Working Hours</div>
                          <div className="font-bold">Mon - Fri, 8am - 5pm</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="flex gap-4 opacity-60 hover:opacity-100 transition-opacity">
                      {/* Social Icons placeholders */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side Form */}
              <div className="lg:col-span-3 p-10 md:p-14">
                {formStatus === 'success' ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-black text-gray-900 mb-4">Request Sent!</h3>
                    <p className="text-gray-600 max-w-md mx-auto mb-8">
                      Thank you for contacting Sui Generis. One of our consultants will review your project details and contact you shortly.
                    </p>
                    <button
                      onClick={() => setFormStatus('idle')}
                      className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors"
                    >
                      Send Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all bg-gray-50 focus:bg-white"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Company Name</label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all bg-gray-50 focus:bg-white"
                          placeholder="Your Company Ltd"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all bg-gray-50 focus:bg-white"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all bg-gray-50 focus:bg-white"
                          placeholder="+263 77..."
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Service Needed</label>
                      <select
                        name="serviceInterest"
                        value={formData.serviceInterest}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all bg-gray-50 focus:bg-white"
                      >
                        {services.map(s => (
                          <option key={s.title} value={s.title}>{s.title}</option>
                        ))}
                        <option value="Other">Other / Not Sure</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Project Details</label>
                      <textarea
                        name="projectDescription"
                        required
                        value={formData.projectDescription}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all bg-gray-50 focus:bg-white resize-none"
                        placeholder="Tell us about your project goals, features needed, and any specific requirements..."
                      />
                    </div>

                    {errorMessage && (
                      <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                        {errorMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={formStatus === 'loading'}
                      className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-xl shadow-xl shadow-red-600/20 hover:shadow-2xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {formStatus === 'loading' ? (
                        <>Processing...</>
                      ) : (
                        <>
                          Submit Request <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-gray-400 mt-4">
                      By submitting this form, you agree to our privacy policy. We respect your data.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
