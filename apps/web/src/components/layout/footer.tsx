import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-sg-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-heading font-bold text-sg-red">
              SUI GENERIS
            </h3>
            <p className="text-gray-300 text-sm">
              Your trusted source for premium electronics and accessories in Zimbabwe. 
              Quality products, expert service, and unbeatable prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-sg-aqua transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-sg-aqua transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-sg-aqua transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/category/laptops" className="text-gray-300 hover:text-sg-aqua transition-colors">
                  Laptops
                </Link>
              </li>
              <li>
                <Link href="/category/phones" className="text-gray-300 hover:text-sg-aqua transition-colors">
                  Phones
                </Link>
              </li>
              <li>
                <Link href="/category/printers" className="text-gray-300 hover:text-sg-aqua transition-colors">
                  Printers
                </Link>
              </li>
              <li>
                <Link href="/category/accessories" className="text-gray-300 hover:text-sg-aqua transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/configurator" className="text-gray-300 hover:text-sg-aqua transition-colors">
                  PC Configurator
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/support" className="text-gray-300 hover:text-sg-aqua transition-colors">
                  Support Center
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-gray-300 hover:text-sg-aqua transition-colors">
                  Warranty Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-sg-aqua transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-sg-aqua transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-sg-aqua transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-sg-aqua" />
                <span className="text-gray-300">
                  123 Main Street<br />
                  Harare, Zimbabwe
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-sg-aqua" />
                <span className="text-gray-300">+263-4-123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-sg-aqua" />
                <span className="text-gray-300">info@suigeneris.store</span>
              </div>
            </div>
            
            <div className="pt-4">
              <h5 className="font-semibold mb-2">Business Hours</h5>
              <div className="text-sm text-gray-300 space-y-1">
                <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2024 Sui Generis Store. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-sg-aqua transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-sg-aqua transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-sg-aqua transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
