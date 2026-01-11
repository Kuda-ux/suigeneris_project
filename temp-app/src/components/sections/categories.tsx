import Link from 'next/link';
import { ArrowRight, Star, Package, ChevronRight } from 'lucide-react';

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
  }
];

export function CategoriesSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-red-50/40 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gray-100/50 rounded-full blur-3xl translate-x-1/2" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2 mb-4 shadow-sm">
            <Package className="w-4 h-4 text-red-600" />
            <span className="text-sm font-semibold text-gray-700">Browse Categories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover premium products across our curated categories, each featuring{' '}
            <span className="text-red-600 font-semibold">certified quality</span>.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group relative overflow-hidden bg-white rounded-2xl border border-gray-100 hover:border-red-200 transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              {/* Background Image */}
              <div className="relative h-32 sm:h-40 lg:h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent" />

                {/* Icon Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 text-3xl sm:text-4xl drop-shadow-lg">
                  {category.icon}
                </div>

                {/* Count Badge */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 sm:px-3">
                  <span className="text-gray-900 text-xs sm:text-sm font-bold">{category.count}</span>
                </div>

                {/* Title on Image */}
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 right-3 sm:right-4">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white group-hover:text-red-200 transition-colors">
                    {category.name}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4 lg:p-5">
                <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-1">
                  {category.description}
                </p>

                {/* CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-500">Premium Quality</span>
                  </div>
                  <div className="flex items-center text-red-600 group-hover:text-red-700 transition-colors">
                    <span className="text-xs font-semibold mr-1">Explore</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10 lg:mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            View All Categories
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
