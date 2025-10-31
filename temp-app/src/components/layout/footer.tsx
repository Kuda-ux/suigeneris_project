import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Send, ArrowRight, Clock } from 'lucide-react';

const footerLinks = {
  quickLinks: [
    { name: 'Shop Products', href: '/products' },
    { name: 'Civil Servants Loan', href: '/loan-applicat' },
    { name: 'Contact Us', href: '/contact' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-black text-white border-t border-gray-800">
      {/* Newsletter Section */}
      <div className="border-b border-gray-700">
        <div className="container mx-auto px-4 py-8 sm:py-10 md:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            {/* Newsletter Text */}
            <div className="text-center lg:text-left w-full lg:w-auto">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                Stay Updated!
              </h3>
              <p className="text-gray-400 text-sm sm:text-base">
                Subscribe to get special offers, free giveaways, and updates.
              </p>
            </div>
            
            {/* Newsletter Form */}
            <div className="w-full lg:w-auto lg:flex-1 lg:max-w-xl">
              <form className="flex flex-col sm:flex-row gap-3 sm:gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full sm:flex-1 px-4 py-3 sm:py-3.5 bg-gray-900 border-2 border-gray-800 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none text-white placeholder-gray-500 text-sm sm:text-base"
                  required
                />
                <button 
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 sm:py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap"
                >
                  <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">Subscribe</span>
                  <span className="sm:hidden">Subscribe Now</span>
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-2 text-center sm:text-left">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Logo and Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6 group">
              <div className="relative w-14 h-14 md:w-16 md:h-16 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/logo.svg"
                  alt="Sui Generis Technologies"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="text-lg md:text-xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                  SUI GENERIS
                </div>
                <div className="text-xs md:text-sm text-gray-400 font-medium">Technologies</div>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm md:text-base">
              Your trusted partner for premium technology solutions in Zimbabwe. 
              We deliver quality laptops, desktops, and accessories with exceptional service.
            </p>
            
            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              <a 
                href="https://www.facebook.com/profile.php?id=61571109901731" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="p-3 bg-gray-900 hover:bg-red-600 rounded-xl transition-all hover:scale-110 hover:shadow-lg"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://wa.me/263784116938" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact us on WhatsApp"
                className="p-3 bg-gray-900 hover:bg-green-600 rounded-xl transition-all hover:scale-110 hover:shadow-lg"
              >
                <Phone className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="p-3 bg-gray-900 hover:bg-red-600 rounded-xl transition-all hover:scale-110 hover:shadow-lg"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base md:text-lg font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2 group font-medium text-sm md:text-base"
                  >
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all -ml-6 group-hover:ml-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-base md:text-lg font-bold mb-4 text-white">Business Hours</h3>
            <ul className="space-y-3 text-sm md:text-base">
              <li className="flex items-start gap-3 text-gray-400">
                <Clock className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Mon - Fri</p>
                  <p>8:00 AM - 6:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Clock className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Saturday</p>
                  <p>9:00 AM - 4:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Clock className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Sunday</p>
                  <p>Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 md:p-6 rounded-2xl border border-gray-700 hover:border-red-500 transition-all hover:shadow-xl hover:shadow-red-500/20">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="p-2.5 md:p-3 bg-red-600 rounded-xl flex-shrink-0">
                <Phone className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-white mb-1 text-sm md:text-base">Call Us</h4>
                <a href="tel:+263784116938" className="text-gray-400 hover:text-red-400 transition-colors font-medium text-sm md:text-base break-all">
                  +263 78 411 6938
                </a>
                <p className="text-xs md:text-sm text-gray-500 mt-2">Mon-Sat: 8AM-6PM</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 md:p-6 rounded-2xl border border-gray-700 hover:border-red-500 transition-all hover:shadow-xl hover:shadow-red-500/20">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="p-2.5 md:p-3 bg-red-600 rounded-xl flex-shrink-0">
                <Mail className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-white mb-1 text-sm md:text-base">Email Us</h4>
                <a href="mailto:info@suigeneriszim.co.zw" className="text-gray-400 hover:text-red-400 transition-colors font-medium text-sm md:text-base break-all">
                  info@suigeneriszim.co.zw
                </a>
                <p className="text-xs md:text-sm text-gray-500 mt-2">Quick Response</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 md:p-6 rounded-2xl border border-gray-700 hover:border-red-500 transition-all hover:shadow-xl hover:shadow-red-500/20 sm:col-span-2 lg:col-span-1">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="p-2.5 md:p-3 bg-red-600 rounded-xl flex-shrink-0">
                <MapPin className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-white mb-1 text-sm md:text-base">Visit Us</h4>
                <p className="text-gray-400 font-medium leading-relaxed text-sm md:text-base">
                  109 Leopold Takawira St<br />
                  Harare, Zimbabwe
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-center md:text-left text-sm md:text-base">
              © {new Date().getFullYear()} <span className="font-bold text-white">Sui Generis Technologies</span>. All rights reserved.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs md:text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <span className="text-red-500">🇿🇼</span>
                Made with ❤️ in Zimbabwe
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
