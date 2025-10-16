import Link from 'next/link';
import { ArrowRight, Star, Package, TrendingUp, Award, Zap } from 'lucide-react';
import { categories as realCategories } from '@/data/products';

const categories = [
  {
    id: 'laptops',
    name: 'Laptops',
    icon: '💻',
    description: 'Professional and personal laptops',
    subtitle: 'HP, Dell, Lenovo, Toshiba & more',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop&crop=center&q=80',
    productCount: realCategories.find(c => c.id === 'laptops')?.count || 67,
    gradient: 'from-red-600 to-red-700'
  },
  {
    id: 'desktops',
    name: 'Desktops',
    icon: '🖥️',
    description: 'Desktop computers and workstations',
    subtitle: 'Reliable performance guaranteed',
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600&h=400&fit=crop&crop=center&q=80',
    productCount: realCategories.find(c => c.id === 'desktops')?.count || 20,
    gradient: 'from-gray-700 to-gray-800'
  },
  {
    id: 'smartphones',
    name: 'Smartphones',
    icon: '📱',
    description: 'Latest smartphones',
    subtitle: 'Samsung and Xiaomi',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=400&fit=crop&crop=center&q=80',
    productCount: realCategories.find(c => c.id === 'smartphones')?.count || 11,
    gradient: 'from-red-600 to-red-700'
  },
  {
    id: 'printers',
    name: 'Printers',
    icon: '🖨️',
    description: 'All-in-one printers',
    subtitle: 'For home and office',
    image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&h=400&fit=crop&crop=center&q=80',
    productCount: realCategories.find(c => c.id === 'printers')?.count || 1,
    gradient: 'from-gray-600 to-gray-700'
  },
  {
    id: 'monitors',
    name: 'Monitors & AIOs',
    icon: '🖥️',
    description: 'Professional displays',
    subtitle: 'All-in-One computers',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=400&fit=crop&crop=center&q=80',
    productCount: realCategories.find(c => c.id === 'monitors')?.count || 9,
    gradient: 'from-red-500 to-red-600'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    icon: '⌨️',
    description: 'Tech accessories & peripherals',
    subtitle: 'Complete your setup',
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=600&h=400&fit=crop&crop=center&q=80',
    productCount: 15,
    gradient: 'from-gray-700 to-gray-800'
  }
];

export function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Premium Hero Header */}
      <div className="relative bg-gradient-to-r from-red-600 to-red-700 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-2 mb-6">
            <Package className="w-5 h-5 text-white" />
            <span className="text-sm font-bold text-white">Browse Categories</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            Shop by Category
          </h1>
          <p className="text-lg md:text-xl text-red-100 max-w-3xl mx-auto leading-relaxed">
            Discover premium products across our curated categories, each featuring <span className="font-bold text-white">certified quality</span> and warranty protection.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-gray-100 hover:border-red-200"
            >
              {/* Background Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-70 group-hover:opacity-60 transition-opacity duration-300`}></div>
                
                {/* Icon Badge */}
                <div className="absolute top-6 left-6 text-6xl drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>

                {/* Count Badge */}
                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/30">
                  <span className="text-white text-sm font-bold">{category.productCount} items</span>
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
                <p className="text-sm text-gray-500 mb-6">
                  {category.subtitle}
                </p>

                {/* CTA */}
                <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-sm font-bold text-gray-700">Premium Quality</span>
                  </div>
                  <div className="flex items-center text-red-600 group-hover:text-red-700 transition-colors font-bold">
                    <span className="text-sm mr-1">Explore</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-black bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-2">
                100+
              </div>
              <div className="text-sm font-semibold text-gray-600">Total Products</div>
            </div>
            <div>
              <div className="text-4xl font-black bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-2">
                6
              </div>
              <div className="text-sm font-semibold text-gray-600">Categories</div>
            </div>
            <div>
              <div className="text-4xl font-black bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-2">
                100%
              </div>
              <div className="text-sm font-semibold text-gray-600">Warranty Coverage</div>
            </div>
            <div>
              <div className="text-4xl font-black bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-2">
                4.8★
              </div>
              <div className="text-sm font-semibold text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            <Zap className="w-5 h-5" />
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
}
