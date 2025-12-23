import type { Metadata } from 'next';
import InsiderContent from './InsiderContent';

export const metadata: Metadata = {
  title: 'Insider Newsletter | RSL/A',
  robots: 'noindex, nofollow',
};

export default function InsiderPage() {
  return <InsiderContent />;
}
