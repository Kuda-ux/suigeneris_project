import { ITSolutionsPage } from '@/components/pages/it-solutions-page';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'IT Software Solutions Zimbabwe | Web Development, Custom Software & Mobile Apps | Sui Generis',
  description: 'Leading IT software solutions provider in Zimbabwe. Expert website development, custom software, mobile apps (iOS/Android), e-commerce platforms, cloud solutions & cybersecurity. Transform your business with cutting-edge technology. Serving Harare & all Zimbabwe.',
  keywords: 'IT solutions Zimbabwe, software development Harare, website development Zimbabwe, web design Harare, mobile app development Zimbabwe, iOS app development, Android app development, custom software Zimbabwe, e-commerce solutions Harare, online store Zimbabwe, cloud solutions Zimbabwe, AWS Azure Zimbabwe, business software Harare, enterprise software Zimbabwe, software company Harare, tech solutions Zimbabwe, digital transformation Zimbabwe, web application development, API development Zimbabwe, database management Zimbabwe, cybersecurity Zimbabwe, IT consulting Harare, Sui Generis Technologies',
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
    title: 'IT Software Solutions Zimbabwe | Web Development & Custom Software | Sui Generis',
    description: 'Leading IT software solutions provider in Zimbabwe. Expert website development, custom software, mobile apps, e-commerce, cloud solutions & more. Transform your business with technology.',
    url: 'https://www.suigeneriszim.co.zw/it-solutions',
    siteName: 'Sui Generis Technologies Zimbabwe',
    images: [
      {
        url: 'https://www.suigeneriszim.co.zw/logo.svg',
        width: 1200,
        height: 630,
        alt: 'Sui Generis IT Software Solutions - Zimbabwe Premier Technology Partner',
      },
    ],
    locale: 'en_ZW',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IT Software Solutions Zimbabwe | Sui Generis Technologies',
    description: 'Leading IT software solutions in Zimbabwe. Website development, custom software, mobile apps, e-commerce & cloud solutions.',
    images: ['https://www.suigeneriszim.co.zw/logo.svg'],
    creator: '@suigeneristech',
  },
  verification: {
    google: 'JXPDOrdWzO5nQEYG2qGrV8U6_QjnpI8DCoTsuP63OTs',
  },
};

export default function ITSolutionsRoute() {
  return (
    <>
      {/* Structured Data - Service Schema */}
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
                addressRegion: 'Harare Province',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                areaServed: 'ZW',
                availableLanguage: ['English'],
              },
            },
            serviceType: 'IT Software Solutions',
            areaServed: {
              '@type': 'Country',
              name: 'Zimbabwe',
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'IT Software Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Website Development',
                    description: 'Professional, responsive website development with SEO optimization and mobile-first design.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Custom Software Development',
                    description: 'Tailored software solutions built specifically for your business needs with scalable architecture.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Mobile App Development',
                    description: 'Native and cross-platform mobile applications for iOS and Android with offline support.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'E-Commerce Solutions',
                    description: 'Complete online store solutions with payment integration and inventory management.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Cloud Solutions',
                    description: 'Cloud infrastructure setup, migration, and management with AWS and Azure.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Business Analytics',
                    description: 'Data-driven insights and reporting tools with custom dashboards and KPI tracking.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Cybersecurity Solutions',
                    description: 'Comprehensive security solutions including security audits, threat detection, and data encryption.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Database Management',
                    description: 'Secure, scalable database solutions with backup, performance tuning, and migration services.',
                  },
                },
              ],
            },
          }),
        }}
      />

      {/* Structured Data - BreadcrumbList */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.suigeneriszim.co.zw',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'IT Solutions',
                item: 'https://www.suigeneriszim.co.zw/it-solutions',
              },
            ],
          }),
        }}
      />

      {/* Structured Data - FAQPage */}
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
                name: 'What IT software solutions does Sui Generis offer in Zimbabwe?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sui Generis Technologies offers comprehensive IT solutions including website development, custom software development, mobile app development (iOS & Android), e-commerce platforms, cloud solutions (AWS/Azure), business analytics, cybersecurity, and database management services across Zimbabwe.',
                },
              },
              {
                '@type': 'Question',
                name: 'How much does custom software development cost in Zimbabwe?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Custom software development costs vary based on project complexity, features, and timeline. Contact Sui Generis Technologies for a free consultation and customized quote tailored to your business needs and budget.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do you develop mobile apps for both iOS and Android?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, we develop native and cross-platform mobile applications for both iOS and Android platforms with features like push notifications, offline support, and seamless performance.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can you help migrate my business to the cloud?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Absolutely! We provide complete cloud migration services including AWS and Azure setup, auto-scaling configuration, 24/7 monitoring, and ongoing support to ensure smooth transition and optimal performance.',
                },
              },
            ],
          }),
        }}
      />

      <ITSolutionsPage />
    </>
  );
}
