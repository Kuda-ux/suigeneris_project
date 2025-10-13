'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Clock, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';

interface LowStockProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  brand: string;
  stockLevel: number;
  threshold: number;
}

export function LowStockAlert() {
  const [products, setProducts] = useState<LowStockProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockProducts: LowStockProduct[] = [
      {
        id: '8',
        name: 'Premium Wireless Mouse',
        slug: 'premium-wireless-mouse',
        price: 79,
        image: '/images/wireless-mouse-1.jpg',
        brand: 'Logitech',
        stockLevel: 3,
        threshold: 5,
      },
      {
        id: '9',
        name: 'USB-C Hub 7-in-1',
        slug: 'usb-c-hub-7in1',
        price: 49,
        image: '/images/usb-hub-1.jpg',
        brand: 'Anker',
        stockLevel: 2,
        threshold: 5,
      },
    ];

    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 600);
  }, []);

  const handleAddToCart = (product: LowStockProduct) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  if (loading || products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-orange-50 dark:bg-orange-950/20">
      <div className="container mx-auto px-4">
        <Card className="border-orange-200 dark:border-orange-800">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
                <AlertTriangle className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <CardTitle className="text-2xl font-heading text-orange-800 dark:text-orange-200">
              Limited Stock Alert
            </CardTitle>
            <p className="text-orange-600 dark:text-orange-300 mt-2">
              These popular items are running low. Get them before they're gone!
            </p>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-orange-200 dark:border-orange-800"
                >
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="text-center">
                      <Clock className="h-6 w-6 text-orange-500 mx-auto" />
                      <p className="text-xs text-muted-foreground mt-1">{product.brand}</p>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm line-clamp-2">
                      <Link 
                        href={`/products/${product.slug}`}
                        className="hover:text-orange-600 transition-colors"
                      >
                        {product.name}
                      </Link>
                    </h4>
                    <p className="text-sm text-muted-foreground">{product.brand}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="font-bold text-orange-600">
                        {formatCurrency(product.price)}
                      </span>
                      <Badge variant="outline" className="text-xs border-orange-300 text-orange-700">
                        Only {product.stockLevel} left
                      </Badge>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                    className="bg-orange-600 hover:bg-orange-700 text-white flex-shrink-0"
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <Button asChild variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50">
                <Link href="/low-stock">
                  View All Limited Stock Items
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
