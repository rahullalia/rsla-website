'use client';

import Script from 'next/script';

export default function BookingCalendar() {
  return (
    <div className="rounded-xl">
      <iframe
        src="https://api.leadconnectorhq.com/widget/booking/nKrQmOaliDo1haSUwgRS"
        style={{ width: '100%', border: 'none', minHeight: '750px' }}
        id="booking-calendar"
        title="Booking Calendar"
        className="min-h-[750px] md:min-h-[950px]"
      />
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
