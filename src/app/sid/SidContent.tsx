'use client';

import Link from 'next/link';
import Image from 'next/image';
import { AuroraBackground } from '@/components/animations';

export default function SidContent() {
  const contactInfo = {
    name: 'Siddharth Rodrigues',
    title: 'Co-Founder & CTO, RSL/A',
    phone: '+91 93562 52711',
    email: 'rodrigues@rsla.io',
    website: 'https://rsla.io',
    linkedin: 'https://www.linkedin.com/in/dorddis/',
    photo: '/images/siddharth.png',
    vcardUrl: '/contacts/siddharth-rodrigues.vcf',
  };

  const smsMessage = encodeURIComponent("Hi Sid, I'd like to connect with you.");
  const smsLink = `sms:${contactInfo.phone}?body=${smsMessage}`;

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <AuroraBackground />

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/5 border border-white/10 rounded-[24px] p-8 text-center backdrop-blur-md">
          <div className="mb-6">
            <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-brand-blue/20">
              <Image src={contactInfo.photo} alt="Siddharth Rodrigues, Co-Founder & CTO of RSL/A" fill className="object-cover" />
            </div>
          </div>

          <h1 className="text-[2rem] font-bold text-white mb-2 leading-tight font-display">{contactInfo.name}</h1>
          <p className="text-[1.1rem] text-brand-blue font-semibold mb-2">{contactInfo.title}</p>
          <p className="text-gray-400 text-sm mb-8">Software Development & AI Systems Expert</p>

          <div className="space-y-4 mb-8">
            <a href={contactInfo.vcardUrl} download="Siddharth-Rodrigues.vcf" className="group relative overflow-hidden block w-full bg-brand-blue text-white px-6 py-4 rounded-full text-[1.05rem] font-semibold shadow-[0_0_20px_rgba(0,112,243,0.3)] hover:shadow-[0_0_30px_rgba(0,112,243,0.5)] transition-all duration-300 flex items-center justify-center gap-3">
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span className="relative z-10 inline-flex items-center gap-3"><span className="text-xl">📱</span>Save My Info</span>
            </a>

            <a href={`tel:${contactInfo.phone}`} className="block w-full bg-transparent border border-white/20 text-white px-6 py-4 rounded-full text-[1.05rem] font-medium hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3">
              <span className="text-xl">📞</span>
              <span>Let&apos;s Talk</span>
            </a>

            <a href={smsLink} className="block w-full bg-transparent border border-white/20 text-white px-6 py-4 rounded-full text-[1.05rem] font-medium hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3">
              <span className="text-xl">💬</span>
              <span>Text Me</span>
            </a>

            <Link href={contactInfo.website} className="block w-full bg-white/5 border border-white/10 text-white px-6 py-4 rounded-full text-[1.05rem] font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-3">
              <span className="text-xl">🌐</span>
              <span>Visit Website</span>
            </Link>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <a href={`mailto:${contactInfo.email}`} className="flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors duration-300">
              <span className="text-sm">📧</span>
              <span className="text-sm">{contactInfo.email}</span>
            </a>

            <div className="flex items-center justify-center gap-6 pt-4">
              <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-blue transition-colors duration-300" aria-label="LinkedIn">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <Link href="/" className="text-xs text-gray-400 hover:text-brand-blue transition-colors duration-300">Powered by RSL/A</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
