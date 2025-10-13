import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { categories as realCategories } from '@/data/products';

const categories = [
  {
    id: 'laptops',
    name: 'Laptops',
    description: 'Professional and personal laptops from top brands',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop&crop=center',
    productCount: realCategories.find(c => c.id === 'laptops')?.count || 0,
    featuredProducts: [
      {
        name: 'HP EliteBook x360',
        price: '$360',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=80&h=80&fit=crop&crop=center'
      },
      {
        name: 'Dell Latitude 5410',
        price: '$320',
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=80&h=80&fit=crop&crop=center'
      }
    ],
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'desktops',
    name: 'Desktops',
    description: 'Desktop computers and workstations',
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=300&fit=crop&crop=center',
    productCount: realCategories.find(c => c.id === 'desktops')?.count || 0,
    featuredProducts: [
      {
        name: 'Dell Inspiron 3668',
        price: '$180',
        image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=80&h=80&fit=crop&crop=center'
      },
      {
        name: 'Dell Vostro 3888',
        price: '$250',
        image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=80&h=80&fit=crop&crop=center'
      }
    ],
    gradient: 'from-green-500 to-teal-500'
  },
  {
    id: 'smartphones',
    name: 'Smartphones',
    description: 'Latest smartphones from Samsung and Xiaomi',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop&crop=center',
    productCount: realCategories.find(c => c.id === 'smartphones')?.count || 0,
    featuredProducts: [
      {
        name: 'Samsung Galaxy A05',
        price: '$100',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=80&h=80&fit=crop&crop=center'
      },
      {
        name: 'Samsung Galaxy A51',
        price: '$120',
        image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=80&h=80&fit=crop&crop=center'
      }
    ],
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 'printers',
    name: 'Printers',
    description: 'All-in-one printers and printing solutions',
    image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=300&fit=crop&crop=center',
    productCount: realCategories.find(c => c.id === 'printers')?.count || 0,
    featuredProducts: [
      {
        name: 'HP DeskJet 2320',
        price: '$50',
        image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=80&h=80&fit=crop&crop=center'
      }
    ],
    gradient: 'from-purple-500 to-pink-500'
  }
];

export function CategoriesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-sg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold font-heading text-sg-black mb-6">
            Shop by Category
          </h1>
          <p className="text-xl text-sg-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover premium products across our curated categories, each featuring the latest innovations and trending items.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Background Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-80 group-hover:opacity-70 transition-opacity duration-300`}></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-white text-sm font-semibold">{category.productCount} items</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-sg-black group-hover:text-sg-red transition-colors duration-300 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sg-gray-600 group-hover:text-sg-gray-700 transition-colors">
                    {category.description}
                  </p>
                </div>

                {/* Featured Products Preview */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex -space-x-2">
                    {category.featuredProducts.map((product, index) => (
                      <div key={index} className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-md"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-sg-gray-500">Starting from</p>
                    <p className="text-lg font-bold text-sg-aqua">
                      {category.featuredProducts[1]?.price || category.featuredProducts[0]?.price}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-sg-gray-600">Premium Quality</span>
                  </div>
                  <div className="flex items-center text-sg-red group-hover:text-sg-aqua transition-colors">
                    <span className="text-sm font-semibold mr-1">Explore</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-sg-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-sg-red to-sg-aqua hover:from-sg-red/90 hover:to-sg-aqua/90 text-white font-bold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            View All Products
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
