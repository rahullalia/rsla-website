import type { Metadata } from 'next';
import SmsConsentContent from './SmsConsentContent';

export const metadata: Metadata = {
  title: 'SMS Consent | RSL/A',
  description: 'Opt-in to receive SMS communications from RSL/A.',
  robots: 'noindex, nofollow',
};

export default function SmsConsentPage() {
  return <SmsConsentContent />;
}
