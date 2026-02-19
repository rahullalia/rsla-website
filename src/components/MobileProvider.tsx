"use client";

import { createContext, useContext, useEffect, useState } from "react";

// null = not yet determined (SSR / pre-hydration)
const MobileContext = createContext<boolean | null>(null);

export function useMobile(): boolean | null {
  return useContext(MobileContext);
}

export default function MobileProvider({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <MobileContext.Provider value={isMobile}>
      {children}
    </MobileContext.Provider>
  );
}
