import { ITSolutionsPage } from '@/components/pages/it-solutions-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IT Software Solutions | Web & Software Development | Sui Generis Technologies Zimbabwe',
  description: 'Professional IT software solutions in Zimbabwe. Website development, custom software, mobile apps, e-commerce, cloud solutions, and business analytics. Transform your business with Sui Generis Technologies.',
  keywords: 'IT solutions Zimbabwe, software development Harare, website development Zimbabwe, mobile app development, e-commerce solutions, custom software Zimbabwe, cloud solutions, business software Harare, web development Zimbabwe, Sui Generis Technologies',
  openGraph: {
    title: 'IT Software Solutions | Sui Generis Technologies Zimbabwe',
    description: 'Professional IT software solutions in Zimbabwe. Website development, custom software, mobile apps, e-commerce, and more.',
    url: 'https://www.suigeneriszim.co.zw/it-solutions',
    siteName: 'Sui Generis Technologies Zimbabwe',
    images: [
      {
        url: 'https://www.suigeneriszim.co.zw/logo.svg',
        width: 1200,
        height: 630,
        alt: 'Sui Generis IT Solutions',
      },
    ],
    locale: 'en_ZW',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IT Software Solutions | Sui Generis Technologies Zimbabwe',
    description: 'Professional IT software solutions in Zimbabwe. Website development, custom software, mobile apps, and more.',
    images: ['https://www.suigeneriszim.co.zw/logo.svg'],
  },
};

export default function ITSolutionsRoute() {
  return <ITSolutionsPage />;
}
