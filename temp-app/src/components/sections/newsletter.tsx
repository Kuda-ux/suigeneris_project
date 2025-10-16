'use client';

import { useState } from 'react';
import { Send, CheckCircle, Mail, Gift } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-red-600 to-red-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      
      {/* Decorative Circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            {/* Icon Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-2 mb-6">
              <Gift className="w-5 h-5 text-white" />
              <span className="text-sm font-bold text-white">Exclusive Offers</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              Stay Updated
            </h2>
            <p className="text-lg md:text-xl text-red-100 max-w-2xl mx-auto leading-relaxed">
              Subscribe to our newsletter and get <span className="font-bold text-white">exclusive deals</span>, early access to new products, and tech tips delivered to your inbox.
            </p>
          </div>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-xl text-gray-900 placeholder-gray-500 font-medium focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={subscribed}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center ${
                  subscribed
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-red-600 hover:bg-gray-50'
                }`}
              >
                {subscribed ? (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Subscribe
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-white" />
              <span className="text-sm font-semibold">No spam, ever</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-white" />
              <span className="text-sm font-semibold">Unsubscribe anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-white" />
              <span className="text-sm font-semibold">Exclusive deals only</span>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white mb-2">500+</div>
              <div className="text-sm text-red-100">Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white mb-2">Weekly</div>
              <div className="text-sm text-red-100">Updates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white mb-2">20%</div>
              <div className="text-sm text-red-100">Avg. Savings</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
