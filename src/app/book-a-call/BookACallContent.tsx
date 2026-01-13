'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Script from 'next/script';

export default function BookACallContent() {
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
            <iframe
              src="https://api.leadconnectorhq.com/widget/booking/GHDT7fcZ1a6Yj4t3FCx7"
              style={{
                width: '100%',
                border: 'none',
                overflow: 'hidden',
              }}
              scrolling="no"
              id="client-booking-calendar"
              title="Client Booking Calendar"
              className="rounded-2xl h-[700px] md:h-[1100px]"
            />
          </div>
        </div>
      </section>

      <Footer />

      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="lazyOnload"
      />
    </main>
  );
}
