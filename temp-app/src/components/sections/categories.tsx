import Link from 'next/link';
import { ArrowRight, Star, Package, Zap } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: 'Laptops',
    icon: '💻',
    description: 'Professional laptops with warranty',
    subtitle: 'HP, Dell, Lenovo, Toshiba & more',
    href: '/products?category=laptops',
    count: 67,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=400&fit=crop&crop=center&q=80',
    gradient: 'from-red-600 to-red-700'
  },
  {
    id: 2,
    name: 'Desktops',
    icon: '🖥️',
    description: 'Desktop computers and CPU units',
    subtitle: 'Reliable performance guaranteed',
    href: '/products?category=desktops',
    count: 20,
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600&h=400&fit=crop&crop=center&q=80',
    gradient: 'from-gray-700 to-gray-800'
  },
  {
    id: 3,
    name: 'Monitors',
    icon: '🖥️',
    description: 'All-in-One computers & monitors',
    subtitle: 'Professional display solutions',
    href: '/products?category=monitors',
    count: 9,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=400&fit=crop&crop=center&q=80',
    gradient: 'from-red-500 to-red-600'
  },
  {
    id: 4,
    name: 'Printers',
    icon: '🖨️',
    description: 'All-in-One printers',
    subtitle: 'For home and office use',
    href: '/products?category=printers',
    count: 1,
    image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&h=400&fit=crop&crop=center&q=80',
    gradient: 'from-gray-600 to-gray-700'
  },
  {
    id: 5,
    name: 'Smartphones',
    icon: '📱',
    description: 'Samsung and Xiaomi smartphones',
    subtitle: 'Great specs, better prices',
    href: '/products?category=smartphones',
    count: 11,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop&crop=center&q=80',
    gradient: 'from-red-600 to-red-700'
  },
  {
    id: 6,
    name: 'Accessories',
    icon: '⌨️',
    description: 'Tech accessories & peripherals',
    subtitle: 'Complete your setup',
    href: '/products?category=accessories',
    count: 15,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=600&h=400&fit=crop&crop=center&q=80',
    gradient: 'from-gray-700 to-gray-800'
  }
];

export function CategoriesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-50 border-2 border-red-200 rounded-full px-6 py-2 mb-6">
            <Package className="w-5 h-5 text-red-600" />
            <span className="text-sm font-bold text-red-700">Browse Categories</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Shop by Category
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover premium products across our curated categories, each featuring <span className="text-red-600 font-bold">certified quality</span> and warranty protection.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-gray-100 hover:border-red-200"
            >
              {/* Background Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-70 group-hover:opacity-60 transition-opacity duration-300`}></div>
                
                {/* Icon Badge */}
                <div className="absolute top-4 left-4 text-5xl drop-shadow-2xl">
                  {category.icon}
                </div>

                {/* Count Badge */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/30">
                  <span className="text-white text-sm font-bold">{category.count} items</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-black text-gray-900 group-hover:text-red-600 transition-colors duration-300 mb-2">
                  {category.name}
                </h3>
                <p className="text-base font-semibold text-gray-700 mb-1">
                  {category.description}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {category.subtitle}
                </p>

                {/* CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-gray-600">Premium Quality</span>
                  </div>
                  <div className="flex items-center text-red-600 group-hover:text-red-700 transition-colors font-bold">
                    <span className="text-sm mr-1">Explore</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            <Zap className="w-5 h-5" />
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
}
