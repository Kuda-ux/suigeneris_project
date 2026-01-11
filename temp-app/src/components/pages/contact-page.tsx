'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare, User, Building, Shield, Award, Zap, Loader2, AlertCircle } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          ...formData
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }, 5000);
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
              <MessageSquare className="w-5 h-5 text-white" />
              <span className="text-sm font-bold text-white">Get In Touch</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-red-100 leading-relaxed">
              Have questions? We're here to help. <span className="font-bold text-white">Reach out anytime</span> and our team will respond promptly.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Information Cards */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 hover:border-red-200 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl flex items-center justify-center mb-6">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-4">Phone</h3>
            <a href="tel:+263784116938" className="text-lg text-red-600 hover:text-red-700 font-bold mb-2 block">+263 78 411 6938</a>
            <p className="text-sm text-gray-500">Mon-Sat: 8:00 AM - 6:00 PM</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 hover:border-red-200 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl flex items-center justify-center mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-4">Email</h3>
            <a href="mailto:info@suigeneriszim.co.zw" className="text-lg text-red-600 hover:text-red-700 font-bold mb-2 block">info@suigeneriszim.co.zw</a>
            <p className="text-sm text-gray-500">We reply within 24 hours</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 hover:border-red-200 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl flex items-center justify-center mb-6">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-4">Location</h3>
            <p className="text-lg text-gray-700 mb-2">109 Leopold Takawira St</p>
            <p className="text-sm text-gray-500">Harare, Zimbabwe</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-8">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Send Us a Message</h2>
                <p className="text-lg text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>

              {status === 'success' ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-lg text-gray-600">Thank you for contacting us. We'll respond to <span className="font-bold">{formData.email}</span> within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {status === 'error' && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center gap-3">
                      <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                      <p className="text-red-700 font-medium">{errorMessage}</p>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={status === 'loading'}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={status === 'loading'}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={status === 'loading'}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="+263 77 123 4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        <Building className="w-4 h-4 inline mr-2" />
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        disabled={status === 'loading'}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="">Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Product Question">Product Question</option>
                        <option value="IT Solutions">IT Solutions Inquiry</option>
                        <option value="Civil Servants Loan">Civil Servants Loan</option>
                        <option value="Warranty Support">Warranty Support</option>
                        <option value="Bulk Order">Bulk Order</option>
                        <option value="Partnership">Partnership Opportunity</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      disabled={status === 'loading'}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none font-medium resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 px-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Hours */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black text-gray-900">Business Hours</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-semibold text-gray-700">Monday - Friday</span>
                  <span className="font-bold text-gray-900">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-semibold text-gray-700">Saturday</span>
                  <span className="font-bold text-gray-900">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold text-gray-700">Sunday</span>
                  <span className="font-bold text-red-600">Closed</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-black mb-6">Why Trust Us?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold mb-1">100% Warranty</div>
                    <div className="text-sm text-red-100">All products covered</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold mb-1">Certified Quality</div>
                    <div className="text-sm text-red-100">Thoroughly tested devices</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold mb-1">Fast Response</div>
                    <div className="text-sm text-red-100">Reply within 24 hours</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
              <h3 className="text-xl font-black text-gray-900 mb-6">Our Track Record</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-black bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-1">500+</div>
                  <div className="text-sm font-semibold text-gray-600">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-black bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-1">4.8★</div>
                  <div className="text-sm font-semibold text-gray-600">Average Rating</div>
                </div>
                <div>
                  <div className="text-3xl font-black bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-1">24hrs</div>
                  <div className="text-sm font-semibold text-gray-600">Response Time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
