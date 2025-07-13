import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { contactData } from "../../public/data/Constent";

import Layout from "@/components/base/Layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Mangalam Charitable Trust | Non-Profit Organization Mumbai",
    template: "%s | Mangalam Charitable Trust"
  },
  description: "Mangalam Charitable Trust is a registered non-profit organization in Mumbai dedicated to improving lives through education, healthcare, and social welfare initiatives for underprivileged communities.",
  keywords: [
    "charitable trust",
    "non-profit organization",
    "NGO Mumbai",
    "education charity",
    "healthcare charity",
    "social welfare",
    "underprivileged communities",
    "donation",
    "volunteer",
    "Mangalam Charitable Trust"
  ],
  authors: [{ name: "Mangalam Charitable Trust" }],
  creator: "Mangalam Charitable Trust",
  publisher: "Mangalam Charitable Trust",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mangalamcharitabletrust.org'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Mangalam Charitable Trust | Non-Profit Organization Mumbai",
    description: "Registered non-profit organization dedicated to improving lives through education, healthcare, and social welfare initiatives for underprivileged communities in Mumbai.",
    url: 'https://mangalamcharitabletrust.org', // Replace with your actual domain
    siteName: 'Mangalam Charitable Trust',
    images: [
      {
        url: '/og-image.jpg', // Add your organization's image
        width: 1200,
        height: 630,
        alt: 'Mangalam Charitable Trust - Making a Difference',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mangalam Charitable Trust | Non-Profit Organization Mumbai",
    description: "Registered non-profit organization dedicated to improving lives through education, healthcare, and social welfare initiatives.",
    images: ['/og-image.jpg'], // Same image as OpenGraph
    creator: '@MangalamCT', // Add your Twitter handle if available
  },
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
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
    // bing: 'your-bing-verification-code',
  },
  category: 'non-profit organization',
  classification: 'charity',
  referrer: 'origin-when-cross-origin',
};



// Generate JSON-LD structured data
const generateJsonLd = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": contactData.name,
    "alternateName": "MangalamCT",
    "description": contactData.description,
    "url": contactData.website,
    "logo": `${contactData.website}/logo.png`, // Add your logo URL
    "image": `${contactData.website}/og-image.jpg`, // Add your main image
    "foundingDate": contactData.foundingDate,
    "areaServed": {
      "@type": "Place",
      "name": contactData.areaServed
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "E-6,5th FLR 2.dimpal APT, CHS, JERBAI WADIA ROAD",
      "addressLocality": "Parel",
      "addressRegion": "Mumbai",
      "postalCode": "400012",
      "addressCountry": "IN"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": contactData.phoneNo[0].phoneNo,
        "contactType": "customer service",
        "availableLanguage": ["English", "Hindi", "Marathi"]
      },
      {
        "@type": "ContactPoint",
        "email": contactData.email[0].email,
        "contactType": "customer service"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/share/15nga7cTNJ/",
      "https://www.instagram.com/trustmanglamcharitable?utm_source=qr&igsh=bXQ4MGY4djBlcW5s",
      "https://www.youtube.com/@MANGALAMCT"
     
    ],
    "knowsAbout": [
      "Education",
      "Healthcare",
      "Social Welfare",
      "Community Development",
      "Charity",
      "Non-profit"
    ],
    "seeks": "Donations and volunteers to support education, healthcare, and social welfare initiatives",
    "identifier": [
      {
        "@type": "PropertyValue",
        "name": "Registration Number",
        "value": contactData.regNo
      },
      {
        "@type": "PropertyValue",
        "name": "PAN Number",
        "value": contactData.panNo
      },
      {
        "@type": "PropertyValue",
        "name": "NGO Darpan ID",
        "value": contactData.ngoDarpanId
      }
    ]
  };

  // Website schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": contactData.name,
    "url": contactData.website,
    "description": contactData.description,
    "inLanguage": "en-IN",
    "publisher": {
      "@type": "NGO",
      "name": contactData.name
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${contactData.website}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Breadcrumb schema (for homepage)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": contactData.website
      }
    ]
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema, websiteSchema, breadcrumbSchema]
  };
};

export default function RootLayout({ children }) {
  const jsonLd = generateJsonLd();
  
  return (
    <html lang="en">
      <head>
        <script src="https://mercury.phonepe.com/web/bundle/checkout.js"/>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd)
          }}
        />
        
        {/* Additional meta tags */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Mangalam Charitable Trust" />
        
        {/* Favicon and icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Additional SEO meta tags */}
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Mumbai" />
        <meta name="geo.position" content="19.0176;72.8562" />
        <meta name="ICBM" content="19.0176, 72.8562" />
        
        {/* Organization contact info for search engines */}
        <meta name="contact" content={contactData.email[0].email} />
        <meta name="copyright" content={`© ${new Date().getFullYear()} ${contactData.name}`} />
        
        {/* Dublin Core metadata */}
        <meta name="DC.title" content="Mangalam Charitable Trust" />
        <meta name="DC.description" content={contactData.description} />
        <meta name="DC.creator" content={contactData.name} />
        <meta name="DC.language" content="en-IN" />
        <meta name="DC.type" content="Text" />
        <meta name="DC.subject" content="charity, non-profit, education, healthcare, social welfare" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
<Layout>
  {children}
</Layout>
      </body>
    </html>
  );
}