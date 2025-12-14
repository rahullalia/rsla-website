import type { Metadata } from 'next';
import SidContent from './SidContent';

export const metadata: Metadata = {
  title: 'Siddharth Rodrigues - Co-Founder & CTO, RSL/A',
  description: 'Connect with Siddharth Rodrigues, Co-Founder & CTO of RSL/A. Expert in software development, AI systems, and technical infrastructure.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SidContactPage() {
  return <SidContent />;
}
