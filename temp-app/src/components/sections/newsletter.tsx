'use client';

import { useState } from 'react';
import { Send, CheckCircle, Mail, Gift, Zap, Shield, Sparkles } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-900 via-gray-900 to-red-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Decorative Elements */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-red-600/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-red-600/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <div className="text-center mb-10">
            {/* Icon Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
              <Gift className="w-4 h-4 text-red-400" />
              <span className="text-sm font-semibold text-white">Exclusive Offers</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto">
              Subscribe to get <span className="font-semibold text-white">exclusive deals</span>, early access to new products, and tech tips.
            </p>
          </div>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-10">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-xl text-gray-900 placeholder-gray-500 font-medium focus:outline-none focus:ring-4 focus:ring-red-500/30 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={subscribed}
                className={`px-6 sm:px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center whitespace-nowrap ${subscribed
                    ? 'bg-green-500 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
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
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-gray-300 mb-10">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm">No spam, ever</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm">Exclusive deals only</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm">Unsubscribe anytime</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-md mx-auto">
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-white mb-1">500+</div>
              <div className="text-xs sm:text-sm text-gray-400">Subscribers</div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-white mb-1">Weekly</div>
              <div className="text-xs sm:text-sm text-gray-400">Updates</div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-white mb-1">20%</div>
              <div className="text-xs sm:text-sm text-gray-400">Avg. Savings</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
