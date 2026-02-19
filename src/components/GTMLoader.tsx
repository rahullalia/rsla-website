'use client';

import { useEffect } from 'react';

/**
 * GTMLoader - Loads Google Tag Manager on desktop only.
 *
 * Mobile (<768px): GTM is skipped entirely to prevent Safari memory crashes.
 * Desktop analytics coverage is sufficient for tracking purposes.
 */
export default function GTMLoader() {
  useEffect(() => {
    if (window.innerWidth < 768) return;

    if (document.querySelector('script[src*="googletagmanager.com/gtm.js"]')) return;
    const w = window as typeof window & { dataLayer: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-MVJQSMF8';
    document.head.appendChild(script);
  }, []);

  return null;
}
