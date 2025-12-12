import { LoanApplicationForm } from '@/components/pages/loan-application-form';
import { Metadata } from 'next';

const siteUrl = 'https://www.suigeneriszim.co.zw';

export const metadata: Metadata = {
  title: 'Civil Servant Laptop Loan Zimbabwe | Zero Deposit Financing | Government Employee Loans',
  description: 'Get a laptop loan for civil servants in Zimbabwe with ZERO deposit! Teachers, nurses, police, army, government workers - apply now for salary-based laptop financing. Pay from your salary over 2-24 months. HP, Dell, Lenovo laptops available. Instant approval for Zimbabwe civil servants.',
  keywords: [
    // Primary Keywords - High Intent
    'civil servant laptop loan Zimbabwe',
    'government employee laptop financing Zimbabwe',
    'teacher laptop loan Zimbabwe',
    'nurse laptop loan Zimbabwe',
    'police laptop loan Zimbabwe',
    'army laptop loan Zimbabwe',
    'zero deposit laptop Zimbabwe',
    'salary based laptop financing Zimbabwe',
    'laptop loan Harare',
    'civil servant financing Zimbabwe',
    
    // Secondary Keywords
    'laptop hire purchase Zimbabwe',
    'laptop installment Zimbabwe',
    'buy laptop on credit Zimbabwe',
    'laptop payment plan Zimbabwe',
    'affordable laptop Zimbabwe civil servants',
    'government worker laptop scheme',
    'public sector laptop loan',
    'laptop deduction from salary Zimbabwe',
    'SSB laptop loan',
    'ZIMRA employee laptop',
    'ministry worker laptop loan',
    'council worker laptop financing',
    'ZRP laptop loan',
    'ZNA laptop financing',
    'teacher laptop scheme Zimbabwe',
    'nurse laptop scheme Zimbabwe',
    
    // Long-tail Keywords
    'how to get laptop loan as civil servant Zimbabwe',
    'laptop financing for government employees Harare',
    'best laptop loan for teachers Zimbabwe',
    'cheap laptop installments Zimbabwe',
    'laptop loan no deposit Zimbabwe',
    'civil servant laptop application Zimbabwe',
    'government laptop scheme Zimbabwe 2024',
    'laptop salary deduction Zimbabwe',
    
    // Brand + Location
    'Sui Generis laptop loan',
    'laptop shop Harare civil servants',
    'laptop financing Harare Zimbabwe',
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
    canonical: `${siteUrl}/loan-application`,
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZW',
    url: `${siteUrl}/loan-application`,
    siteName: 'Sui Generis Technologies Zimbabwe',
    title: 'Civil Servant Laptop Loan Zimbabwe | ZERO Deposit | Apply Now',
    description: 'Zimbabwe civil servants: Get your dream laptop TODAY with zero deposit! Teachers, nurses, police, government workers - instant approval. Pay from salary over 2-24 months. HP, Dell, Lenovo available.',
    images: [
      {
        url: `${siteUrl}/logo.svg`,
        width: 1200,
        height: 630,
        alt: 'Civil Servant Laptop Loan Zimbabwe - Sui Generis Technologies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Civil Servant Laptop Loan Zimbabwe | Zero Deposit Financing',
    description: 'Get a laptop with ZERO deposit! Civil servants in Zimbabwe can now own HP, Dell, Lenovo laptops. Pay from salary. Apply now!',
    images: [`${siteUrl}/logo.svg`],
    creator: '@suigeneristech',
  },
  other: {
    'application-name': 'Sui Generis Civil Servant Loans',
    'apple-mobile-web-app-title': 'Civil Servant Laptop Loan',
  },
};

// JSON-LD Structured Data for the loan page
function generateLoanServiceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    '@id': `${siteUrl}/loan-application#loan`,
    name: 'Civil Servant Laptop Loan Zimbabwe',
    description: 'Zero deposit laptop financing for Zimbabwe civil servants. Teachers, nurses, police, army, and all government employees can apply for salary-based laptop loans.',
    provider: {
      '@type': 'Organization',
      name: 'Sui Generis Technologies',
      url: siteUrl,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Zimbabwe',
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Civil Servants, Government Employees, Teachers, Nurses, Police Officers',
    },
    feesAndCommissionsSpecification: '5% interest per month',
    interestRate: {
      '@type': 'QuantitativeValue',
      value: 5,
      unitCode: 'P1M',
      unitText: 'per month',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      areaServed: 'Zimbabwe',
      eligibleRegion: {
        '@type': 'Country',
        name: 'Zimbabwe',
      },
    },
  };
}

function generateFAQJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I apply for a civil servant laptop loan in Zimbabwe?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Simply visit our loan application page, fill in your details including your employer (ministry/department), salary information, and choose your preferred laptop. Approval is instant for qualifying civil servants.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the deposit required for civil servant laptop loans?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ZERO deposit required! Civil servants in Zimbabwe can get laptops with no upfront payment. Repayments are deducted directly from your salary.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who qualifies for the civil servant laptop loan in Zimbabwe?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'All Zimbabwe government employees qualify including teachers, nurses, police officers (ZRP), army personnel (ZNA), ZIMRA employees, ministry workers, council workers, and all public sector employees.',
        },
      },
      {
        '@type': 'Question',
        name: 'What laptops are available for civil servant loans?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer HP, Dell, Lenovo, and other premium brands. Both brand new and certified refurbished laptops are available with full warranty.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long is the repayment period for laptop loans?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Flexible repayment terms from 2 to 24 months. Choose a plan that fits your budget with affordable monthly deductions from your salary.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the interest rate for civil servant laptop loans?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our interest rate is only 5% per month - one of the most competitive rates in Zimbabwe for salary-based financing.',
        },
      },
    ],
  };
}

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
        name: 'Civil Servant Laptop Loan',
        item: `${siteUrl}/loan-application`,
      },
    ],
  };
}

export default function LoanApplicationPage() {
  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateLoanServiceJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbJsonLd()),
        }}
      />
      <LoanApplicationForm />
    </>
  );
}
