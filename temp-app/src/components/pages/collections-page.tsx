import Link from 'next/link';
import { ArrowRight, Package, TrendingUp } from 'lucide-react';

const collections = [
  {
    id: 1,
    name: 'Tech Essentials',
    description: 'Must-have gadgets for the modern lifestyle',
    image: '/api/placeholder/400/300',
    productCount: 24,
    featured: true,
    color: 'from-blue-500 to-purple-600'
  },
  {
    id: 2,
    name: 'Audio Collection',
    description: 'Premium sound experience for audiophiles',
    image: '/api/placeholder/400/300',
    productCount: 18,
    featured: true,
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 3,
    name: 'Fitness & Wellness',
    description: 'Stay active and healthy with our fitness gear',
    image: '/api/placeholder/400/300',
    productCount: 32,
    featured: false,
    color: 'from-green-500 to-teal-600'
  },
  {
    id: 4,
    name: 'Home Office',
    description: 'Create the perfect workspace at home',
    image: '/api/placeholder/400/300',
    productCount: 28,
    featured: false,
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 5,
    name: 'Gaming Setup',
    description: 'Level up your gaming experience',
    image: '/api/placeholder/400/300',
    productCount: 21,
    featured: true,
    color: 'from-indigo-500 to-blue-600'
  },
  {
    id: 6,
    name: 'Travel Essentials',
    description: 'Everything you need for your next adventure',
    image: '/api/placeholder/400/300',
    productCount: 15,
    featured: false,
    color: 'from-teal-500 to-green-600'
  }
];

export function CollectionsPage() {
  const featuredCollections = collections.filter(c => c.featured);
  const allCollections = collections;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-sg-navy via-sg-gray-800 to-sg-black text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
            Our Collections
          </h1>
          <p className="text-xl text-sg-gray-200 mb-8 max-w-2xl mx-auto">
            Discover curated collections of premium products designed for every lifestyle and need.
          </p>
        </div>
      </div>

      {/* Featured Collections */}
      <section className="py-16 bg-sg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-sg-black mb-4">
                Featured Collections
              </h2>
              <p className="text-lg text-sg-gray-600">
                Our most popular and trending collections
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-sg-red" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCollections.map((collection) => (
              <Link key={collection.id} href={`/collections/${collection.id}`}>
                <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-64">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${collection.color} opacity-80`}></div>
                    <div className="absolute top-4 right-4 bg-sg-aqua text-sg-navy px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-sg-aqua transition-colors">
                      {collection.name}
                    </h3>
                    <p className="text-sm opacity-90 mb-3">
                      {collection.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">
                        <Package className="inline h-4 w-4 mr-1" />
                        {collection.productCount} products
                      </span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Collections */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-sg-black mb-12 text-center">
            All Collections
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {allCollections.map((collection) => (
              <Link key={collection.id} href={`/collections/${collection.id}`}>
                <div className="group flex bg-white border border-sg-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="w-1/3 relative">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {collection.featured && (
                      <div className="absolute top-2 left-2 bg-sg-red text-white px-2 py-1 rounded text-xs font-semibold">
                        Featured
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-sg-black mb-2 group-hover:text-sg-red transition-colors">
                        {collection.name}
                      </h3>
                      <p className="text-sg-gray-600 mb-4">
                        {collection.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-sg-gray-500">
                        <Package className="inline h-4 w-4 mr-1" />
                        {collection.productCount} products
                      </span>
                      <div className="flex items-center text-sg-navy group-hover:text-sg-red transition-colors">
                        <span className="text-sm font-medium mr-2">Explore</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-sg-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-heading mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-lg text-sg-gray-200 mb-8 max-w-2xl mx-auto">
            Browse our complete product catalog or get in touch with our team for personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3 bg-sg-aqua hover:bg-sg-aqua/90 text-sg-navy font-semibold rounded-lg transition-colors"
            >
              Browse All Products
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-sg-navy font-semibold rounded-lg transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
