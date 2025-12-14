import type { Metadata } from 'next';
import TermsContent from './TermsContent';

export const metadata: Metadata = {
  title: 'Terms and Conditions | RSL/A',
  description: 'Read the Terms and Conditions for RSL/A. Understand the terms of service for using our website and services.',
  robots: 'noindex, nofollow',
  alternates: {
    canonical: 'https://rsla.io/terms',
  },
};

export default function TermsConditions() {
  return <TermsContent />;
}
