'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingCart, User, Menu, X, Heart, ChevronDown, Phone, MapPin, LogOut, UserPlus, Home, Package, Monitor, Settings, Info, Mail } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { useAuth } from '@/contexts/auth-context';
import { AuthModal } from '@/components/auth/auth-modal';
import { UserMenu } from '@/components/auth/user-menu';

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
      { name: 'Monitors', href: '/products?category=Monitors' },
      { name: 'Processors', href: '/products?category=Processors' },
      { name: 'Accessories', href: '/products?category=Accessories' },
    ]
  },
  { name: 'IT Solutions', href: '/it-solutions' },
  { name: 'Categories', href: '/categories' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const { user, userProfile, loading, signOut } = useAuth();

  const getDisplayName = () => {
    if (userProfile?.full_name) return userProfile.full_name;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar - Hidden on mobile for cleaner look */}
      <div className="hidden sm:block bg-gradient-to-r from-red-600 to-red-700 text-white py-2 px-4">
        <div className="container mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+263784116938" className="flex items-center gap-2 hover:text-red-200 transition-colors">
              <Phone className="h-3.5 w-3.5" />
              <span className="font-medium">+263 78 411 6938</span>
            </a>
            <div className="hidden md:flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              <span>109 Leopold Takawira St, Harare, Zimbabwe</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <span className="font-bold">👋 Welcome, {getDisplayName()}!</span>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header 
        className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'shadow-lg border-b-2 border-red-100' : 'shadow-sm border-b border-gray-200'
        }`}
      >
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center group flex-shrink-0">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 transition-transform duration-300 group-hover:scale-105">
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
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Cart - Always visible */}
              <Link 
                href="/cart" 
                className="p-2 sm:p-2.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-all relative touch-manipulation"
              >
                <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-gradient-to-r from-red-600 to-red-700 text-white text-[10px] sm:text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-bold shadow-lg">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Wishlist - Hidden on small mobile */}
              <button className="hidden xs:flex p-2 sm:p-2.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-all relative touch-manipulation">
                <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              {/* User Account - Desktop */}
              {loading ? (
                <div className="hidden lg:flex items-center gap-2 px-4 py-2.5 bg-gray-100 rounded-full">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
                </div>
              ) : user ? (
                <div className="hidden lg:block">
                  <UserMenu />
                </div>
              ) : (
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className="hidden lg:flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg font-semibold"
                >
                  <User className="h-5 w-5" />
                  <span>Sign In</span>
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 sm:p-2.5 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-full transition-all touch-manipulation"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

        </div>

        {/* Mobile Menu - Full Screen Overlay */}
        <div 
          className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${
            mobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
        >
          {/* Backdrop */}
          <div 
            className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div 
            className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out ${
              mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-red-600 to-red-700">
              <span className="text-white font-bold text-lg">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-white hover:bg-white/20 rounded-full transition-colors touch-manipulation"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Menu Content - Scrollable */}
            <div className="h-[calc(100%-64px)] overflow-y-auto">
              {/* User Section */}
              <div className="p-4 border-b border-gray-100">
                {loading ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                  </div>
                ) : user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {getDisplayName().charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 truncate">{getDisplayName()}</p>
                        <p className="text-sm text-gray-500 truncate">{user.email}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        signOut();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-semibold touch-manipulation active:scale-[0.98]"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button 
                      onClick={() => {
                        setShowAuthModal(true);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg font-bold touch-manipulation active:scale-[0.98]"
                    >
                      <User className="h-5 w-5" />
                      <span>Sign In</span>
                    </button>
                    <button 
                      onClick={() => {
                        setShowAuthModal(true);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-red-600 text-red-600 rounded-xl hover:bg-red-50 transition-all font-bold touch-manipulation active:scale-[0.98]"
                    >
                      <UserPlus className="h-5 w-5" />
                      <span>Create Account</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Search */}
              <div className="p-4 border-b border-gray-100">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none text-gray-900"
                  />
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="p-2">
                {navigation.map((item) => {
                  const iconMap: { [key: string]: any } = {
                    'Home': Home,
                    'Products': Package,
                    'IT Solutions': Settings,
                    'Categories': Monitor,
                    'About': Info,
                    'Contact': Mail,
                  };
                  const IconComponent = iconMap[item.name] || Package;
                  
                  return (
                    <div key={item.name}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3.5 text-gray-800 hover:text-red-600 hover:bg-red-50 rounded-xl font-semibold transition-all touch-manipulation active:scale-[0.98]"
                        onClick={() => !item.submenu && setMobileMenuOpen(false)}
                      >
                        <IconComponent className="h-5 w-5 text-gray-500" />
                        {item.name}
                        {item.submenu && (
                          <ChevronDown className="h-4 w-4 ml-auto text-gray-400" />
                        )}
                      </Link>
                      {item.submenu && (
                        <div className="ml-8 mb-2 space-y-1 border-l-2 border-gray-100 pl-4">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-3 py-2.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all text-sm font-medium touch-manipulation"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Quick Contact - Mobile */}
              <div className="p-4 mt-2 border-t border-gray-100">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-3">Quick Contact</p>
                <a 
                  href="tel:+263784116938" 
                  className="flex items-center gap-3 p-3 bg-green-50 text-green-700 rounded-xl font-semibold hover:bg-green-100 transition-colors touch-manipulation"
                >
                  <Phone className="h-5 w-5" />
                  <span>+263 78 411 6938</span>
                </a>
                <div className="flex items-start gap-3 p-3 mt-2 text-gray-600">
                  <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">109 Leopold Takawira St, Harare</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}
