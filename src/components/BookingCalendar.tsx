'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function BookingCalendar() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (isMobile) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400 text-lg mb-8">
          Schedule a free strategy call. We&apos;ll show you what&apos;s possible.
        </p>
        <Link
          href="/book-a-call"
          className="inline-flex items-center justify-center px-8 py-4 bg-white text-black text-lg font-bold rounded-full hover:bg-brand-blue hover:text-white transition-all duration-300 group"
        >
          Book a Call
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <iframe
      src="https://api.leadconnectorhq.com/widget/booking/nKrQmOaliDo1haSUwgRS"
      style={{ width: '100%', border: 'none' }}
      id="booking-calendar"
      title="Booking Calendar"
      className="h-[800px]"
    />
  );
}
