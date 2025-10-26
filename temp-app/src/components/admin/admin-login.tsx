'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Shield, Eye, EyeOff, Lock, User, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!supabase) {
      alert('Authentication is not configured on this deployment. Please contact the site administrator.');
      setIsLoading(false);
      return;
    }

    try {
      // Sign in with Supabase (email + password)
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        // Supabase error (invalid credentials, etc.)
        console.error('Sign in error:', signInError);
        alert(signInError.message || 'Login failed. Check your credentials.');
        setIsLoading(false);
        return;
      }

      const sessionUser = signInData.user;
      if (!sessionUser || !sessionUser.email) {
        alert('Login succeeded but user information was not returned. Contact administrator.');
        setIsLoading(false);
        return;
      }

      // Verify admin status in public.users table
      const { data: userRow, error: userRowError } = await supabase
        .from('users')
        .select('is_admin')
        .eq('email', sessionUser.email)
        .single();

      if (userRowError) {
        console.error('Error reading users table:', userRowError);
        alert('Logged in but could not verify admin status. Ask the site owner to mark your account as admin.');
        setIsLoading(false);
        return;
      }

      if (userRow && userRow.is_admin) {
        // Mark frontend session / allow access to admin dashboard
        localStorage.setItem('adminAuth', 'true');
        router.push('/admin/dashboard');
      } else {
        alert('Your account is not marked as an admin. Ask the site owner to run the SQL to grant admin rights.');
      }
    } catch (err) {
      console.error('Unexpected login error:', err);
      alert('An unexpected error occurred during login. Check the browser console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-3xl shadow-2xl border-4 border-gray-100 overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          <div className="relative">
            <div className="bg-white rounded-2xl w-24 h-24 mx-auto mb-4 flex items-center justify-center shadow-xl">
              <img
                src="/logo.svg"
                alt="Sui Generis Technologies"
                className="w-20 h-20 object-contain"
              />
            </div>
            <h1 className="text-3xl font-black text-white mb-2">Admin Portal</h1>
            <p className="text-red-100 font-semibold">Sui Generis Technologies</p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <Shield className="w-4 h-4 text-white" />
              <span className="text-xs text-white font-bold">Secure Access</span>
            </div>
          </div>
        </div>

        <div className="p-8">

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-black text-gray-900 mb-2 uppercase">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-50 rounded-lg p-2">
                  <User className="h-5 w-5 text-red-600" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-16 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-600 transition-all font-semibold text-gray-900"
                  placeholder="admin@suigeneris.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-black text-gray-900 mb-2 uppercase">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-50 rounded-lg p-2">
                  <Lock className="h-5 w-5 text-red-600" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-16 pr-14 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-600 transition-all font-semibold text-gray-900"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-5 px-6 rounded-2xl font-black text-lg transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Shield className="h-6 w-6" />
                  <span>Sign In Securely</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          {/* Security Features */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 border-2 border-green-200">
              <CheckCircle className="h-5 w-5 text-green-600 mb-1" />
              <p className="text-xs font-bold text-green-800">SSL Encrypted</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 border-2 border-blue-200">
              <Shield className="h-5 w-5 text-blue-600 mb-1" />
              <p className="text-xs font-bold text-blue-800">2FA Protected</p>
            </div>
          </div>

          {/* Demo Credentials (informational only) */}
          <div className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-black text-yellow-900 mb-2">Demo Credentials (for testing)</p>
                <div className="space-y-1 text-xs">
                  <p className="text-yellow-800"><span className="font-bold">Email:</span> admin@suigeneris.com</p>
                  <p className="text-yellow-800"><span className="font-bold">Password:</span> admin123</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              © 2024 Sui Generis Technologies. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
