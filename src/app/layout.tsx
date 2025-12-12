import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "RSL/A | Intelligent Marketing Systems",
  description: "We architect intelligent marketing systems. Paid Ads, AI Automation, and Smart Infrastructure for scaling businesses.",
  metadataBase: new URL('https://rsla.io'),
  openGraph: {
    title: 'RSL/A | Intelligent Marketing Systems',
    description: 'We architect intelligent marketing systems. Paid Ads, AI Automation, and Smart Infrastructure for scaling businesses.',
    url: 'https://rsla.io',
    siteName: 'RSL/A',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RSL/A | Intelligent Marketing Systems',
    description: 'We architect intelligent marketing systems. Paid Ads, AI Automation, and Smart Infrastructure for scaling businesses.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@700,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} bg-black text-white antialiased`}>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
