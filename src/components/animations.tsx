"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { useMobile } from "./MobileProvider";

/**
 * ANIMATIONS - Desktop: framer-motion (lazy-loaded) | Mobile: static fallbacks
 *
 * CRITICAL: framer-motion is NOT imported in this file. All framer-motion code
 * lives in animations-desktop.tsx and is loaded via next/dynamic. This ensures
 * mobile Safari never downloads/parses the framer-motion bundle (~40KB gzipped),
 * preventing memory-pressure crashes.
 *
 * Desktop components are loaded with { ssr: false } so they only hydrate on client.
 *
 * useMobile() returns null before hydration. All checks use `isMobile !== false`
 * so that null (unknown) renders the plain fallback, preventing a flash where
 * content disappears while desktop dynamic imports load.
 */

// Dynamic imports — framer-motion only loads when these render (desktop only)
const Card3DDesktop = dynamic(() => import("./animations-desktop").then(m => ({ default: m.Card3DDesktop })), { ssr: false });
const MagneticButtonDesktopDyn = dynamic(() => import("./animations-desktop").then(m => ({ default: m.MagneticButtonDesktop })), { ssr: false });
const ParallaxBackgroundDesktop = dynamic(() => import("./animations-desktop").then(m => ({ default: m.ParallaxBackgroundDesktop })), { ssr: false });
const ParallaxDividerDesktop = dynamic(() => import("./animations-desktop").then(m => ({ default: m.ParallaxDividerDesktop })), { ssr: false });
const HeroParallaxDesktop = dynamic(() => import("./animations-desktop").then(m => ({ default: m.HeroParallaxDesktop })), { ssr: false });
const HeroParallaxDesktopEffects = dynamic(() => import("./animations-desktop").then(m => ({ default: m.HeroParallaxDesktopEffects })), { ssr: false });
const AuroraBackgroundDesktop = dynamic(() => import("./animations-desktop").then(m => ({ default: m.AuroraBackgroundDesktop })), { ssr: false });
const LiquidTextDesktop = dynamic(() => import("./animations-desktop").then(m => ({ default: m.LiquidTextDesktop })), { ssr: false });
const GlitchTextDesktop = dynamic(() => import("./animations-desktop").then(m => ({ default: m.GlitchTextDesktop })), { ssr: false });
const SpotlightCardDesktop = dynamic(() => import("./animations-desktop").then(m => ({ default: m.SpotlightCardDesktop })), { ssr: false });
const ParallaxLayerDesktop = dynamic(() => import("./animations-desktop").then(m => ({ default: m.ParallaxLayerDesktop })), { ssr: false });
const MorphingBlobDesktop = dynamic(() => import("./animations-desktop").then(m => ({ default: m.MorphingBlobDesktop })), { ssr: false });
const RevealTextDesktop = dynamic(() => import("./animations-desktop").then(m => ({ default: m.RevealTextDesktop })), { ssr: false });
const ExplodeOnClickDesktop = dynamic(() => import("./animations-desktop").then(m => ({ default: m.ExplodeOnClickDesktop })), { ssr: false });
const PerspectiveSectionDesktop = dynamic(() => import("./animations-desktop").then(m => ({ default: m.PerspectiveSectionDesktop })), { ssr: false });
const FadeInDesktop = dynamic(() => import("./animations-desktop").then(m => ({ default: m.FadeInDesktop })), { ssr: false });
const FadeInStaggerDesktop = dynamic(() => import("./animations-desktop").then(m => ({ default: m.FadeInStaggerDesktop })), { ssr: false });

// 1. Card3D
export function Card3D({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const isMobile = useMobile();
  if (isMobile !== false) return <div className={`relative ${className}`}>{children}</div>;
  return <Card3DDesktop className={className}>{children}</Card3DDesktop>;
}

// 2. MagneticButton
export function MagneticButton({
  children,
  className = "",
  href
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  const isMobile = useMobile();
  if (isMobile !== false) {
    const content = <div className={className}>{children}</div>;
    return href ? <a href={href}>{content}</a> : content;
  }
  return <MagneticButtonDesktopDyn className={className} href={href}>{children}</MagneticButtonDesktopDyn>;
}

// 3. TextScramble - No framer-motion needed (pure JS animation)
export function TextScramble({ text, className = "" }: { text: string; className?: string }) {
  const isMobile = useMobile();
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  useEffect(() => {
    if (isMobile !== false) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      iteration += 1 / 3;
      if (iteration >= text.length) clearInterval(interval);
    }, 30);

    return () => clearInterval(interval);
  }, [text, isMobile]);

  return <span className={className}>{displayText}</span>;
}

// 4. NumberCounter - No framer-motion needed (IntersectionObserver + setInterval)
export function NumberCounter({ value, suffix = "", prefix = "", formatWithCommas = false }: { value: number; suffix?: string; prefix?: string; formatWithCommas?: boolean }) {
  const isMobile = useMobile();
  const [count, setCount] = useState(0);
  const hasAnimatedRef = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  const formatNumber = (num: number) => {
    if (formatWithCommas) return num.toLocaleString('en-US');
    return num.toString();
  };

  useEffect(() => {
    // Pre-hydration: show final value immediately
    if (isMobile === null) {
      setCount(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            const duration = 2000;
            const steps = 60;
            const increment = value / steps;
            let current = 0;

            const timer = setInterval(() => {
              current += increment;
              if (current >= value) {
                setCount(value);
                clearInterval(timer);
              } else {
                setCount(Math.floor(current));
              }
            }, duration / steps);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, isMobile]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
}

// 5. ParallaxBackground
export function ParallaxBackground() {
  const isMobile = useMobile();
  if (isMobile !== false) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[300px] h-[300px] rounded-full bg-[#0070f3]/8 blur-3xl opacity-20" />
        <div className="absolute top-1/2 -left-32 w-[200px] h-[200px] rounded-full bg-[#00c6ff]/8 blur-3xl opacity-20" />
      </div>
    );
  }
  return <ParallaxBackgroundDesktop />;
}

// 6. ParallaxDivider
export function ParallaxDivider() {
  const isMobile = useMobile();
  if (isMobile !== false) {
    return (
      <div className="relative h-32 overflow-hidden">
        <div className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0070f3]/50 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    );
  }
  return <ParallaxDividerDesktop />;
}

// 7. HeroParallax
// Children stay in the same tree position always. Only the decorative blob
// layer swaps between a static mobile version and the framer-motion desktop
// version. This prevents unmount/remount of children during hydration, which
// was causing the hero to briefly collapse and flash the marquee.
export function HeroParallax({ children }: { children: React.ReactNode }) {
  const isMobile = useMobile();

  return (
    <div className="relative">
      {/* Decorative layer — swaps, but children below never unmount */}
      {isMobile !== false ? (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-16 -right-16 w-[300px] h-[300px] rounded-full bg-[#0070f3]/10 blur-[60px]" />
          <div className="absolute top-1/3 -left-12 w-[200px] h-[200px] rounded-full bg-[#00c6ff]/8 blur-[40px]" />
        </div>
      ) : (
        <Suspense fallback={null}>
          <HeroParallaxDesktopEffects />
        </Suspense>
      )}
      {/* Children always in same position — no unmount/remount */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// 8. AuroraBackground
export function AuroraBackground() {
  const isMobile = useMobile();
  if (isMobile !== false) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 20% 50%, rgba(0,112,243,0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 20%, rgba(121,40,202,0.05) 0%, transparent 40%)
            `,
          }}
        />
      </div>
    );
  }
  return <AuroraBackgroundDesktop />;
}

// 9. LiquidText
export function LiquidText({ text, className = "" }: { text: string; className?: string }) {
  const isMobile = useMobile();
  if (isMobile !== false) return <span className={`inline-block ${className}`}>{text}</span>;
  return <LiquidTextDesktop text={text} className={className} />;
}

// 10. GlitchText
export function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  const isMobile = useMobile();
  if (isMobile !== false) return <span className={`inline-block ${className}`}>{text}</span>;
  return <GlitchTextDesktop text={text} className={className} />;
}

// 11. InfiniteMarquee - CSS only, works on both
export function InfiniteMarquee({
  children,
}: {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right"
}) {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div className="inline-flex animate-marquee">
        <span className="inline-flex items-center">{children}</span>
        <span className="inline-flex items-center">{children}</span>
      </div>
    </div>
  );
}

// 12. SpotlightCard
export function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const isMobile = useMobile();
  if (isMobile !== false) return <div className={`relative overflow-hidden ${className}`}>{children}</div>;
  return <SpotlightCardDesktop className={className}>{children}</SpotlightCardDesktop>;
}

// 13. ParallaxLayer
export function ParallaxLayer({
  children,
  className = "",
  speed = 0.5
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const isMobile = useMobile();
  if (isMobile !== false) return <div className={`relative ${className}`}>{children}</div>;
  return <ParallaxLayerDesktop className={className} speed={speed}>{children}</ParallaxLayerDesktop>;
}

// 14. MorphingBlob
export function MorphingBlob({ className = "" }: { className?: string }) {
  const isMobile = useMobile();
  if (isMobile !== false) {
    return <div className={`absolute bg-gradient-to-r from-[#0070f3] to-[#00c6ff] opacity-30 blur-3xl rounded-full ${className}`} />;
  }
  return <MorphingBlobDesktop className={className} />;
}

// 15. FloatingGrid - CSS only, desktop only
export function FloatingGrid() {
  const isMobile = useMobile();
  if (isMobile !== false) return null;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,112,243,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,112,243,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}

// 16. RevealText
export function RevealText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const isMobile = useMobile();
  if (isMobile !== false) return <div className={className}>{children}</div>;
  return <RevealTextDesktop className={className}>{children}</RevealTextDesktop>;
}

// 17. TypewriterText - No framer-motion needed (pure JS)
export function TypewriterText({ text, className = "", speed = 50, delay = 0 }: { text: string; className?: string; speed?: number; delay?: number }) {
  const isMobile = useMobile();
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (isMobile !== false) {
      setDisplayText(text);
      return;
    }

    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay, isMobile]);

  return <span className={className}>{displayText}</span>;
}

// 18. ExplodeOnClick
export function ExplodeOnClick({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const isMobile = useMobile();
  if (isMobile !== false) return <div className={`relative ${className}`}>{children}</div>;
  return <ExplodeOnClickDesktop className={className}>{children}</ExplodeOnClickDesktop>;
}

// 19. PerspectiveSection
export function PerspectiveSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const isMobile = useMobile();
  if (isMobile !== false) return <div className={className}>{children}</div>;
  return <PerspectiveSectionDesktop className={className}>{children}</PerspectiveSectionDesktop>;
}

// 20. NeonButton - CSS only, works on both
export function NeonButton({
  children,
  className = "",
  href
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  const content = (
    <div className={`relative px-8 py-4 rounded-full font-bold cursor-pointer border-2 border-[#0070f3] text-[#0070f3] hover:bg-[#0070f3] hover:text-white hover:shadow-[0_0_20px_rgba(0,112,243,0.5)] transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
  if (href) return <a href={href}>{content}</a>;
  return content;
}

// 21. FadeIn
export function FadeIn({
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const isMobile = useMobile();
  if (isMobile !== false) return <div className={className}>{children}</div>;
  return (
    <Suspense fallback={<div className={className}>{children}</div>}>
      <FadeInDesktop className={className} delay={delay}>{children}</FadeInDesktop>
    </Suspense>
  );
}

// 22. FadeInStagger
export function FadeInStagger({
  children,
  className = "",
  staggerDelay = 0.1
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const isMobile = useMobile();
  if (isMobile !== false) return <div className={className}>{children}</div>;
  return (
    <Suspense fallback={<div className={className}>{children}</div>}>
      <FadeInStaggerDesktop className={className} staggerDelay={staggerDelay}>{children}</FadeInStaggerDesktop>
    </Suspense>
  );
}
