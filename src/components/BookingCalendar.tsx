'use client';

import Script from 'next/script';

export default function BookingCalendar() {
  return (
    <div className="rounded-xl">
      <iframe
        src="https://api.leadconnectorhq.com/widget/booking/nKrQmOaliDo1haSUwgRS"
        id="booking-calendar"
        title="Booking Calendar"
        style={{ width: '100%', border: 'none', overflow: 'hidden' }}
        scrolling="no"
        className="rounded-2xl h-[750px] md:h-[1200px]"
      />
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
