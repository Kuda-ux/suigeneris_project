'use client';

import { Inter } from 'next/font/google'
import './globals.css'
import '../styles/animations.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

// SEO Metadata
const siteConfig = {
  name: 'Sui Generis Technologies',
  description: 'Premium certified refurbished laptops, desktops, and smartphones in Zimbabwe. Quality technology with warranty included. Zero deposit laptop financing for civil servants.',
  url: 'https://suigeneris.co.zw',
  ogImage: 'https://suigeneris.co.zw/og-image.jpg',
  keywords: 'laptops Zimbabwe, refurbished laptops, desktops Zimbabwe, smartphones Zimbabwe, HP laptops, Dell laptops, Lenovo ThinkPad, Samsung phones, laptop financing Zimbabwe, zero deposit laptops, civil servant laptops, Sui Generis Technologies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <html lang="en">
      <head>
        {/* Primary Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={siteConfig.description} />
        <meta name="keywords" content={siteConfig.keywords} />
        <meta name="author" content="Sui Generis Technologies" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={siteConfig.url} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteConfig.url} />
        <meta property="og:title" content={siteConfig.name} />
        <meta property="og:description" content={siteConfig.description} />
        <meta property="og:image" content={siteConfig.ogImage} />
        <meta property="og:site_name" content={siteConfig.name} />
        <meta property="og:locale" content="en_ZW" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={siteConfig.url} />
        <meta name="twitter:title" content={siteConfig.name} />
        <meta name="twitter:description" content={siteConfig.description} />
        <meta name="twitter:image" content={siteConfig.ogImage} />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#dc2626" />
        <meta name="msapplication-TileColor" content="#dc2626" />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Sui Generis Technologies',
              url: 'https://suigeneris.co.zw',
              logo: 'https://suigeneris.co.zw/logo.svg',
              description: siteConfig.description,
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'ZW',
                addressLocality: 'Harare',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                areaServed: 'ZW',
                availableLanguage: ['English'],
              },
              sameAs: [
                'https://facebook.com/suigeneristech',
                'https://twitter.com/suigeneristech',
              ],
            }),
          }}
        />
        
        {/* Structured Data - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Sui Generis Technologies',
              url: 'https://suigeneris.co.zw',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://suigeneris.co.zw/products?search={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        
        <title>{siteConfig.name} - Premium Technology in Zimbabwe</title>
      </head>
      <body className={inter.className}>
        {!isAdminPage && <Header />}
        <main>{children}</main>
        {!isAdminPage && <Footer />}
      </body>
    </html>
  )
}
