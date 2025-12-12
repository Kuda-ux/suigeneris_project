'use client';

import { Inter } from 'next/font/google'
import './globals.css'
import '../styles/animations.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { AuthProvider } from '@/contexts/auth-context'
import { usePathname } from 'next/navigation'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

// SEO Metadata - World-Class Configuration (v0.2.0) - AGGRESSIVE SEO
const siteConfig = {
  name: 'Sui Generis Technologies Zimbabwe',
  shortName: 'Sui Generis Tech',
  description: 'Buy laptops in Zimbabwe with ZERO deposit financing for civil servants! Teachers, nurses, police, government workers - get HP, Dell, Lenovo laptops in Harare. Brand new & certified refurbished with warranty. Salary-based laptop loans available. Best laptop prices in Zimbabwe.',
  url: 'https://www.suigeneriszim.co.zw',
  ogImage: 'https://www.suigeneriszim.co.zw/logo.svg',
  keywords: [
    // Civil Servant Loan Keywords - HIGH PRIORITY
    'civil servant laptop loan Zimbabwe',
    'teacher laptop loan Zimbabwe',
    'nurse laptop loan Zimbabwe',
    'police laptop loan Zimbabwe',
    'government employee laptop financing',
    'zero deposit laptop Zimbabwe',
    'salary based laptop loan Zimbabwe',
    'laptop financing civil servants',
    'SSB laptop loan Zimbabwe',
    'ZIMRA employee laptop loan',
    'ministry worker laptop loan',
    'ZRP laptop financing',
    'ZNA laptop loan',
    'public sector laptop scheme Zimbabwe',
    
    // Product Keywords
    'buy laptop Zimbabwe',
    'laptops Harare',
    'HP laptop Zimbabwe',
    'Dell laptop Zimbabwe',
    'Lenovo laptop Zimbabwe',
    'ThinkPad Zimbabwe',
    'laptop prices Zimbabwe',
    'cheap laptops Zimbabwe',
    'affordable laptops Harare',
    'brand new laptops Zimbabwe',
    'refurbished laptops Zimbabwe',
    'certified refurbished laptops Harare',
    'ex-UK laptops Zimbabwe',
    
    // Specific Models
    'HP EliteBook Zimbabwe',
    'HP ProBook Zimbabwe',
    'Dell Latitude Zimbabwe',
    'Dell Inspiron Zimbabwe',
    'Lenovo ThinkPad T480 Zimbabwe',
    'MacBook Zimbabwe',
    
    // Other Products
    'desktops Zimbabwe',
    'monitors Zimbabwe',
    'smartphones Zimbabwe',
    'Samsung phones Zimbabwe',
    'computer accessories Zimbabwe',
    
    // Location Keywords
    'laptop shop Harare',
    'computer shop Zimbabwe',
    'electronics store Harare',
    'laptop store near me Zimbabwe',
    'laptop delivery Harare',
    
    // Intent Keywords
    'best laptop deals Zimbabwe',
    'where to buy laptop Zimbabwe',
    'laptop warranty Zimbabwe',
    'laptop installment Zimbabwe',
    'laptop hire purchase Zimbabwe',
    
    // Brand
    'Sui Generis Technologies',
    'Sui Generis laptops',
  ].join(', '),
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
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="JXPDOrdWzO5nQEYG2qGrV8U6_QjnpI8DCoTsuP63OTs" />
        
        {/* Primary Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="description" content={siteConfig.description} />
        <meta name="keywords" content={siteConfig.keywords} />
        <meta name="author" content={siteConfig.author} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow" />
        <meta name="google" content="nositelinkssearchbox" />
        <meta name="google" content="notranslate" />
        <link rel="canonical" href={siteConfig.url} />
        
        {/* Business & Local SEO */}
        <meta name="business:contact_data:street_address" content="109 Leopold Takawira Street" />
        <meta name="business:contact_data:locality" content="Harare" />
        <meta name="business:contact_data:region" content="Harare Province" />
        <meta name="business:contact_data:postal_code" content="00263" />
        <meta name="business:contact_data:country_name" content="Zimbabwe" />
        <meta name="business:contact_data:phone_number" content="+263784116938" />
        <meta name="business:contact_data:website" content="https://www.suigeneriszim.co.zw" />
        
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
        
        {/* Favicon & Icons - Using Sui Generis Logo */}
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileImage" content="/logo.svg" />
        <meta name="msapplication-TileColor" content="#dc2626" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
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
        <AuthProvider>
          {!isAdminPage && <Header />}
          <main>{children}</main>
          {!isAdminPage && <Footer />}
        </AuthProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
