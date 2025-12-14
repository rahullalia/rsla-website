'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AuroraBackground } from '@/components/animations';

export default function RahulContactPage() {
  const contactInfo = {
    name: 'Rahul Lalia',
    title: 'Founder & CEO, RSL/A',
    phone: '+1 646-641-3173',
    email: 'lalia@rsla.io',
    website: 'https://www.rsla.io',
    linkedin: 'https://www.linkedin.com/in/rahullalia/',
    instagram: 'https://www.instagram.com/rahul.lalia/',
    tiktok: 'https://www.tiktok.com/@rahul_lalia',
    photo: '/images/rahul.png',
    vcardUrl: '/contacts/rahul-lalia.vcf',
  };

  const smsMessage = encodeURIComponent("Hi Rahul, I'd like to connect with you.");
  const smsLink = `sms:${contactInfo.phone}?body=${smsMessage}`;

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <AuroraBackground />

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/5 border border-white/10 rounded-[24px] p-8 text-center backdrop-blur-md">
          <div className="mb-6">
            <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-brand-blue/20">
              <Image src={contactInfo.photo} alt="Rahul Lalia, Founder & CEO of RSL/A" width={128} height={128} className="w-full h-full object-cover" priority />
            </div>
          </div>

          <h1 className="text-[2rem] font-bold text-white mb-2 leading-tight font-display">{contactInfo.name}</h1>
          <p className="text-[1.1rem] text-brand-blue font-semibold mb-2">{contactInfo.title}</p>
          <p className="text-gray-400 text-sm mb-8">Marketing & AI Automation Expert</p>

          <div className="space-y-4 mb-8">
            <a href={contactInfo.vcardUrl} download="Rahul-Lalia.vcf" className="block w-full bg-brand-blue text-white px-6 py-4 rounded-full text-[1.05rem] font-semibold shadow-[0_0_20px_rgba(0,112,243,0.4)] hover:shadow-[0_0_30px_rgba(0,112,243,0.6)] transition-all duration-400 flex items-center justify-center gap-3">
              <span className="text-xl">📱</span>
              <span>Save My Info</span>
            </a>

            <a href={`tel:${contactInfo.phone}`} className="block w-full bg-transparent border-2 border-brand-blue text-white px-6 py-4 rounded-full text-[1.05rem] font-semibold hover:bg-brand-blue transition-all duration-400 flex items-center justify-center gap-3">
              <span className="text-xl">📞</span>
              <span>Let&apos;s Talk</span>
            </a>

            <a href={smsLink} className="block w-full bg-transparent border-2 border-brand-blue text-white px-6 py-4 rounded-full text-[1.05rem] font-semibold hover:bg-brand-blue transition-all duration-400 flex items-center justify-center gap-3">
              <span className="text-xl">💬</span>
              <span>Text Me</span>
            </a>

            <Link href={contactInfo.website} className="block w-full bg-transparent border-2 border-white/10 text-white px-6 py-4 rounded-full text-[1.05rem] font-semibold hover:border-brand-blue hover:bg-white/5 transition-all duration-400 flex items-center justify-center gap-3">
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
              <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-blue transition-colors duration-300" aria-label="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href={contactInfo.tiktok} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-blue transition-colors duration-300" aria-label="TikTok">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
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
