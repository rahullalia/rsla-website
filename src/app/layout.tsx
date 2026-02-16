import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import ChatWidget from "@/components/ChatWidget";


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "RSL/A | Intelligent Marketing Systems",
  description: "We architect intelligent marketing systems. Paid Ads, AI Automation, and Smart Infrastructure for scaling businesses.",
  applicationName: "RSL/A",
  keywords: [
    'marketing automation',
    'AI automation',
    'intelligent marketing systems',
    'paid advertising',
    'Meta ads',
    'Google ads',
    'CRM automation',
    'GoHighLevel',
    'marketing agency',
    'AI agents',
    'lead generation',
    'business automation',
    'workflow automation',
    'cold email automation',
    'local SEO',
    'conversion optimization',
    'ROI optimization',
  ],
  metadataBase: new URL('https://rsla.io'),
  alternates: {
    canonical: 'https://rsla.io',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48 64x64 128x128 256x256' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'RSL/A | Intelligent Marketing Systems',
    description: 'We architect intelligent marketing systems. Paid Ads, AI Automation, and Smart Infrastructure for scaling businesses.',
    url: 'https://rsla.io',
    siteName: 'RSL/A',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RSL/A - Marketing & AI Automation Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RSL/A | Intelligent Marketing Systems',
    description: 'We architect intelligent marketing systems. Paid Ads, AI Automation, and Smart Infrastructure for scaling businesses.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.json',
  verification: {
    other: {
      'msvalidate.01': '84CC113E503AD83F2BC6716FA9D2FF59',
    },
  },
};

// JSON-LD Structured Data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://rsla.io/#organization",
  name: "RSL/A",
  alternateName: "RSL/A Marketing & AI Automation",
  url: "https://rsla.io",
  logo: {
    "@type": "ImageObject",
    url: "https://rsla.io/favicon.svg",
    width: 512,
    height: 512,
  },
  image: "https://rsla.io/og-image.png",
  description: "We architect intelligent marketing systems. Paid Ads, AI Automation, and Smart Infrastructure for scaling businesses.",
  foundingDate: "2024",
  founders: [
    {
      "@type": "Person",
      name: "Rahul Lalia",
      jobTitle: "Founder & CEO",
      url: "https://rsla.io/rahul",
    },
    {
      "@type": "Person",
      name: "Siddharth Rodrigues",
      jobTitle: "Co-Founder & CTO",
      url: "https://rsla.io/sid",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/rsl-a/",
    "https://www.instagram.com/rsla.io",
    "https://www.tiktok.com/@rsla.io",
    "https://github.com/rahullalia",
    "https://www.youtube.com/@rsla_io",
    "https://x.com/rsla_io",
    "https://www.facebook.com/rsla.io",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: "https://rsla.io/#contact",
    availableLanguage: "English",
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  serviceType: [
    "Marketing Automation",
    "AI Automation",
    "Paid Advertising",
    "CRM Implementation",
    "Local SEO",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://rsla.io/#website",
  name: "RSL/A",
  url: "https://rsla.io",
  publisher: {
    "@id": "https://rsla.io/#organization",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://rsla.io/blog?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

// LocalBusiness schema for Google Business Profile
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://rsla.io/#localbusiness",
  name: "RSL/A",
  alternateName: "RSL/A Marketing & AI Automation",
  url: "https://rsla.io",
  logo: "https://rsla.io/favicon.svg",
  image: "https://rsla.io/og-image.png",
  description: "Marketing automation and AI systems agency specializing in paid advertising, CRM automation, and local SEO for scaling businesses.",
  telephone: "+1-646-641-3173",
  email: "hello@rsla.io",
  address: {
    "@type": "PostalAddress",
    addressLocality: "New York",
    addressRegion: "NY",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.7128,
    longitude: -74.0060,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  priceRange: "$$",
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Marketing & Automation Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Automation",
          description: "Custom AI agents for bookings, support, and sales automation",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Paid Advertising",
          description: "Meta & Google ads management with ROI tracking",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "CRM Implementation",
          description: "GoHighLevel setup, automation, and database management",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Local SEO",
          description: "Google Business Profile optimization and review management",
        },
      },
    ],
  },
  sameAs: [
    "https://www.linkedin.com/company/rsl-a/",
    "https://www.instagram.com/rsla.io",
    "https://www.tiktok.com/@rsla.io",
    "https://github.com/rahullalia",
    "https://www.youtube.com/@rsla_io",
    "https://x.com/rsla_io",
    "https://www.facebook.com/rsla.io",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, websiteSchema, localBusinessSchema]),
          }}
        />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MVJQSMF8');`
          }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        {/* Preconnect to Fontshare for faster font loading */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@700,900&display=swap"
          rel="stylesheet"
        />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0070f3" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${inter.variable} bg-black text-white antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MVJQSMF8"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
        <CookieBanner />
        <ChatWidget />

      </body>
    </html>
  );
}
