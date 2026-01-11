import { ITSolutionsPage } from '@/components/pages/it-solutions-page';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Best IT Solutions Provider Zimbabwe | Web Development, Apps & Software | Sui Generis',
  description: 'Sui Generis Technologies is the #1 IT solutions provider in Zimbabwe. We deliver custom software, mobile apps, websites, and cloud solutions in Harare, Bulawayo, Mutare & Gweru. Transform your business today.',
  keywords: [
    'IT solutions Zimbabwe',
    'software development Zimbabwe',
    'website design Harare',
    'web development Bulawayo',
    'mobile app developers Zimbabwe',
    'custom software Mutare',
    'IT companies Gweru',
    'best software company Zimbabwe',
    'e-commerce developers Harare',
    'cloud services Zimbabwe',
    'cybersecurity Zimbabwe',
    'Sui Generis Technologies'
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
    canonical: 'https://www.suigeneriszim.co.zw/it-solutions',
  },
  openGraph: {
    title: 'Top IT Solutions & Software Development in Zimbabwe | Sui Generis',
    description: 'Transform your business with Zimbabwe\'s leading software experts. We build websites, apps, and systems that drive growth. Serving Harare, Bulawayo, and beyond.',
    url: 'https://www.suigeneriszim.co.zw/it-solutions',
    siteName: 'Sui Generis Technologies Zimbabwe',
    images: [
      {
        url: 'https://www.suigeneriszim.co.zw/logo.svg',
        width: 1200,
        height: 630,
        alt: 'Sui Generis IT Solutions - Your Digital Partner in Zimbabwe',
      },
    ],
    locale: 'en_ZW',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expert IT Solutions Zimbabwe | Sui Generis Technologies',
    description: 'Custom software, mobile apps, and website development for Zimbabwean businesses.',
    images: ['https://www.suigeneriszim.co.zw/logo.svg'],
    creator: '@suigeneristech',
  },
};

export default function ITSolutionsRoute() {
  return (
    <>
      <ITSolutionsPage />

      {/* Structured Data for SEO/AEO */}
      <Script
        id="it-solutions-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            '@id': 'https://www.suigeneriszim.co.zw/it-solutions#service',
            name: 'IT Software Solutions',
            description: 'Comprehensive IT software solutions including website development, custom software, mobile apps, e-commerce platforms, cloud solutions, and cybersecurity services.',
            provider: {
              '@type': 'Organization',
              '@id': 'https://www.suigeneriszim.co.zw/#organization',
              name: 'Sui Generis Technologies',
              url: 'https://www.suigeneriszim.co.zw',
              logo: 'https://www.suigeneriszim.co.zw/logo.svg',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'ZW',
                addressLocality: 'Harare',
                streetAddress: '109 Leopold Takawira Street',
              },
              areaServed: ['Harare', 'Bulawayo', 'Mutare', 'Gweru', 'Zimbabwe'],
            },
            serviceType: 'Software Development',
            areaServed: {
              '@type': 'Country',
              name: 'Zimbabwe',
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'IT Services Catalog',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Website Development',
                    description: 'Responsive, high-performance websites optimized for Zimbabwe SEO.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Mobile App Development',
                    description: 'Native iOS and Android hybrid applications with offline capabilities.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Custom Software',
                    description: 'Tailored enterprise solutions for automation and management.',
                  },
                },
              ],
            },
          }),
        }}
      />

      {/* FAQ Schema for AEO */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Why is Sui Generis the best IT solutions provider in Zimbabwe?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sui Generis combines world-class technical expertise with deep local market understanding. We deliver enterprise-grade software that is reliable, scalable, and tailored for the unique challenges and opportunities of the Zimbabwean business environment.'
                }
              },
              {
                '@type': 'Question',
                name: 'Do you offer services outside of Harare?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! While we are based in Harare, we proudly serve clients in Bulawayo, Gweru, Mutare, and across all major cities in Zimbabwe. Our remote collaboration tools ensure seamless project delivery regardless of location.'
                }
              },
              {
                '@type': 'Question',
                name: 'How much does a custom website or app cost?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Every project is unique. Our pricing is competitive and depends on features, complexity, and platform. We offer free consultations to understand your needs and provide a tailored, transparent quote.'
                }
              }
            ]
          }),
        }}
      />
    </>
  );
}
