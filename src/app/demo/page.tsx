"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import Link from "next/link";

// 1. 3D CARD TILT COMPONENT
function Card3D({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 });

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
      <div style={{ transform: "translateZ(50px)" }}>{children}</div>
    </motion.div>
  );
}

// 2. MAGNETIC BUTTON COMPONENT
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="px-8 py-4 bg-[#0070f3] text-white font-bold rounded-full text-lg hover:bg-[#0060d3] transition-colors"
    >
      {children}
    </motion.button>
  );
}

// 3. TEXT SCRAMBLE COMPONENT
function TextScramble({ text, className = "" }: { text: string; className?: string }) {
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
function MorphingBlob() {
  return (
    <div className="relative w-64 h-64">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#0070f3] to-[#00c6ff] opacity-60 blur-3xl"
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
    </div>
  );
}

// 5. PARTICLE CURSOR
function ParticleCursor() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) return;

      const newParticle = {
        id: Date.now() + Math.random(),
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      setParticles((prev) => [...prev.slice(-20), newParticle]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => prev.slice(1));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-64 bg-white/5 rounded-2xl overflow-hidden">
      <p className="absolute inset-0 flex items-center justify-center text-white/50">Move your cursor here</p>
      {particles.map((particle, i) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-[#0070f3]"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
          style={{ left: particle.x, top: particle.y }}
        />
      ))}
    </div>
  );
}

// 6. NUMBER COUNTER
function NumberCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
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
      {count}{suffix}
    </span>
  );
}

// 7. SPLIT REVEAL
function SplitReveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
      whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
    >
      {children}
    </motion.div>
  );
}

// 9. PARALLAX BACKGROUND
function ParallaxSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <div ref={ref} className="relative h-[500px] overflow-hidden rounded-2xl bg-gradient-to-b from-[#0a0a0a] to-[#1a1a2e]">
      {/* Background layer - slowest */}
      <motion.div
        style={{ y: y3, opacity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[600px] h-[600px] rounded-full bg-[#0070f3]/10 blur-3xl" />
      </motion.div>

      {/* Middle layer */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 flex items-end justify-center pb-20"
      >
        <div className="grid grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-16 h-32 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10"
              style={{ height: `${80 + i * 20}px` }}
            />
          ))}
        </div>
      </motion.div>

      {/* Foreground layer - fastest */}
      <motion.div
        style={{ y: y2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="text-center">
          <h3 className="text-4xl font-bold text-white mb-4">Parallax Depth</h3>
          <p className="text-white/60">Scroll to see layers move at different speeds</p>
        </div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50 - i * 15]) }}
          className="absolute w-1 h-1 bg-[#0070f3] rounded-full"
          initial={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.2
          }}
        />
      ))}
    </div>
  );
}

// 10. HORIZONTAL PARALLAX
function HorizontalParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const x2 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const x3 = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <div ref={ref} className="relative h-[400px] overflow-hidden rounded-2xl bg-[#111]">
      <motion.div
        style={{ x: x1 }}
        className="absolute top-8 left-0 right-0 flex justify-center"
      >
        <div className="px-6 py-3 bg-[#0070f3]/20 rounded-full text-[#0070f3] font-medium">
          Layer 1 →
        </div>
      </motion.div>

      <motion.div
        style={{ x: x2 }}
        className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-center"
      >
        <div className="text-6xl font-bold text-white">
          ← Parallax →
        </div>
      </motion.div>

      <motion.div
        style={{ x: x3 }}
        className="absolute bottom-8 left-0 right-0 flex justify-center"
      >
        <div className="px-6 py-3 bg-white/10 rounded-full text-white/60 font-medium">
          ← Layer 3
        </div>
      </motion.div>
    </div>
  );
}

// 11. PARALLAX IMAGE REVEAL
function ParallaxImageReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.3, 1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [
      "inset(40% 40% 40% 40%)",
      "inset(0% 0% 0% 0%)",
      "inset(0% 0% 0% 0%)",
      "inset(40% 40% 40% 40%)"
    ]
  );

  return (
    <div ref={ref} className="relative h-[500px] flex items-center justify-center">
      <motion.div
        style={{ scale, opacity, clipPath }}
        className="w-full max-w-2xl h-80 bg-gradient-to-br from-[#0070f3] via-[#00c6ff] to-[#7928ca] rounded-2xl flex items-center justify-center"
      >
        <span className="text-2xl font-bold text-white">Scroll to Reveal</span>
      </motion.div>
    </div>
  );
}

// MAIN DEMO PAGE
export default function DemoPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-[#0070f3] mb-8 inline-block hover:underline">
          ← Back to Home
        </Link>

        <h1 className="text-5xl font-bold mb-4">Animation Demos</h1>
        <p className="text-white/60 mb-16">Hover, scroll, and interact with these effects</p>

        {/* 1. 3D Card Tilt */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-2 text-[#0070f3]">1. 3D Card Tilt</h2>
          <p className="text-white/60 mb-6">Hover over the card and move your cursor</p>
          <div className="perspective-1000">
            <Card3D className="w-80 h-48 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 p-6 cursor-pointer">
              <h3 className="text-xl font-bold">Case Study</h3>
              <p className="text-white/60 mt-2">$36K Annual Revenue</p>
              <p className="text-[#0070f3] mt-4">+60X ROAS →</p>
            </Card3D>
          </div>
        </section>

        {/* 2. Magnetic Button */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-2 text-[#0070f3]">2. Magnetic Button</h2>
          <p className="text-white/60 mb-6">Move cursor near the button - it follows you</p>
          <MagneticButton>Build My System →</MagneticButton>
        </section>

        {/* 3. Text Scramble */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-2 text-[#0070f3]">3. Text Scramble</h2>
          <p className="text-white/60 mb-6">Hover over the text below</p>
          <div className="text-5xl font-bold">
            <TextScramble text="intelligent" className="text-[#0070f3]" />
          </div>
        </section>

        {/* 4. Morphing Blob */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-2 text-[#0070f3]">4. Morphing Blob</h2>
          <p className="text-white/60 mb-6">Continuous organic animation</p>
          <MorphingBlob />
        </section>

        {/* 5. Particle Cursor */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-2 text-[#0070f3]">5. Particle Trail Cursor</h2>
          <p className="text-white/60 mb-6">Move your cursor inside the box</p>
          <ParticleCursor />
        </section>

        {/* 6. Number Counter */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-2 text-[#0070f3]">6. Number Counter</h2>
          <p className="text-white/60 mb-6">Scroll down to trigger - counts up when visible</p>
          <div className="flex gap-12 text-5xl font-bold">
            <div>
              <NumberCounter value={60} suffix="X" />
              <p className="text-sm text-white/60 mt-2">ROAS</p>
            </div>
            <div>
              $<NumberCounter value={36} suffix="K" />
              <p className="text-sm text-white/60 mt-2">Revenue</p>
            </div>
            <div>
              <NumberCounter value={94} suffix="%" />
              <p className="text-sm text-white/60 mt-2">Time Saved</p>
            </div>
          </div>
        </section>

        {/* 7. Split Reveal */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-2 text-[#0070f3]">7. Split Reveal</h2>
          <p className="text-white/60 mb-6">Scroll to reveal with diagonal wipe</p>
          <SplitReveal>
            <div className="w-full h-48 bg-gradient-to-r from-[#0070f3] to-[#00c6ff] rounded-2xl flex items-center justify-center">
              <span className="text-2xl font-bold">Content Revealed!</span>
            </div>
          </SplitReveal>
        </section>

        {/* 8. Staggered List */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-2 text-[#0070f3]">8. Staggered Cards</h2>
          <p className="text-white/60 mb-6">Scroll to see cards animate in sequence</p>
          <motion.div
            className="grid grid-cols-3 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
          >
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
                className="h-32 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center"
              >
                Card {i}
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 9. Parallax Background */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-2 text-[#0070f3]">9. Parallax Depth Layers</h2>
          <p className="text-white/60 mb-6">Scroll to see layers move at different speeds</p>
          <ParallaxSection />
        </section>

        {/* 10. Horizontal Parallax */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-2 text-[#0070f3]">10. Horizontal Parallax</h2>
          <p className="text-white/60 mb-6">Layers move left/right as you scroll</p>
          <HorizontalParallax />
        </section>

        {/* 11. Parallax Image Reveal */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-2 text-[#0070f3]">11. Parallax Image Reveal</h2>
          <p className="text-white/60 mb-6">Scroll to reveal with scale + clip animation</p>
          <ParallaxImageReveal />
        </section>

        <div className="h-32" />
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </main>
  );
}
