'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  brand: string;
  category: string;
  inStock: boolean;
  featured: boolean;
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'MacBook Pro 14" M3',
        slug: 'macbook-pro-14-m3',
        price: 2199,
        compareAtPrice: 2399,
        rating: 4.8,
        reviewCount: 124,
        image: '/images/macbook-pro-14-m3-1.jpg',
        brand: 'Apple',
        category: 'Laptops',
        inStock: true,
        featured: true,
      },
      {
        id: '2',
        name: 'Dell XPS 13',
        slug: 'dell-xps-13',
        price: 1499,
        rating: 4.6,
        reviewCount: 89,
        image: '/images/dell-xps-13-1.jpg',
        brand: 'Dell',
        category: 'Laptops',
        inStock: true,
        featured: true,
      },
      {
        id: '3',
        name: 'iPhone 15 Pro',
        slug: 'iphone-15-pro',
        price: 999,
        rating: 4.9,
        reviewCount: 256,
        image: '/images/iphone-15-pro-1.jpg',
        brand: 'Apple',
        category: 'Phones',
        inStock: true,
        featured: true,
      },
      {
        id: '4',
        name: 'Samsung Galaxy S24',
        slug: 'samsung-galaxy-s24',
        price: 799,
        compareAtPrice: 899,
        rating: 4.7,
        reviewCount: 178,
        image: '/images/samsung-galaxy-s24-1.jpg',
        brand: 'Samsung',
        category: 'Phones',
        inStock: true,
        featured: true,
      },
    ];

    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of premium electronics
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-square bg-muted rounded-t-lg" />
                <CardContent className="p-4 space-y-2">
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium electronics, carefully chosen for their quality, performance, and value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
              <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
                {/* Placeholder for product image */}
                <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <Eye className="h-8 w-8 text-primary/50" />
                    </div>
                    <p className="text-sm text-muted-foreground">{product.brand}</p>
                  </div>
                </div>
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.featured && (
                    <Badge variant="secondary" className="bg-sg-red text-white">
                      Featured
                    </Badge>
                  )}
                  {product.compareAtPrice && (
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      Sale
                    </Badge>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="secondary" asChild>
                    <Link href={`/products/${product.slug}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-muted-foreground">
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold line-clamp-2 group-hover:text-sg-red transition-colors">
                    <Link href={`/products/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h3>
                  
                  <p className="text-sm text-muted-foreground">{product.brand}</p>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-sg-red">
                      {formatCurrency(product.price)}
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatCurrency(product.compareAtPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button 
                  className="w-full" 
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/products">
              View All Products
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
