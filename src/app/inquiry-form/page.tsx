import type { Metadata } from 'next';
import InquiryFormContent from './InquiryFormContent';

export const metadata: Metadata = {
  title: 'Get in Touch | RSL/A',
  robots: 'noindex, nofollow',
};

export default function InquiryFormPage() {
  return <InquiryFormContent />;
}
