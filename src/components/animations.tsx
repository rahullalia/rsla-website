"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useMobile } from "./MobileProvider";

/**
 * ANIMATIONS - Desktop: framer-motion | Mobile: static fallbacks
 *
 * CRITICAL: iOS Safari crashes with next/image on React 19 + Next.js 16
 * All animations use useMobile() context (single resize listener for entire app)
 *
 * Desktop gets full animations, mobile gets clean static HTML
 */

// Backward-compatible alias for internal use
function useIsMobile() {
  return useMobile();
}

// 1. Card3D - Lift and highlight effect on hover (desktop only)
export function Card3D({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <div className={`relative ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
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

// 4. NumberCounter - Animated counter that triggers when scrolled into view
export function NumberCounter({ value, suffix = "", prefix = "", formatWithCommas = false }: { value: number; suffix?: string; prefix?: string; formatWithCommas?: boolean }) {
  const isMobile = useIsMobile();
  const [count, setCount] = useState(0);
  const hasAnimatedRef = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  const formatNumber = (num: number) => {
    if (formatWithCommas) {
      return num.toLocaleString('en-US');
    }
    return num.toString();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            const duration = isMobile ? 1200 : 2000;
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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, isMobile]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
}

// 5. ParallaxBackground - Parallax scrolling gradient blobs (desktop only)
function ParallaxBackgroundDesktop() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-[#0070f3]/10 blur-3xl opacity-30"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute top-1/2 -left-32 w-[300px] h-[300px] rounded-full bg-[#00c6ff]/10 blur-3xl opacity-30"
        style={{ y: y2 }}
      />
    </div>
  );
}

export function ParallaxBackground() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-[#0070f3]/10 blur-3xl opacity-30" />
        <div className="absolute top-1/2 -left-32 w-[300px] h-[300px] rounded-full bg-[#00c6ff]/10 blur-3xl opacity-30" />
      </div>
    );
  }

  return <ParallaxBackgroundDesktop />;
}

// 6. ParallaxDivider - Animated divider lines (desktop only)
function ParallaxDividerDesktop() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [0.3, 1]);

  return (
    <div className="relative h-32 overflow-hidden">
      <motion.div
        className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0070f3]/50 to-transparent"
        style={{ opacity }}
      />
      <motion.div
        className="absolute bottom-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        style={{ opacity }}
      />
    </div>
  );
}

export function ParallaxDivider() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="relative h-32 overflow-hidden">
        <div className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0070f3]/50 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    );
  }

  return <ParallaxDividerDesktop />;
}

// 7. HeroParallax - Parallax background for hero sections (desktop only)
function HeroParallaxDesktop({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  const y3 = useTransform(scrollY, [0, 500], [0, -75]);

  return (
    <div className="relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#0070f3]/15 blur-[80px]"
          style={{ y: y1 }}
        />
        <motion.div
          className="absolute top-1/3 -left-24 w-[350px] h-[350px] rounded-full bg-[#00c6ff]/10 blur-[60px]"
          style={{ y: y2 }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-[#7928ca]/8 blur-[60px]"
          style={{ y: y3 }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function HeroParallax({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  if (isMobile) {
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

  return <HeroParallaxDesktop>{children}</HeroParallaxDesktop>;
}

// 8. AuroraBackground - Animated aurora effect (desktop only)
function AuroraBackgroundDesktop() {
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 2000], [0, 360]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.2]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-[-50%] origin-center"
        style={{
          rotate,
          scale,
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

export function AuroraBackground() {
  const isMobile = useIsMobile();

  if (isMobile) {
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

  return <AuroraBackgroundDesktop />;
}

// 9. LiquidText - Animated text effect (desktop only)
export function LiquidText({ text, className = "" }: { text: string; className?: string }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <span className={`inline-block ${className}`}>{text}</span>;
  }

  return (
    <motion.span
      className={`inline-block ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {text}
    </motion.span>
  );
}

// 10. GlitchText - Glitch effect on hover (desktop only)
export function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <span className={`inline-block ${className}`}>{text}</span>;
  }

  return (
    <motion.span
      className={`inline-block relative ${className}`}
      whileHover={{ x: [0, -2, 2, -2, 0] }}
      transition={{ duration: 0.3 }}
    >
      {text}
    </motion.span>
  );
}

// 11. InfiniteMarquee - CSS animation marquee (works on both)
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
        className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0,112,243,0.15), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}

// 13. ParallaxLayer - Parallax scroll layer (desktop only)
function ParallaxLayerDesktop({
  children,
  className = "",
  speed = 0.5
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -200 * speed]);

  return (
    <motion.div className={`relative ${className}`} style={{ y }}>
      {children}
    </motion.div>
  );
}

export function ParallaxLayer({
  children,
  className = "",
  speed = 0.5
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <div className={`relative ${className}`}>{children}</div>;
  }

  return <ParallaxLayerDesktop className={className} speed={speed}>{children}</ParallaxLayerDesktop>;
}

// 14. MorphingBlob - Animated morphing blob (desktop only)
export function MorphingBlob({ className = "" }: { className?: string }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className={`absolute bg-gradient-to-r from-[#0070f3] to-[#00c6ff] opacity-30 blur-3xl rounded-full ${className}`} />
    );
  }

  return (
    <motion.div
      className={`absolute bg-gradient-to-r from-[#0070f3] to-[#00c6ff] opacity-30 blur-3xl rounded-full ${className}`}
      animate={{
        scale: [1, 1.1, 1],
        borderRadius: ["50%", "40%", "50%"],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// 15. FloatingGrid - Floating grid effect (desktop only)
export function FloatingGrid() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return null;
  }

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

// 16. RevealText - Text reveal on scroll (desktop only)
export function RevealText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);

  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// 17. TypewriterText - Typewriter effect (desktop only)
export function TypewriterText({ text, className = "", speed = 50, delay = 0 }: { text: string; className?: string; speed?: number; delay?: number }) {
  const isMobile = useIsMobile();
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (isMobile) {
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

// 18. ExplodeOnClick - Particle explosion on click (desktop only)
export function ExplodeOnClick({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <div className={`relative ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      className={`relative ${className}`}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  );
}

// 19. PerspectiveSection - 3D perspective on scroll (desktop only)
function PerspectiveSectionDesktop({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX,
        transformPerspective: 1000,
        transformStyle: "preserve-3d"
      }}
    >
      {children}
    </motion.div>
  );
}

export function PerspectiveSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return <PerspectiveSectionDesktop className={className}>{children}</PerspectiveSectionDesktop>;
}

// 20. NeonButton - Neon glow button (works on both with CSS)
export function NeonButton({
  children,
  className = "",
  href
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  const isMobile = useIsMobile();

  const content = (
    <div className={`relative px-8 py-4 rounded-full font-bold cursor-pointer border-2 border-[#0070f3] text-[#0070f3] hover:bg-[#0070f3] hover:text-white hover:shadow-[0_0_20px_rgba(0,112,243,0.5)] transition-all duration-300 ${className}`}>
      {children}
    </div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }
  return content;
}

// 21. FadeIn - Fade in animation (desktop only)
export function FadeIn({
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// 22. FadeInStagger - Staggered fade in for lists (desktop only)
export function FadeInStagger({
  children,
  className = "",
  staggerDelay = 0.1
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
