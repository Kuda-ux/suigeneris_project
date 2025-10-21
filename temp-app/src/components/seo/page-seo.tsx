'use client';

import Head from 'next/head';

interface PageSEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  keywords?: string;
  type?: 'website' | 'article' | 'product';
}

export function PageSEO({
  title,
  description,
  canonical,
  ogImage = 'https://www.suigeneriszim.co.zw/og-image.jpg',
  keywords,
  type = 'website',
}: PageSEOProps) {
  const fullTitle = `${title} | Sui Generis Technologies Zimbabwe`;
  const url = canonical || 'https://www.suigeneriszim.co.zw';

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  );
}
