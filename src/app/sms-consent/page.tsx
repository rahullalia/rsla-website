import type { Metadata } from 'next';
import SmsConsentContent from './SmsConsentContent';

export const metadata: Metadata = {
  title: 'SMS Consent | RSLA',
  description: 'Opt-in to receive SMS communications from RSLA.',
  robots: 'noindex, nofollow',
};

export default function SmsConsentPage() {
  return <SmsConsentContent />;
}
