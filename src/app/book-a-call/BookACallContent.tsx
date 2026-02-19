'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Script from 'next/script';
import { useMobile } from '@/components/MobileProvider';

const BOOKING_URL = 'https://api.leadconnectorhq.com/widget/booking/GHDT7fcZ1a6Yj4t3FCx7';

export default function BookACallContent() {
  const isMobile = useMobile();

  return (
    <main className="min-h-screen bg-brand-black">
      <Navigation />

      <section className="pt-32 pb-20 md:pb-32 bg-[#080808]">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white font-display">
              Pick a time that works for you
            </h1>
          </div>
          <div className="max-w-[900px] mx-auto">
            {isMobile ? (
              <div className="flex flex-col items-center gap-6 py-12">
                <p className="text-white/60 text-center text-lg">
                  Choose a time that works best for a quick intro call.
                </p>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-brand-blue text-white font-bold text-lg rounded-full hover:shadow-[0_0_30px_rgba(0,112,243,0.4)] transition-all duration-300"
                >
                  Open Booking Calendar
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            ) : (
              <iframe
                src={BOOKING_URL}
                style={{
                  width: '100%',
                  border: 'none',
                }}
                id="client-booking-calendar"
                title="Client Booking Calendar"
                className="rounded-2xl h-[1100px]"
              />
            )}
          </div>
        </div>
      </section>

      <Footer />

      {!isMobile && (
        <Script
          src="https://link.msgsndr.com/js/form_embed.js"
          strategy="afterInteractive"
        />
      )}
    </main>
  );
}
