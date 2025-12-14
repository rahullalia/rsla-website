'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { AuroraBackground } from '@/components/animations';

export default function TermsContent() {
  return (
    <main className="min-h-screen bg-brand-black text-white relative overflow-hidden">
      <Navigation />
      <AuroraBackground />

      <div className="max-w-4xl mx-auto py-24 md:py-32 px-6 md:px-12 relative z-10">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-10 text-white">
          Terms and Conditions
        </h1>

        <div>
          <p className="text-lg leading-relaxed text-white/60 mb-6">
            <strong className="text-white">Effective Date:</strong> December 2025
          </p>

          <p className="text-lg leading-relaxed text-white/60 mb-6">
            These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of the website, services, and products provided by <strong className="text-white">RSL/A</strong> (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing or using our website at rsla.io (the &quot;Site&quot;) or engaging our services, you agree to be bound by these Terms.
          </p>

          <h2 className="text-2xl mt-12 mb-5 text-white font-bold">1. Acceptance of Terms</h2>
          <p className="text-lg leading-relaxed text-white/60 mb-6">
            By accessing or using the Site, submitting any inquiry, or engaging our services, you acknowledge that you have read, understood, and agree to be bound by these Terms, including our Privacy Policy.
          </p>

          <h2 className="text-2xl mt-12 mb-5 text-white font-bold">2. Services Provided</h2>
          <p className="text-lg leading-relaxed text-white/60 mb-6">
            RSL/A provides marketing, automation, website development, CRM implementation, local SEO, paid advertising, AI automation, and related professional services. The specific scope of Services will be outlined in a separate Service Agreement or proposal.
          </p>

          <h2 className="text-2xl mt-12 mb-5 text-white font-bold">3. No Refund Policy</h2>
          <p className="text-lg leading-relaxed text-white/60 mb-6">
            <strong className="text-white">ALL SALES ARE FINAL. RSL/A DOES NOT OFFER REFUNDS UNDER ANY CIRCUMSTANCES.</strong>
          </p>
          <ul className="list-disc pl-8 mb-6 text-lg leading-relaxed text-white/60 space-y-2">
            <li>No refunds will be issued for any Services, whether completed, in progress, or not yet started.</li>
            <li>All payments are non-refundable, including setup fees, monthly retainers, and project fees.</li>
            <li>Dissatisfaction with results does not entitle you to a refund.</li>
          </ul>

          <h2 className="text-2xl mt-12 mb-5 text-white font-bold">4. Payment Terms</h2>
          <ul className="list-disc pl-8 mb-6 text-lg leading-relaxed text-white/60 space-y-2">
            <li>Setup fees and one-time project fees are due in full before work commences.</li>
            <li>Monthly retainers are billed in advance.</li>
            <li>Late payments will incur a late fee of 1.5% per month.</li>
          </ul>

          <h2 className="text-2xl mt-12 mb-5 text-white font-bold">5. No Guarantees</h2>
          <p className="text-lg leading-relaxed text-white/60 mb-6">
            WE DO NOT GUARANTEE ANY SPECIFIC RESULTS FROM OUR SERVICES. Marketing, SEO, paid advertising, and automation services are inherently variable and depend on numerous factors outside our control.
          </p>

          <h2 className="text-2xl mt-12 mb-5 text-white font-bold">6. Use of AI Tools</h2>
          <p className="text-lg leading-relaxed text-white/60 mb-6">
            We use artificial intelligence tools, including Claude, ChatGPT, and other AI services, to provide and improve our Services. By engaging our Services, you consent to our use of AI tools to process your information.
          </p>

          <h2 className="text-2xl mt-12 mb-5 text-white font-bold">7. Intellectual Property</h2>
          <p className="text-lg leading-relaxed text-white/60 mb-6">
            Upon receipt of full payment, you will own the final deliverables created specifically for you. However, we retain ownership of all pre-existing materials, templates, and methodologies.
          </p>

          <h2 className="text-2xl mt-12 mb-5 text-white font-bold">8. Limitation of Liability</h2>
          <p className="text-lg leading-relaxed text-white/60 mb-6">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL AGGREGATE LIABILITY SHALL NOT EXCEED THE TOTAL AMOUNT PAID BY YOU IN THE THREE (3) MONTHS PRECEDING THE EVENT GIVING RISE TO LIABILITY.
          </p>

          <h2 className="text-2xl mt-12 mb-5 text-white font-bold">9. Governing Law</h2>
          <p className="text-lg leading-relaxed text-white/60 mb-6">
            These Terms shall be governed by and construed in accordance with the laws of the State of New York.
          </p>

          <h2 className="text-2xl mt-12 mb-5 text-white font-bold">10. Contact Information</h2>
          <p className="text-lg leading-relaxed text-white/60 mb-6">
            <strong className="text-white">RSL/A</strong><br />
            Email:{' '}
            <a
              href="mailto:hello@rsla.io"
              className="text-brand-blue hover:text-white transition-colors"
            >
              hello@rsla.io
            </a>
          </p>

          <p className="mt-16 text-lg text-white/40 italic">
            Last updated: December 2025
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/40 text-sm">
            © {new Date().getFullYear()} RSL/A. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy-policy" className="text-white/40 hover:text-brand-blue transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/40 hover:text-brand-blue transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
