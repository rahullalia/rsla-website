import type { Metadata } from 'next';
import RahulContent from './RahulContent';

export const metadata: Metadata = {
  title: 'Rahul Lalia | RSL/A',
  robots: 'noindex, nofollow',
};

export default function RahulPage() {
  return <RahulContent />;
}
