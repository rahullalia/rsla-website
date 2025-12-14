import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "RSL/A | Intelligent Marketing Systems",
  description: "We architect intelligent marketing systems. Paid Ads, AI Automation, and Smart Infrastructure for scaling businesses.",
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
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.svg',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PGTJ93F2');`
          }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
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
            src="https://www.googletagmanager.com/ns.html?id=GTM-PGTJ93F2"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
        {/* Chat Widget */}
        <script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="67433f4a9f32296f64a5a2df"
          async
        />
      </body>
    </html>
  );
}
