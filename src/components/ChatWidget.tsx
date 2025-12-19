'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';

export default function ChatWidget() {
  const pathname = usePathname();
  const hideChatWidget = pathname === '/rahul' || pathname === '/sid' || pathname === '/insider';

  // Don't render chat widget on business card or insider pages
  if (hideChatWidget) {
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
