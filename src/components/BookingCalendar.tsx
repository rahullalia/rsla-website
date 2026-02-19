'use client';

import Script from 'next/script';

export default function BookingCalendar() {
  return (
    <div className="overflow-hidden rounded-xl">
      <iframe
        src="https://api.leadconnectorhq.com/widget/booking/GHDT7fcZ1a6Yj4t3FCx7"
        style={{ width: '100%', border: 'none' }}
        scrolling="no"
        id="booking-calendar"
        title="Booking Calendar"
        className="h-[750px] md:h-[950px]"
      />
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
