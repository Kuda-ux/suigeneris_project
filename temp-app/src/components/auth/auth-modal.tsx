'use client';

import { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, Chrome, Shield, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import Image from 'next/image';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  });

  if (!isOpen) return null;

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      
      if (mode === 'signin') {
        await signInWithEmail(formData.email, formData.password);
      } else {
        await signUpWithEmail(formData.email, formData.password, formData.fullName);
      }
      
      onClose();
    } catch (err: any) {
      setError(err.message || `Failed to ${mode === 'signin' ? 'sign in' : 'sign up'}`);
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-red-600 to-purple-600 p-8 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-all"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-16 h-16">
              <Image
                src="/logo.svg"
                alt="Sui Generis"
                fill
                className="object-contain"
              />
            </div>
          </div>
          
          <h2 className="text-3xl font-black text-center mb-2">
            {mode === 'signin' ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p className="text-center text-red-100 font-medium">
            {mode === 'signin' 
              ? 'Sign in to access your account' 
              : 'Join Sui Generis and start shopping'
            }
          </p>
        </div>

        {/* Body */}
        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Email/Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Full Name *</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none font-medium"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Email *</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none font-medium"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Password *</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none font-medium"
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white rounded-xl font-black text-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait...' : (mode === 'signin' ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-600 font-bold">OR</span>
            </div>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            type="button"
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border-2 border-gray-300 hover:border-red-500 rounded-xl font-bold text-gray-900 transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <Chrome className="h-5 w-5 text-red-600 group-hover:scale-110 transition-transform" />
            <span>Continue with Google</span>
          </button>

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">
              {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            </span>
            <button
              type="button"
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="text-sm font-black text-red-600 hover:text-red-700 transition-colors"
            >
              {mode === 'signin' ? 'Sign Up' : 'Sign In'}
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-gray-500">
            By signing in, you agree to our{' '}
            <a href="#" className="text-red-600 hover:underline font-semibold">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-red-600 hover:underline font-semibold">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
