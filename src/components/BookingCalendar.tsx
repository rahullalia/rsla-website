'use client';

import Script from 'next/script';
import { ArrowRight } from 'lucide-react';
import { useMobile } from './MobileProvider';

export default function BookingCalendar() {
  const isMobile = useMobile();

  if (isMobile) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400 text-lg mb-8">
          Schedule a free strategy call. We&apos;ll show you what&apos;s possible.
        </p>
        <a
          href="https://api.leadconnectorhq.com/widget/booking/nKrQmOaliDo1haSUwgRS"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-4 bg-white text-black text-lg font-bold rounded-full hover:bg-brand-blue hover:text-white transition-all duration-300 group"
        >
          Book a Call
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl">
      <iframe
        src="https://api.leadconnectorhq.com/widget/booking/nKrQmOaliDo1haSUwgRS"
        style={{ width: '100%', border: 'none' }}
        scrolling="no"
        id="booking-calendar"
        title="Booking Calendar"
        className="h-[950px]"
      />
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
