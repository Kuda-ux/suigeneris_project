'use client';

import { Inter } from 'next/font/google'
import './globals.css'
import '../styles/animations.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

// SEO Metadata - World-Class Configuration
const siteConfig = {
  name: 'Sui Generis Technologies Zimbabwe',
  shortName: 'Sui Generis Tech',
  description: 'Zimbabwe\'s premier destination for certified refurbished laptops, desktops, and smartphones. Premium HP, Dell, Lenovo, and Samsung devices with warranty. Zero deposit laptop financing available for civil servants. Shop quality technology in Harare.',
  url: 'https://suigeneriszim.co.zw',
  ogImage: 'https://suigeneriszim.co.zw/og-image.jpg',
  keywords: 'laptops Zimbabwe, refurbished laptops Harare, desktops Zimbabwe, smartphones Harare, HP laptops Zimbabwe, Dell laptops Harare, Lenovo ThinkPad Zimbabwe, Samsung Galaxy Zimbabwe, laptop financing Zimbabwe, zero deposit laptops, civil servant laptops, buy laptops Harare, cheap laptops Zimbabwe, quality laptops Harare, Sui Generis Technologies, computer shop Harare, laptop shop Zimbabwe, refurbished computers Zimbabwe',
  author: 'Sui Generis Technologies',
  location: 'Harare, Zimbabwe',
  businessType: 'Electronics Store',
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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="description" content={siteConfig.description} />
        <meta name="keywords" content={siteConfig.keywords} />
        <meta name="author" content={siteConfig.author} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <link rel="canonical" href={siteConfig.url} />
        
        {/* Geo Tags for Zimbabwe */}
        <meta name="geo.region" content="ZW" />
        <meta name="geo.placename" content="Harare" />
        <meta name="geo.position" content="-17.8292;31.0522" />
        <meta name="ICBM" content="-17.8292, 31.0522" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteConfig.url} />
        <meta property="og:title" content={`${siteConfig.name} - Premium Technology in Zimbabwe`} />
        <meta property="og:description" content={siteConfig.description} />
        <meta property="og:image" content={siteConfig.ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Sui Generis Technologies - Premium Laptops and Technology" />
        <meta property="og:site_name" content={siteConfig.name} />
        <meta property="og:locale" content="en_ZW" />
        <meta property="og:locale:alternate" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@suigeneristech" />
        <meta name="twitter:creator" content="@suigeneristech" />
        <meta name="twitter:url" content={siteConfig.url} />
        <meta name="twitter:title" content={`${siteConfig.name} - Premium Technology in Zimbabwe`} />
        <meta name="twitter:description" content={siteConfig.description} />
        <meta name="twitter:image" content={siteConfig.ogImage} />
        <meta name="twitter:image:alt" content="Sui Generis Technologies - Quality Laptops & Technology" />
        
        {/* Favicon & Icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#dc2626" />
        <meta name="msapplication-TileColor" content="#dc2626" />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Store',
              '@id': `${siteConfig.url}/#organization`,
              name: 'Sui Generis Technologies',
              alternateName: siteConfig.shortName,
              url: siteConfig.url,
              logo: {
                '@type': 'ImageObject',
                url: `${siteConfig.url}/logo.svg`,
                width: 250,
                height: 250,
              },
              image: siteConfig.ogImage,
              description: siteConfig.description,
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'ZW',
                addressLocality: 'Harare',
                addressRegion: 'Harare Province',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: -17.8292,
                longitude: 31.0522,
              },
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                areaServed: 'ZW',
                availableLanguage: ['English'],
                email: 'info@suigeneriszim.co.zw',
              },
              priceRange: '$$',
              currenciesAccepted: 'USD, ZWL',
              paymentAccepted: 'Cash, Mobile Money, Bank Transfer',
              openingHours: 'Mo-Fr 08:00-17:00, Sa 08:00-13:00',
              sameAs: [
                'https://facebook.com/suigeneristech',
                'https://twitter.com/suigeneristech',
                'https://instagram.com/suigeneristech',
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
              '@id': `${siteConfig.url}/#website`,
              name: 'Sui Generis Technologies',
              url: siteConfig.url,
              description: siteConfig.description,
              publisher: {
                '@id': `${siteConfig.url}/#organization`,
              },
              inLanguage: 'en-ZW',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `${siteConfig.url}/products?search={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        
        <title>{siteConfig.name} | Premium Laptops, Desktops & Smartphones | Harare, Zimbabwe</title>
      </head>
      <body className={inter.className}>
        {!isAdminPage && <Header />}
        <main>{children}</main>
        {!isAdminPage && <Footer />}
      </body>
    </html>
  )
}
