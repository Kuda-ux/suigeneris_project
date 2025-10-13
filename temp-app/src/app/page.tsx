import { HeroSection } from '@/components/sections/hero-section';
import { FeaturedProducts } from '@/components/sections/featured-products';
import { CategoriesSection } from '@/components/sections/categories';
import { TrendingProducts } from '@/components/sections/trending-products';
import { NewsletterSection } from '@/components/sections/newsletter';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedProducts />
      <CategoriesSection />
      <TrendingProducts />
      <NewsletterSection />
    </main>
  );
}
