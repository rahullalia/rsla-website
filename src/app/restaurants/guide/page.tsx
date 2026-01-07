import type { Metadata } from 'next';
import GuideContent from './GuideContent';

export const metadata: Metadata = {
  title: 'Restaurant Growth Guide | RSL/A',
  description: 'The exact playbook we used to add $25K in revenue and get 118 Google reviews for a Queens pizzeria in 60 days.',
  robots: 'noindex, nofollow', // Hidden until campaign launches
};

export default function GuidePage() {
  return <GuideContent />;
}
