'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { AuroraBackground } from '@/components/animations';

export default function PrivacyContent() {
  return (
    <main className="min-h-screen bg-brand-black text-white relative overflow-hidden">
      <Navigation />
      <AuroraBackground />

      <div className="max-w-4xl mx-auto py-24 md:py-32 px-6 md:px-12 relative z-10">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-10 text-white">
          Privacy Policy
        </h1>

        <div>
          <p className="text-lg leading-relaxed text-white/60 mb-6">
            <strong className="text-white">Effective Date:</strong> December 2025
          </p>

          <p className="text-lg leading-relaxed text-white/60 mb-6">
            This Privacy Policy (&quot;Policy&quot;) describes how <strong className="text-white">RSL/A</strong> (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, shares, and protects your personal information when you visit our website at rsla.io (the &quot;Site&quot;) or engage our services.
          </p>

          <p className="text-lg leading-relaxed text-white/60 mb-6">
            By using our Site or services, you acknowledge that you have read and understood this Policy and consent to the collection, use, and disclosure of your information as described herein.
          </p>

          <h2 className="text-2xl mt-12 mb-5 text-white font-bold">1. Information We Collect</h2>

          <h3 className="text-xl mb-3 text-white font-semibold">1.1 Personal Information You Provide</h3>
          <p className="text-lg leading-relaxed text-white/60 mb-6">
            When you use our Site, submit inquiries, engage our services, or communicate with us, you may provide:
          </p>
          <ul className="list-disc pl-8 mb-6 text-lg leading-relaxed text-white/60 space-y-2">
            <li><strong className="text-white">Contact Information:</strong> Name, email address, phone number, company name, job title.</li>
            <li><strong className="text-white">Payment Information:</strong> Credit/debit card details processed securely through third-party processors.</li>
            <li><strong className="text-white">Business Information:</strong> Industry, marketing goals, budget, website URLs.</li>
            <li><strong className="text-white">Communications:</strong> Information in your emails, messages, or calls with us.</li>
          </ul>

          <h3 className="text-xl mb-3 text-white font-semibold">1.2 Information Automatically Collected</h3>
          <ul className="list-disc pl-8 mb-6 text-lg leading-relaxed text-white/60 space-y-2">
            <li><strong className="text-white">Device Information:</strong> IP address, browser type, operating system.</li>
            <li><strong className="text-white">Usage Information:</strong> Pages visited, time spent, links clicked.</li>
            <li><strong className="text-white">Cookies:</strong> We use cookies and similar technologies to collect information.</li>
          </ul>

          <h2 className="text-2xl mt-12 mb-5 text-white font-bold">2. How We Use Your Information</h2>
          <ul className="list-disc pl-8 mb-6 text-lg leading-relaxed text-white/60 space-y-2">
            <li>Delivering services you request (marketing campaigns, website development, CRM setup, AI automation).</li>
            <li>Communicating with you about your project and providing support.</li>
            <li>Processing payments and maintaining billing records.</li>
            <li>Sending promotional emails and marketing materials (you may opt out at any time).</li>
            <li>Analyzing and improving our services and user experience.</li>
          </ul>

          <h2 className="text-2xl mt-12 mb-5 text-white font-bold">3. AI and Automation</h2>
          <p className="text-lg leading-relaxed text-white/60 mb-6">
            We use artificial intelligence tools (including Claude, ChatGPT, and other AI services) to generate content, analyze data, and automate workflows. By using our services, you consent to our use of AI tools to process your information.
          </p>

          <h2 className="text-2xl mt-12 mb-5 text-white font-bold">4. How We Share Your Information</h2>
          <p className="text-lg leading-relaxed text-white/60 mb-6">
            We do not sell your personal information. We may share information with:
          </p>
          <ul className="list-disc pl-8 mb-6 text-lg leading-relaxed text-white/60 space-y-2">
            <li><strong className="text-white">Service Providers:</strong> Payment processors, hosting providers, analytics services.</li>
            <li><strong className="text-white">Legal Requirements:</strong> When required by law or to protect our rights.</li>
            <li><strong className="text-white">Business Transfers:</strong> In connection with mergers or acquisitions.</li>
          </ul>

          <h2 className="text-2xl mt-12 mb-5 text-white font-bold">5. Data Security</h2>
          <p className="text-lg leading-relaxed text-white/60 mb-6">
            We implement reasonable security measures to protect your information. However, no method of transmission over the Internet is 100% secure.
          </p>

          <h2 className="text-2xl mt-12 mb-5 text-white font-bold">6. Your Privacy Rights</h2>
          <p className="text-lg leading-relaxed text-white/60 mb-6">
            Depending on your jurisdiction, you may have rights to access, correct, delete, or opt out of certain uses of your information. Contact us at{' '}
            <a
              href="mailto:hello@rsla.io"
              className="text-brand-blue hover:text-white transition-colors"
            >
              hello@rsla.io
            </a>{' '}
            to exercise these rights.
          </p>

          <h2 className="text-2xl mt-12 mb-5 text-white font-bold">7. Contact Us</h2>
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
