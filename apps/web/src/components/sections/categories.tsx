import Link from 'next/link';
import { Laptop, Smartphone, Printer, Headphones, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const categories = [
  {
    name: 'Laptops',
    slug: 'laptops',
    description: 'Premium laptops for work and gaming',
    icon: Laptop,
    color: 'from-blue-500 to-blue-600',
    count: '150+ Products',
  },
  {
    name: 'Smartphones',
    slug: 'phones',
    description: 'Latest smartphones and accessories',
    icon: Smartphone,
    color: 'from-green-500 to-green-600',
    count: '200+ Products',
  },
  {
    name: 'Printers',
    slug: 'printers',
    description: 'Professional printing solutions',
    icon: Printer,
    color: 'from-purple-500 to-purple-600',
    count: '80+ Products',
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Essential tech accessories',
    icon: Headphones,
    color: 'from-orange-500 to-orange-600',
    count: '300+ Products',
  },
];

export function Categories() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive range of electronics across different categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.slug} href={`/category/${category.slug}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-sg-red transition-colors">
                      {category.name}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-3">
                      {category.description}
                    </p>
                    
                    <p className="text-xs font-medium text-sg-aqua mb-4">
                      {category.count}
                    </p>
                    
                    <div className="flex items-center justify-center text-sm font-medium text-sg-red group-hover:text-sg-red/80 transition-colors">
                      Shop Now
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/categories">
              View All Categories
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
