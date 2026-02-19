"use client";

import { useState, useEffect } from "react";

/**
 * MarqueeReveal — keeps children at opacity:0 until React has hydrated
 * and the DOM is stable (double rAF). This prevents the marquee from
 * flashing at the top of the viewport on hard refresh before layout settles.
 */
export default function MarqueeReveal({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Double rAF: first frame = browser has painted, second = layout is stable
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setVisible(true);
      });
    });
  }, []);

  return (
    <div
      className="py-8 border-y border-white/5 bg-[#080808] transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {children}
    </div>
  );
}
