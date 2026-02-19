"use client";

/**
 * Desktop-only animation components that depend on framer-motion.
 * Dynamically imported by animations.tsx so framer-motion is NOT
 * included in the mobile bundle (prevents Safari memory crashes).
 */

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";

// Card3D Desktop
export function Card3DDesktop({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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

// MagneticButton Desktop
export function MagneticButtonDesktop({
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

// ParallaxBackground Desktop
export function ParallaxBackgroundDesktop() {
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

// ParallaxDivider Desktop
export function ParallaxDividerDesktop() {
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

// HeroParallax Desktop (kept for backwards compat)
export function HeroParallaxDesktop({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <HeroParallaxDesktopEffects />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// HeroParallax Desktop Effects — decorative blobs only, no children wrapper
export function HeroParallaxDesktopEffects() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  const y3 = useTransform(scrollY, [0, 500], [0, -75]);

  return (
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
  );
}

// AuroraBackground Desktop
export function AuroraBackgroundDesktop() {
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

// LiquidText Desktop
export function LiquidTextDesktop({ text, className = "" }: { text: string; className?: string }) {
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

// GlitchText Desktop
export function GlitchTextDesktop({ text, className = "" }: { text: string; className?: string }) {
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

// SpotlightCard Desktop
export function SpotlightCardDesktop({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

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

// ParallaxLayer Desktop
export function ParallaxLayerDesktop({
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

// MorphingBlob Desktop
export function MorphingBlobDesktop({ className = "" }: { className?: string }) {
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

// RevealText Desktop
export function RevealTextDesktop({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

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

// ExplodeOnClick Desktop
export function ExplodeOnClickDesktop({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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

// PerspectiveSection Desktop
export function PerspectiveSectionDesktop({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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

// FadeIn Desktop
export function FadeInDesktop({
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
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

// FadeInStagger Desktop
export function FadeInStaggerDesktop({
  children,
  className = "",
  staggerDelay = 0.1
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
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
