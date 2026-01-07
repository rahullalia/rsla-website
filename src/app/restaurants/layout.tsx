import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Restaurant Growth System | RSL/A',
  description: 'Discover how to bring back inactive customers and get more Google reviews for your restaurant. Take our 60-second assessment.',
  robots: 'noindex, nofollow', // Hidden until campaign launches
};

export default function RestaurantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
