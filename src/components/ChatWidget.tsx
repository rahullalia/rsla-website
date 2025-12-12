'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

export default function ChatWidget() {
  const pathname = usePathname();

  // Don't show chat widget on blog pages (can be customized)
  const hiddenPaths = ['/blog'];
  const shouldShow = !hiddenPaths.some(path => pathname?.startsWith(path));

  if (!shouldShow) return null;

  return (
    <Script
      src="https://beta.leadconnectorhq.com/loader.js"
      data-resources-url="https://beta.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id="6924d98920fcaa4ee73ce9db"
      strategy="lazyOnload"
    />
  );
}
