'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingCart, User, Menu, X, Heart, ChevronDown, Phone, MapPin } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';

const navigation = [
  { name: 'Home', href: '/' },
  { 
    name: 'Products', 
    href: '/products',
    submenu: [
      { name: 'All Products', href: '/products' },
      { name: 'Laptops', href: '/products?category=Laptops' },
      { name: 'Desktops', href: '/products?category=Desktops' },
      { name: 'Smartphones', href: '/products?category=Smartphones' },
    ]
  },
  { name: 'Categories', href: '/categories' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2 px-4">
        <div className="container mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5" />
              <span className="font-medium">+263 78 411 6938</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              <span>109 Leopold Takawira St, Harare, Zimbabwe</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="hover:text-red-200 transition-colors font-medium">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header 
        className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'shadow-lg border-b-2 border-blue-100' : 'shadow-sm border-b border-gray-200'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-24 lg:h-28">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="relative w-20 h-20 lg:w-24 lg:h-24 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/logo.svg"
                  alt="Sui Generis Technologies"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.submenu && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="px-4 py-2 text-black hover:text-red-600 font-black transition-colors flex items-center gap-1 group uppercase"
                  >
                    {item.name}
                    {item.submenu && (
                      <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                    )}
                  </Link>
                  
                  {/* Dropdown Menu */}
                  {item.submenu && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-2xl border-2 border-gray-100 py-2 animate-in fade-in slide-in-from-top-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {/* Search - Mobile */}
              <button className="lg:hidden p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
                <Search className="h-5 w-5" />
              </button>

              {/* Wishlist */}
              <button className="p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all relative group">
                <Heart className="h-5 w-5 group-hover:fill-current" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg">
                  0
                </span>
              </button>

              {/* Cart */}
              <Link 
                href="/cart" 
                className="p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all relative group"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* User Account */}
              <button 
                onClick={() => setShowAuthModal(true)}
                className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg"
              >
                <User className="h-5 w-5" />
                <span className="font-semibold">Account</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t-2 border-gray-100 py-4 animate-in slide-in-from-top">
              <div className="space-y-4">
                {/* Mobile Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  />
                </div>

                {/* Mobile Navigation */}
                <nav className="space-y-1">
                  {navigation.map((item) => (
                    <div key={item.name}>
                      <Link
                        href={item.href}
                        className="block px-4 py-3 text-black hover:text-red-600 hover:bg-red-50 rounded-xl font-black transition-all uppercase"
                        onClick={() => !item.submenu && setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                      {item.submenu && (
                        <div className="ml-4 mt-1 space-y-1">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Mobile Account Button */}
                <button 
                  onClick={() => {
                    setShowAuthModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-md font-semibold"
                >
                  <User className="h-5 w-5" />
                  <span>My Account</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Premium Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white relative">
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-all"
              >
                <X className="h-5 w-5" />
              </button>
              <h2 className="text-2xl font-bold mb-1">
                {authMode === 'signin' ? 'Welcome Back!' : 'Create Account'}
              </h2>
              <p className="text-red-100 text-sm">
                {authMode === 'signin' ? 'Sign in to your account' : 'Join Sui Generis Technologies'}
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Sign in functionality will be connected to your authentication system!'); }}>
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none"
                    placeholder="••••••••"
                  />
                </div>

                {authMode === 'signin' && (
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500" />
                      <span className="text-gray-600">Remember me</span>
                    </label>
                    <button type="button" className="text-red-600 hover:text-red-700 font-semibold">
                      Forgot password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-xl"
                >
                  {authMode === 'signin' ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-semibold">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-semibold">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
              </div>

              {/* Toggle Auth Mode */}
              <div className="mt-6 text-center text-sm">
                <span className="text-gray-600">
                  {authMode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
                </span>
                <button
                  type="button"
                  onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                  className="text-red-600 hover:text-red-700 font-bold"
                >
                  {authMode === 'signin' ? 'Sign Up' : 'Sign In'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
