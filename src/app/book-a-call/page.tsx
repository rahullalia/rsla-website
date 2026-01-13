import type { Metadata } from 'next';
import BookACallContent from './BookACallContent';

export const metadata: Metadata = {
  title: 'Book a Call | RSL/A',
  description: 'Schedule an onboarding or support call with RSL/A.',
  robots: 'noindex, nofollow',
};

export default function BookACallPage() {
  return <BookACallContent />;
}
