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
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4">
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
            <Link href="/admin" className="hover:text-blue-200 transition-colors font-medium">
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
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-14 h-14 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/logo.svg"
                  alt="Sui Generis Technologies"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="hidden lg:block">
                <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  SUI GENERIS
                </div>
                <div className="text-xs text-gray-600 font-medium">Technologies</div>
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
                    className="px-4 py-2 text-gray-700 hover:text-blue-600 font-semibold transition-colors flex items-center gap-1 group"
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
              <button className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg">
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
                        className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl font-semibold transition-all"
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
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-md font-semibold">
                  <User className="h-5 w-5" />
                  <span>My Account</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
