'use client';

import { useEffect, useRef } from 'react';

export default function BookingCalendar() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (typeof e.data !== 'string' || !e.data.startsWith('[iFrameSizer]')) return;
      const parts = e.data.replace('[iFrameSizer]', '').split(':');
      const h = parseFloat(parts[1]);
      if (!isNaN(h) && h > 0 && iframeRef.current) {
        iframeRef.current.style.height = `${h}px`;
        iframeRef.current.style.minHeight = `${h}px`;
      }
    }

    window.addEventListener('message', handleMessage);

    // Load form_embed.js AFTER iframe is in the DOM so iFrameResizer finds it
    if (!document.querySelector('script[src*="form_embed.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://link.msgsndr.com/js/form_embed.js';
      script.async = true;
      document.body.appendChild(script);
    }

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="rounded-xl">
      <iframe
        ref={iframeRef}
        src="https://api.leadconnectorhq.com/widget/booking/nKrQmOaliDo1haSUwgRS"
        id="booking-calendar"
        title="Booking Calendar"
        className="w-full border-none min-h-[750px] md:min-h-[950px]"
      />
    </div>
  );
}
