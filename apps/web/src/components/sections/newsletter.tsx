'use client';

import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    setStatus('loading');
    
    try {
      // Mock API call - replace with actual newsletter signup
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate success
      setStatus('success');
      setMessage('Thank you for subscribing! Check your email for confirmation.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="py-16 bg-sg-navy text-white">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-8 md:p-12">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center">
                <div className="p-4 bg-sg-aqua/20 rounded-full">
                  <Mail className="h-8 w-8 text-sg-aqua" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-3xl font-heading font-bold">
                  Stay Updated with Latest Tech
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Subscribe to our newsletter and be the first to know about new arrivals, 
                  exclusive deals, and tech insights. Plus, get 10% off your first order!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    disabled={status === 'loading'}
                  />
                  <Button
                    type="submit"
                    disabled={status === 'loading'}
                    className="bg-sg-red hover:bg-sg-red/90 text-white px-8"
                  >
                    {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </div>

                {status === 'success' && (
                  <div className="flex items-center justify-center space-x-2 text-green-400">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm">{message}</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="flex items-center justify-center space-x-2 text-red-400">
                    <AlertCircle className="h-5 w-5" />
                    <span className="text-sm">{message}</span>
                  </div>
                )}
              </form>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/20">
                <div className="text-center">
                  <h4 className="font-semibold mb-2">Exclusive Deals</h4>
                  <p className="text-sm text-gray-300">
                    Get access to subscriber-only discounts and flash sales
                  </p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold mb-2">New Arrivals</h4>
                  <p className="text-sm text-gray-300">
                    Be first to know about the latest tech products
                  </p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold mb-2">Tech Tips</h4>
                  <p className="text-sm text-gray-300">
                    Expert advice and product recommendations
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-400">
                By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
