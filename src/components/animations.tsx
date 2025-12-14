"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";

// Mobile detection - SSR-safe, defaults to true (mobile) to prevent heavy animations on first render
function useIsMobile() {
  // Default to true (mobile) so we don't run heavy animations during SSR/hydration
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      return window.innerWidth < 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };
    setIsMobile(checkMobile());
  }, []);

  return isMobile;
}

// 1. 3D CARD TILT COMPONENT - Desktop only, static on mobile
export function Card3D({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const isMobile = useIsMobile();

  // On mobile, just render children without any transforms
  if (isMobile) {
    return <div className={`relative ${className}`}>{children}</div>;
  }

  return <Card3DDesktop className={className}>{children}</Card3DDesktop>;
}

function Card3DDesktop({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
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

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      <div style={{ transform: "translateZ(20px)" }}>{children}</div>
    </motion.div>
  );
}

// 2. MAGNETIC BUTTON COMPONENT - Desktop only, static on mobile
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

  // On mobile, render static button
  if (isMobile) {
    const content = <div className={className}>{children}</div>;
    if (href) {
      return <a href={href}>{content}</a>;
    }
    return content;
  }

  return <MagneticButtonDesktop className={className} href={href}>{children}</MagneticButtonDesktop>;
}

function MagneticButtonDesktop({
  children,
  className = "",
  href
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
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

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return content;
}

// 3. TEXT SCRAMBLE COMPONENT
export function TextScramble({ text, className = "" }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      iteration += 1 / 3;
      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, 30);
  };

  return (
    <span
      className={`cursor-pointer ${className}`}
      onMouseEnter={scramble}
    >
      {displayText}
    </span>
  );
}

// 4. MORPHING BLOB
export function MorphingBlob({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`absolute bg-gradient-to-r from-[#0070f3] to-[#00c6ff] opacity-30 blur-3xl ${className}`}
      animate={{
        borderRadius: [
          "60% 40% 30% 70%/60% 30% 70% 40%",
          "30% 60% 70% 40%/50% 60% 30% 60%",
          "60% 40% 30% 70%/60% 30% 70% 40%",
        ],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// 5. NUMBER COUNTER
export function NumberCounter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * value));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count}{suffix}
    </span>
  );
}

// 6. PARALLAX SECTION - Desktop only
export function ParallaxLayer({
  children,
  speed = 0.5,
  className = ""
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const isMobile = useIsMobile();

  // On mobile, just render children without parallax
  if (isMobile) {
    return <div className={`relative ${className}`}>{children}</div>;
  }

  return <ParallaxLayerDesktop speed={speed} className={className}>{children}</ParallaxLayerDesktop>;
}

function ParallaxLayerDesktop({
  children,
  speed = 0.5,
  className = ""
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

// 7. PARALLAX BACKGROUND WITH FLOATING ELEMENTS - Desktop only
export function ParallaxBackground() {
  const isMobile = useIsMobile();

  // On mobile, render static blobs
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

function ParallaxBackgroundDesktop() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.1]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Slow moving gradient blob */}
      <motion.div
        style={{ y: y3, opacity }}
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#0070f3]/10 blur-3xl"
      />

      {/* Medium speed blob */}
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full bg-[#00c6ff]/10 blur-3xl"
      />

      {/* Fast moving accent */}
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-0 right-1/4 w-[200px] h-[200px] rounded-full bg-[#7928ca]/10 blur-3xl"
      />
    </div>
  );
}

// 8. HORIZONTAL PARALLAX DIVIDER - Desktop only
export function ParallaxDivider() {
  const isMobile = useIsMobile();

  // On mobile, render static divider
  if (isMobile) {
    return (
      <div className="relative h-32 overflow-hidden">
        <div className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    );
  }

  return <ParallaxDividerDesktop />;
}

function ParallaxDividerDesktop() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const x2 = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div ref={ref} className="relative h-32 overflow-hidden">
      <motion.div
        style={{ x: x1 }}
        className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0070f3]/50 to-transparent"
      />
      <motion.div
        style={{ x: x2 }}
        className="absolute bottom-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
    </div>
  );
}

// 9. HERO PARALLAX - Multi-layer depth effect for hero sections
export function HeroParallax({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  // On mobile, just render children with static background
  if (isMobile) {
    return (
      <div className="relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-[#0070f3]/15 blur-[80px]" />
          <div className="absolute top-1/3 -left-24 w-[300px] h-[300px] rounded-full bg-[#00c6ff]/10 blur-[60px]" />
        </div>
        <div>{children}</div>
      </div>
    );
  }

  return <HeroParallaxDesktop>{children}</HeroParallaxDesktop>;
}

// Desktop-only version with all the animations
function HeroParallaxDesktop({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Content moves up slower (creates depth)
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Background blobs move faster (parallax effect)
  const blob1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const blob3Y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Grid opacity
  const gridOpacity = useTransform(scrollYProgress, [0, 0.3], [0.03, 0]);

  // Static particles (generated once, no hooks in render)
  const particles = [
    { id: 0, x: 15, y: 20, size: 2, opacity: 0.3 },
    { id: 1, x: 85, y: 15, size: 3, opacity: 0.4 },
    { id: 2, x: 45, y: 70, size: 2, opacity: 0.25 },
    { id: 3, x: 70, y: 40, size: 1.5, opacity: 0.35 },
    { id: 4, x: 25, y: 55, size: 2.5, opacity: 0.3 },
    { id: 5, x: 90, y: 65, size: 2, opacity: 0.4 },
    { id: 6, x: 10, y: 80, size: 1.5, opacity: 0.25 },
    { id: 7, x: 55, y: 25, size: 3, opacity: 0.35 },
  ];

  return (
    <div ref={ref} className="relative">
      {/* Parallax background layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient blob 1 - top right, moves slowest */}
        <motion.div
          style={{ y: blob3Y }}
          className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full bg-[#0070f3]/15 blur-[100px]"
        />

        {/* Gradient blob 2 - left side, medium speed */}
        <motion.div
          style={{ y: blob1Y }}
          className="absolute top-1/3 -left-48 w-[500px] h-[500px] rounded-full bg-[#00c6ff]/10 blur-[80px]"
        />

        {/* Gradient blob 3 - bottom, moves fastest */}
        <motion.div
          style={{ y: blob2Y }}
          className="absolute -bottom-32 right-1/4 w-[400px] h-[400px] rounded-full bg-[#7928ca]/10 blur-[60px]"
        />

        {/* Static floating particles (CSS animation only, no hooks) */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            className="absolute rounded-full bg-[#0070f3]"
            initial={{ opacity: particle.opacity }}
            animate={{
              opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.id * 0.5,
            }}
          />
        ))}

        {/* Grid lines that fade as you scroll */}
        <motion.div
          style={{ opacity: gridOpacity }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} />
        </motion.div>
      </div>

      {/* Content with parallax */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// 10. FLOATING GRID - Animated grid background (desktop only)
export function FloatingGrid() {
  const isMobile = useIsMobile();

  // On mobile, render nothing (too heavy)
  if (isMobile) {
    return null;
  }

  return <FloatingGridDesktop />;
}

function FloatingGridDesktop() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.08, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="absolute inset-0 pointer-events-none"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,112,243,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,112,243,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
        }}
      />
    </motion.div>
  );
}

// 11. LIQUID MORPH TEXT - Text that morphs with liquid effect
export function LiquidText({ text, className = "" }: { text: string; className?: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.span
      className={`inline-block relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          animate={isHovered ? {
            y: [0, -20, 0],
            rotateX: [0, 360, 0],
            scale: [1, 1.2, 1],
          } : {}}
          transition={{
            duration: 0.6,
            delay: i * 0.03,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          style={{ display: 'inline-block', transformStyle: 'preserve-3d' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// 12. AURORA BACKGROUND - Northern lights effect
export function AuroraBackground() {
  const isMobile = useIsMobile();

  // Static version for mobile - no animations
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

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%]"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(0,112,243,0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(121,40,202,0.1) 0%, transparent 40%),
            radial-gradient(ellipse at 40% 80%, rgba(0,198,255,0.1) 0%, transparent 40%)
          `,
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 60, repeat: Infinity, ease: "linear" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 60% 40%, rgba(0,112,243,0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 30% 70%, rgba(0,198,255,0.08) 0%, transparent 40%)
          `,
        }}
        animate={{
          rotate: [360, 0],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

// 13. GLITCH TEXT - Cyberpunk glitch effect
export function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      {isGlitching && (
        <>
          <motion.span
            className="absolute inset-0 text-[#0070f3]"
            style={{ clipPath: 'inset(20% 0 60% 0)' }}
            animate={{ x: [-2, 2, -2], opacity: [0.8, 0.9, 0.8] }}
            transition={{ duration: 0.1, repeat: 2 }}
          >
            {text}
          </motion.span>
          <motion.span
            className="absolute inset-0 text-[#ff0080]"
            style={{ clipPath: 'inset(60% 0 10% 0)' }}
            animate={{ x: [2, -2, 2], opacity: [0.8, 0.9, 0.8] }}
            transition={{ duration: 0.1, repeat: 2 }}
          >
            {text}
          </motion.span>
        </>
      )}
    </span>
  );
}

// 14. REVEAL ON SCROLL - Dramatic text reveal
export function RevealText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// 15. INFINITE MARQUEE - Smooth scrolling text
export function InfiniteMarquee({
  children,
  speed = 20,
  direction = "left"
}: {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right"
}) {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-flex"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        <span className="inline-flex items-center">{children}</span>
        <span className="inline-flex items-center">{children}</span>
      </motion.div>
    </div>
  );
}

// 16. SPOTLIGHT EFFECT - Follows cursor with dramatic lighting (desktop only)
export function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const isMobile = useIsMobile();

  // On mobile, just render children without spotlight effect
  if (isMobile) {
    return <div className={`relative overflow-hidden ${className}`}>{children}</div>;
  }

  return <SpotlightCardDesktop className={className}>{children}</SpotlightCardDesktop>;
}

function SpotlightCardDesktop({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: isHovered
            ? `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0,112,243,0.15), transparent 40%)`
            : 'transparent',
        }}
        transition={{ duration: 0.15 }}
      />
      {children}
    </div>
  );
}

// 17. TYPEWRITER EFFECT
export function TypewriterText({
  text,
  className = "",
  speed = 50,
  delay = 0
}: {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={className}>
      {displayedText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
    </span>
  );
}

// 18. EXPLODING PARTICLES ON CLICK
export function ExplodeOnClick({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; angle: number }>>([]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
      angle: (i * 30) * (Math.PI / 180),
    }));

    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 600);
  };

  return (
    <div className={`relative ${className}`} onClick={handleClick}>
      {children}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-[#0070f3] pointer-events-none"
          initial={{
            x: particle.x,
            y: particle.y,
            scale: 1,
            opacity: 1
          }}
          animate={{
            x: particle.x + Math.cos(particle.angle) * 100,
            y: particle.y + Math.sin(particle.angle) * 100,
            scale: 0,
            opacity: 0,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

// 19. PERSPECTIVE TILT SECTION - Desktop only
export function PerspectiveSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const isMobile = useIsMobile();

  // On mobile, render children without perspective transforms
  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return <PerspectiveSectionDesktop className={className}>{children}</PerspectiveSectionDesktop>;
}

function PerspectiveSectionDesktop({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);

  return (
    <div ref={ref} className={`perspective-[1000px] ${className}`}>
      <motion.div
        style={{ rotateX, scale, opacity, transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// 20. NEON GLOW BUTTON
export function NeonButton({
  children,
  className = "",
  href
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <motion.div
      className={`relative px-8 py-4 rounded-full font-bold cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        boxShadow: isHovered
          ? [
              "0 0 20px rgba(0,112,243,0.5), 0 0 40px rgba(0,112,243,0.3), 0 0 60px rgba(0,112,243,0.2)",
              "0 0 30px rgba(0,112,243,0.6), 0 0 50px rgba(0,112,243,0.4), 0 0 80px rgba(0,112,243,0.3)",
              "0 0 20px rgba(0,112,243,0.5), 0 0 40px rgba(0,112,243,0.3), 0 0 60px rgba(0,112,243,0.2)",
            ]
          : "0 0 0px transparent",
      }}
      transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
      style={{
        background: isHovered
          ? "linear-gradient(135deg, #0070f3 0%, #00c6ff 100%)"
          : "transparent",
        border: "2px solid #0070f3",
        color: isHovered ? "white" : "#0070f3",
      }}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }
  return content;
}
