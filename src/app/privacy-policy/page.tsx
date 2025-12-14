import type { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';

export const metadata: Metadata = {
  title: 'Privacy Policy | RSL/A',
  description: 'Read the Privacy Policy for RSL/A. Learn how we collect, use, and protect your personal data when you use our website and services.',
  robots: 'noindex, nofollow',
  alternates: {
    canonical: 'https://rsla.io/privacy-policy',
  },
};

export default function PrivacyPolicy() {
  return <PrivacyContent />;
}
