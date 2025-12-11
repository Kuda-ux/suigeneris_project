import { ProductDetailPage } from '@/components/pages/product-detail-page';
import { getProductById } from '@/data/products';
import { Metadata } from 'next';

const siteUrl = 'https://www.suigeneriszim.co.zw';
const whatsappNumber = '+263784116938';

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = getProductById(params.id);
  
  if (!product) {
    return {
      title: 'Product Not Found | Sui Generis Technologies Zimbabwe',
      description: 'The product you are looking for could not be found.',
    };
  }

  const productTitle = `${product.name} | Buy ${product.category} in Zimbabwe | Sui Generis Technologies`;
  const productDescription = `Buy ${product.name} in Zimbabwe for $${product.price}. ${product.condition || 'Brand New'} ${product.brand} ${product.category}. ${product.description.slice(0, 150)}... Order via WhatsApp. Free warranty included.`;
  const productImage = product.images[0] || `${siteUrl}/logo.svg`;
  const productUrl = `${siteUrl}/products/${params.id}`;
  
  // Generate keywords based on product
  const keywords = [
    product.name,
    `${product.brand} ${product.category}`,
    `buy ${product.name} Zimbabwe`,
    `${product.name} price Zimbabwe`,
    `${product.name} Harare`,
    `${product.brand} laptops Zimbabwe`,
    `${product.category} Zimbabwe`,
    `${product.category} Harare`,
    `cheap ${product.category} Zimbabwe`,
    `affordable ${product.brand} Zimbabwe`,
    `${product.condition || 'brand new'} ${product.category}`,
    'Sui Generis Technologies',
    'laptop shop Harare',
    'computer shop Zimbabwe',
  ].join(', ');

  return {
    title: productTitle,
    description: productDescription,
    keywords: keywords,
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
      canonical: productUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_ZW',
      url: productUrl,
      siteName: 'Sui Generis Technologies Zimbabwe',
      title: productTitle,
      description: productDescription,
      images: [
        {
          url: productImage,
          width: 800,
          height: 600,
          alt: `${product.name} - Buy in Zimbabwe`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: productTitle,
      description: productDescription,
      images: [productImage],
      creator: '@suigeneristech',
    },
    other: {
      'product:price:amount': product.price.toString(),
      'product:price:currency': 'USD',
      'product:availability': product.stockCount > 0 ? 'in stock' : 'out of stock',
      'product:condition': product.condition || 'new',
      'product:brand': product.brand,
      'product:category': product.category,
    },
  };
}

// Generate JSON-LD structured data for the product
function generateProductJsonLd(product: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${siteUrl}/products/${product.id}`,
    name: product.name,
    description: product.description,
    image: product.images,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    category: product.category,
    sku: `SG-${product.id}`,
    mpn: `SG-${product.id}`,
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/products/${product.id}`,
      priceCurrency: 'USD',
      price: product.price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: product.stockCount > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: product.condition === 'Refurbished' ? 'https://schema.org/RefurbishedCondition' : 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Sui Generis Technologies',
        url: siteUrl,
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'ZW',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 3,
            unitCode: 'DAY',
          },
        },
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviews,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

// Generate BreadcrumbList JSON-LD
function generateBreadcrumbJsonLd(product: any) {
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
      {
        '@type': 'ListItem',
        position: 3,
        name: product.category,
        item: `${siteUrl}/categories/${product.category.toLowerCase()}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: product.name,
        item: `${siteUrl}/products/${product.id}`,
      },
    ],
  };
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);
  
  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      {product && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(generateProductJsonLd(product)),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(generateBreadcrumbJsonLd(product)),
            }}
          />
        </>
      )}
      <ProductDetailPage productId={params.id} />
    </>
  );
}
