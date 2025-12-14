"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

/**
 * ANIMATIONS - Desktop: framer-motion | Mobile: static fallbacks
 * This approach keeps animations on desktop while avoiding iOS Safari crashes
 */

// Hook to detect mobile - only runs on client
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true); // Default to mobile (safer)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

// 1. Card3D - 3D tilt effect on hover (desktop only)
export function Card3D({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || isMobile) return;
    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (isMobile) {
    return <div className={`relative ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

// 2. MagneticButton - Magnetic pull effect (desktop only)
export function MagneticButton({
  children,
  className = "",
  href
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || isMobile) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (isMobile) {
    const content = <div className={className}>{children}</div>;
    return href ? <a href={href}>{content}</a> : content;
  }

  const content = (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );

  return href ? <a href={href}>{content}</a> : content;
}

// 3. TextScramble - Scramble animation on mount (desktop only)
export function TextScramble({ text, className = "" }: { text: string; className?: string }) {
  const isMobile = useIsMobile();
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  useEffect(() => {
    if (isMobile) {
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

// 4. NumberCounter - Animated counter (desktop only)
export function NumberCounter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const isMobile = useIsMobile();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isMobile) {
      setCount(value);
      return;
    }

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

    return () => clearInterval(timer);
  }, [value, isMobile]);

  return (
    <span className="tabular-nums">
      {prefix}{count}{suffix}
    </span>
  );
}

// 5. ParallaxBackground - Static gradient blobs
export function ParallaxBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-[#0070f3]/10 blur-3xl opacity-30" />
      <div className="absolute top-1/2 -left-32 w-[300px] h-[300px] rounded-full bg-[#00c6ff]/10 blur-3xl opacity-30" />
    </div>
  );
}

// 6. ParallaxDivider - Static divider lines
export function ParallaxDivider() {
  return (
    <div className="relative h-32 overflow-hidden">
      <div className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0070f3]/50 to-transparent" />
      <div className="absolute bottom-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

// 7. HeroParallax - Static background with gradient blobs
export function HeroParallax({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#0070f3]/15 blur-[80px]" />
        <div className="absolute top-1/3 -left-24 w-[350px] h-[350px] rounded-full bg-[#00c6ff]/10 blur-[60px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-[#7928ca]/8 blur-[60px]" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// 8. AuroraBackground - Static gradient background
export function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(0,112,243,0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(121,40,202,0.08) 0%, transparent 40%),
            radial-gradient(ellipse at 40% 80%, rgba(0,198,255,0.08) 0%, transparent 40%)
          `,
        }}
      />
    </div>
  );
}

// 9. LiquidText - Just renders the text
export function LiquidText({ text, className = "" }: { text: string; className?: string }) {
  return <span className={`inline-block ${className}`}>{text}</span>;
}

// 10. GlitchText - Just renders the text
export function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  return <span className={`inline-block ${className}`}>{text}</span>;
}

// 11. InfiniteMarquee - CSS animation marquee
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

// 12. SpotlightCard - Spotlight follow effect (desktop only)
export function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || isMobile) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  if (isMobile) {
    return <div className={`relative overflow-hidden ${className}`}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0,112,243,0.15), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}

// Additional exports for compatibility

export function ParallaxLayer({
  children,
  className = ""
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  return <div className={`relative ${className}`}>{children}</div>;
}

export function MorphingBlob({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute bg-gradient-to-r from-[#0070f3] to-[#00c6ff] opacity-30 blur-3xl rounded-full ${className}`} />
  );
}

export function FloatingGrid() {
  return null;
}

export function RevealText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function TypewriterText({ text, className = "" }: { text: string; className?: string; speed?: number; delay?: number }) {
  return <span className={className}>{text}</span>;
}

export function ExplodeOnClick({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`relative ${className}`}>{children}</div>;
}

export function PerspectiveSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

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
    <div className={`relative px-8 py-4 rounded-full font-bold cursor-pointer border-2 border-[#0070f3] text-[#0070f3] hover:bg-[#0070f3] hover:text-white transition-colors ${className}`}>
      {children}
    </div>
  );
  if (href) {
    return <a href={href}>{content}</a>;
  }
  return content;
}
