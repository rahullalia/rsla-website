'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

export default function BookingCalendar() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (typeof e.data !== 'string' || !e.data.startsWith('[iFrameSizer]')) return;
      // Format: [iFrameSizer]ID:HEIGHT:WIDTH:TYPE
      const parts = e.data.replace('[iFrameSizer]', '').split(':');
      const h = parseFloat(parts[1]);
      if (!isNaN(h) && h > 0) {
        setHeight(h);
      }
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="rounded-xl">
      <iframe
        ref={iframeRef}
        src="https://api.leadconnectorhq.com/widget/booking/nKrQmOaliDo1haSUwgRS"
        style={{
          width: '100%',
          border: 'none',
          height: height ? `${height}px` : undefined,
        }}
        scrolling="no"
        id="booking-calendar"
        title="Booking Calendar"
        className={`min-h-[750px] md:min-h-[950px] transition-[height] duration-300 ease-in-out`}
      />
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
