import { ProductsPage } from '@/components/pages/products-page';
import { generateProductListSchema, generateCompactProductSchema } from '@/lib/product-schema';
import { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';

const siteUrl = 'https://www.suigeneriszim.co.zw';

// Create Supabase client for server-side data fetching
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const metadata: Metadata = {
  title: 'Buy Laptops Zimbabwe | HP, Dell, Lenovo | Best Prices Harare | Sui Generis',
  description: 'Buy laptops in Zimbabwe at the best prices! HP, Dell, Lenovo, ThinkPad laptops in Harare. Brand new & certified refurbished. Free warranty. Civil servant financing available. Shop now for laptops, desktops, monitors, smartphones.',
  keywords: [
    // Primary Product Keywords
    'buy laptop Zimbabwe',
    'laptops Harare',
    'laptop shop Zimbabwe',
    'HP laptop Zimbabwe',
    'Dell laptop Zimbabwe',
    'Lenovo laptop Zimbabwe',
    'ThinkPad Zimbabwe',
    'laptop prices Zimbabwe',
    'cheap laptops Zimbabwe',
    'affordable laptops Harare',

    // Brand New vs Refurbished
    'brand new laptops Zimbabwe',
    'refurbished laptops Zimbabwe',
    'certified refurbished laptops Harare',
    'second hand laptops Zimbabwe',
    'ex-UK laptops Zimbabwe',

    // Specific Products
    'HP EliteBook Zimbabwe',
    'HP ProBook Zimbabwe',
    'Dell Latitude Zimbabwe',
    'Dell Inspiron Zimbabwe',
    'Lenovo ThinkPad Zimbabwe',
    'MacBook Zimbabwe',
    'gaming laptop Zimbabwe',
    'business laptop Zimbabwe',
    'student laptop Zimbabwe',

    // Other Products
    'desktops Zimbabwe',
    'monitors Zimbabwe',
    'smartphones Zimbabwe',
    'Samsung phones Zimbabwe',
    'iPhone Zimbabwe',
    'computer accessories Zimbabwe',

    // Location Keywords
    'laptop shop Harare CBD',
    'computer shop Zimbabwe',
    'electronics store Harare',
    'tech shop Zimbabwe',
    'laptop delivery Zimbabwe',
    'laptop store near me Harare',

    // Intent Keywords
    'best laptop deals Zimbabwe',
    'laptop specials Zimbabwe',
    'laptop sale Zimbabwe',
    'where to buy laptop Zimbabwe',
    'laptop warranty Zimbabwe',

    // Civil Servant Related
    'civil servant laptops Zimbabwe',
    'teacher laptops Zimbabwe',
    'government employee laptops',
    'laptop financing Zimbabwe',
  ].join(', '),
  authors: [{ name: 'Sui Generis Technologies' }],
  creator: 'Sui Generis Technologies',
  publisher: 'Sui Generis Technologies',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: `${siteUrl}/products`,
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZW',
    url: `${siteUrl}/products`,
    siteName: 'Sui Generis Technologies Zimbabwe',
    title: 'Buy Laptops Zimbabwe | HP, Dell, Lenovo | Best Prices in Harare',
    description: 'Shop laptops in Zimbabwe! HP, Dell, Lenovo at unbeatable prices. Brand new & refurbished with warranty. Civil servant financing available. Free delivery in Harare.',
    images: [
      {
        url: `${siteUrl}/logo.svg`,
        width: 1200,
        height: 630,
        alt: 'Buy Laptops Zimbabwe - Sui Generis Technologies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buy Laptops Zimbabwe | Best Prices | HP, Dell, Lenovo',
    description: 'Shop laptops in Zimbabwe! HP, Dell, Lenovo at best prices. Brand new & refurbished. Warranty included. Civil servant financing available.',
    images: [`${siteUrl}/logo.svg`],
    creator: '@suigeneristech',
  },
};

// Generate Local Business JSON-LD
function generateLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ComputerStore',
    '@id': `${siteUrl}/#store`,
    name: 'Sui Generis Technologies',
    description: 'Zimbabwe\'s premier laptop and electronics store. HP, Dell, Lenovo laptops with warranty. Civil servant financing available.',
    url: siteUrl,
    telephone: '+263784116938',
    email: 'info@suigeneriszim.co.zw',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '109 Leopold Takawira Street',
      addressLocality: 'Harare',
      addressRegion: 'Harare Province',
      postalCode: '00263',
      addressCountry: 'ZW',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -17.8292,
      longitude: 31.0522,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '13:00',
      },
    ],
    priceRange: '$$',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, EcoCash, Bank Transfer',
    areaServed: {
      '@type': 'Country',
      name: 'Zimbabwe',
    },
  };
}

// Generate Breadcrumb JSON-LD
function generateBreadcrumbJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: `${siteUrl}/products`,
      },
    ],
  };
}

// Fetch products from database for SEO structured data
async function getProductsFromDatabase() {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching products for SEO:', error);
      return [];
    }

    return (products || []).map((p: any) => ({
      id: p.id,
      name: p.name,
      description: p.description || `${p.name} - Premium ${p.category} from ${p.brand}. Available at Sui Generis Technologies Zimbabwe.`,
      price: p.price,
      originalPrice: p.original_price,
      image: p.image || p.images?.[0] || '/placeholder-product.png',
      images: p.images,
      brand: p.brand,
      category: p.category,
      rating: p.rating || 4.5,
      reviews: p.reviews || 1,
      stockCount: p.stock_count,
      inStock: p.in_stock !== false,
      condition: p.condition,
    }));
  } catch (err) {
    console.error('Error in getProductsFromDatabase:', err);
    return [];
  }
}

export default async function Products() {
  const productDataList = await getProductsFromDatabase();

  return (
    <>
      {/* JSON-LD Structured Data for SEO - With VALID Product schemas including offers */}

      {/* Product List with individual product schemas - FIXES Google error */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateProductListSchema(productDataList, 'Laptops and Electronics Zimbabwe')),
        }}
      />

      {/* Local Business for store info */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateLocalBusinessJsonLd()),
        }}
      />

      {/* Breadcrumb navigation */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbJsonLd()),
        }}
      />

      <ProductsPage />
    </>
  );
}
