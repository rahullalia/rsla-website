'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Script from 'next/script';

export default function ChatWidget() {
  const pathname = usePathname();
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Check if user has made a cookie choice
    const checkConsent = () => {
      const consent = localStorage.getItem('cookie-consent');
      setHasConsent(!!consent);
    };

    // Check immediately
    checkConsent();

    // Listen for storage changes (in case consent is given)
    const handleStorage = () => checkConsent();
    window.addEventListener('storage', handleStorage);

    // Also poll briefly in case consent is set in same tab
    const interval = setInterval(checkConsent, 500);

    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, []);

  const hideChatWidget = pathname === '/rahul' || pathname === '/sid' || pathname === '/insider';

  // Don't render chat widget on business card/insider pages or before cookie consent
  if (hideChatWidget || !hasConsent) {
    return null;
  }

  return (
    <Script
      src="https://beta.leadconnectorhq.com/loader.js"
      data-resources-url="https://beta.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id="6924d98920fcaa4ee73ce9db"
      strategy="lazyOnload"
    />
  );
}
