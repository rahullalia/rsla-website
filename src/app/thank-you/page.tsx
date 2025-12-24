import type { Metadata } from 'next';
import ThankYouContent from './ThankYouContent';

export const metadata: Metadata = {
  title: 'You\'re All Set | RSL/A',
  description: 'Your strategy call has been booked. We\'ll see you soon.',
  robots: 'noindex, nofollow',
};

export default function ThankYouPage() {
  return <ThankYouContent />;
}
