import Link from 'next/link';
import { ArrowRight, Zap, Shield, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-sg-navy via-sg-navy/95 to-sg-navy/90 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>
      
      <div className="container mx-auto px-4 py-20 lg:py-32 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-heading font-bold leading-tight">
                Premium Electronics
                <span className="block text-sg-aqua">Redefined</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                Discover cutting-edge laptops, smartphones, and accessories from top brands. 
                Quality guaranteed, prices unmatched.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-sg-red hover:bg-sg-red/90">
                <Link href="/category/laptops">
                  Shop Laptops
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-sg-aqua text-sg-aqua hover:bg-sg-aqua hover:text-sg-navy">
                <Link href="/configurator">
                  Build Your PC
                </Link>
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-sg-aqua/20 rounded-lg">
                  <Zap className="h-5 w-5 text-sg-aqua" />
                </div>
                <div>
                  <h3 className="font-semibold">Fast Delivery</h3>
                  <p className="text-sm text-gray-400">Same day in Harare</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-sg-aqua/20 rounded-lg">
                  <Shield className="h-5 w-5 text-sg-aqua" />
                </div>
                <div>
                  <h3 className="font-semibold">2 Year Warranty</h3>
                  <p className="text-sm text-gray-400">On all products</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-sg-aqua/20 rounded-lg">
                  <Truck className="h-5 w-5 text-sg-aqua" />
                </div>
                <div>
                  <h3 className="font-semibold">Free Shipping</h3>
                  <p className="text-sm text-gray-400">Orders over $100</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image/Visual */}
          <div className="relative">
            <div className="relative z-10">
              {/* Placeholder for hero image - replace with actual product images */}
              <div className="aspect-square bg-gradient-to-br from-sg-aqua/20 to-sg-red/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                <div className="w-full h-full bg-white/5 rounded-xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-sg-aqua/30 rounded-full mx-auto flex items-center justify-center">
                      <Zap className="h-12 w-12 text-sg-aqua" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Latest Tech</h3>
                      <p className="text-gray-300">Premium Quality</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-sg-red/20 rounded-full blur-xl" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-sg-aqua/20 rounded-full blur-xl" />
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 fill-background">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </section>
  );
}
