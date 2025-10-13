import { Hero } from '@/components/sections/hero';
import { FeaturedProducts } from '@/components/sections/featured-products';
import { Categories } from '@/components/sections/categories';
import { TrendingProducts } from '@/components/sections/trending-products';
import { LowStockAlert } from '@/components/sections/low-stock-alert';
import { Newsletter } from '@/components/sections/newsletter';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <LowStockAlert />
        <FeaturedProducts />
        <Categories />
        <TrendingProducts />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
