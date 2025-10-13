'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TrendingUp, Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';

interface TrendingProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  brand: string;
  trendingRank: number;
  salesIncrease: number;
}

export function TrendingProducts() {
  const [products, setProducts] = useState<TrendingProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockProducts: TrendingProduct[] = [
      {
        id: '5',
        name: 'Gaming Laptop RTX 4070',
        slug: 'gaming-laptop-rtx-4070',
        price: 1899,
        rating: 4.7,
        reviewCount: 67,
        image: '/images/gaming-laptop-1.jpg',
        brand: 'ASUS',
        trendingRank: 1,
        salesIncrease: 45,
      },
      {
        id: '6',
        name: 'Wireless Earbuds Pro',
        slug: 'wireless-earbuds-pro',
        price: 199,
        rating: 4.5,
        reviewCount: 234,
        image: '/images/earbuds-pro-1.jpg',
        brand: 'Sony',
        trendingRank: 2,
        salesIncrease: 38,
      },
      {
        id: '7',
        name: '4K Webcam Ultra',
        slug: '4k-webcam-ultra',
        price: 149,
        rating: 4.6,
        reviewCount: 89,
        image: '/images/webcam-4k-1.jpg',
        brand: 'Logitech',
        trendingRank: 3,
        salesIncrease: 32,
      },
    ];

    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 800);
  }, []);

  const handleAddToCart = (product: TrendingProduct) => {
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
            <div className="h-8 bg-muted rounded w-64 mx-auto mb-4" />
            <div className="h-4 bg-muted rounded w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-video bg-muted rounded-t-lg" />
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
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="h-8 w-8 text-sg-red mr-3" />
            <h2 className="text-3xl font-heading font-bold">Trending Now</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hot products that everyone's talking about. Don't miss out on these popular items!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
              {/* Trending Badge */}
              <div className="absolute top-3 left-3 z-10">
                <Badge className="bg-sg-red text-white">
                  #{product.trendingRank} Trending
                </Badge>
              </div>

              {/* Sales Increase Badge */}
              <div className="absolute top-3 right-3 z-10">
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                  +{product.salesIncrease}% sales
                </Badge>
              </div>

              <div className="relative aspect-video overflow-hidden rounded-t-lg bg-muted">
                {/* Placeholder for product image */}
                <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-sg-red/10 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-sg-red/50" />
                    </div>
                    <p className="text-sm text-muted-foreground">{product.brand}</p>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {product.brand}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-muted-foreground">
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-sg-red transition-colors">
                    <Link href={`/products/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-sg-red">
                      {formatCurrency(product.price)}
                    </span>
                    <div className="flex items-center text-green-600 text-sm font-medium">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Hot
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-4" 
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/trending">
              View All Trending Products
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
