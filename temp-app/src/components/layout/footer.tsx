import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/products' },
    { name: 'Collections', href: '/collections' },
    { name: 'Trending', href: '/trending' },
    { name: 'New Arrivals', href: '/products?filter=new' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Blog', href: '/blog' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Accessibility', href: '/accessibility' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-sg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="relative w-16 h-16">
                <Image
                  src="/logo.svg"
                  alt="Sui Generis Technologies"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-sg-gray-300 mb-6 leading-relaxed">
              Sui Generis Technologies delivers premium products that combine innovation, 
              quality, and style. Discover unique solutions for your modern lifestyle.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-sg-gray-400 hover:text-sg-aqua transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-sg-gray-400 hover:text-sg-aqua transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-sg-gray-400 hover:text-sg-aqua transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-sg-gray-400 hover:text-sg-aqua transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sg-gray-300 hover:text-sg-aqua transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sg-gray-300 hover:text-sg-aqua transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sg-gray-300 hover:text-sg-aqua transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sg-gray-300 hover:text-sg-aqua transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-sg-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-sg-aqua" />
              <span className="text-sg-gray-300">support@suigeneris.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-sg-aqua" />
              <span className="text-sg-gray-300">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-sg-aqua" />
              <span className="text-sg-gray-300">San Francisco, CA</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-sg-gray-800 pt-8 text-center">
          <p className="text-sg-gray-400">
            © {new Date().getFullYear()} Sui Generis Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
