"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import clsx from "clsx";

// Liquid Fill Button - fills from center on hover
function LiquidFillButton({ children, href, className = "" }: { children: React.ReactNode; href: string; className?: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Liquid fill effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#0070f3] to-[#00c6ff]"
        initial={{ scale: 0, borderRadius: "100%" }}
        animate={{
          scale: isHovered ? 2.5 : 0,
          borderRadius: isHovered ? "0%" : "100%",
        }}
        transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
        style={{ originX: 0.5, originY: 0.5 }}
      />
      <span className="relative z-10">{children}</span>
    </Link>
  );
}

// Orbit Button - particles orbit on hover
function OrbitButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const orbits = [0, 60, 120, 180, 240, 300];

  return (
    <motion.button
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Orbiting particles */}
      {orbits.map((angle, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-[#0070f3]"
          style={{
            left: "50%",
            top: "50%",
          }}
          animate={isHovered ? {
            x: [
              Math.cos((angle * Math.PI) / 180) * 30,
              Math.cos(((angle + 360) * Math.PI) / 180) * 30,
            ],
            y: [
              Math.sin((angle * Math.PI) / 180) * 20,
              Math.sin(((angle + 360) * Math.PI) / 180) * 20,
            ],
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.5],
          } : { opacity: 0, x: 0, y: 0 }}
          transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            ease: "linear",
            delay: i * 0.1,
          }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// Morph Border Button - border morphs and pulses
function MorphBorderButton({ children, href, className = "" }: { children: React.ReactNode; href: string; className?: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient border */}
      <motion.div
        className="absolute -inset-[2px] rounded-full opacity-0 group-hover:opacity-100"
        style={{
          background: "linear-gradient(90deg, #0070f3, #00c6ff, #7928ca, #0070f3)",
          backgroundSize: "300% 100%",
        }}
        animate={isHovered ? {
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      {/* Inner content */}
      <div className="relative bg-[#111] rounded-full">
        <motion.span
          className="relative z-10 block"
          animate={isHovered ? {
            textShadow: [
              "0 0 10px rgba(0,112,243,0)",
              "0 0 20px rgba(0,112,243,0.5)",
              "0 0 10px rgba(0,112,243,0)",
            ]
          } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {children}
        </motion.span>
      </div>
    </Link>
  );
}

// Glitch Button - glitches on hover (now supports href for links)
function GlitchButton({ children, className = "", href }: { children: React.ReactNode; className?: string; href?: string }) {
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {isHovered && (
        <>
          <motion.span
            className="absolute inset-0 flex items-center justify-center text-[#0070f3]"
            style={{ clipPath: "inset(30% 0 50% 0)" }}
            animate={{ x: [-2, 2, -2, 0] }}
            transition={{ duration: 0.2, repeat: Infinity }}
          >
            {children}
          </motion.span>
          <motion.span
            className="absolute inset-0 flex items-center justify-center text-[#ff0080]"
            style={{ clipPath: "inset(60% 0 20% 0)" }}
            animate={{ x: [2, -2, 2, 0] }}
            transition={{ duration: 0.2, repeat: Infinity }}
          >
            {children}
          </motion.span>
        </>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={`relative ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {content}
    </motion.button>
  );
}

// Magnetic Pull Container
function MagneticPill({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
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
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Work", href: "/work" },
    { name: "Blog", href: "/blog" },
];

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                scrolled
                    ? "bg-brand-black/80 backdrop-blur-md border-white/10 py-4"
                    : "bg-transparent border-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="z-50">
                    <Image
                        src="/lockup.png"
                        alt="RSL/A"
                        width={350}
                        height={93}
                        className="h-16 md:h-20 lg:h-24 w-auto"
                        priority
                    />
                </Link>

                {/* Desktop Menu - Center */}
                <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right side: Login + Start a Project - with crazy effects */}
                <MagneticPill className="hidden md:flex items-center bg-[#111] rounded-full p-1.5 border border-white/10">
                    <GlitchButton
                        href="https://go.rsla.io"
                        className="px-5 py-2.5 text-sm font-medium text-gray-400 hover:text-white transition-colors rounded-full"
                    >
                        Login
                    </GlitchButton>
                    <LiquidFillButton
                        href="/#contact"
                        className="px-5 py-2.5 border border-white/20 text-white text-sm font-medium rounded-full transition-all"
                    >
                        Start a Project
                    </LiquidFillButton>
                </MagneticPill>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden z-50 text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="fixed inset-0 bg-brand-black flex flex-col items-center justify-center gap-8 md:hidden"
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-2xl font-display font-bold text-white hover:text-brand-blue"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/#contact"
                                onClick={() => setIsOpen(false)}
                                className="mt-4 px-8 py-3 bg-white text-black text-lg font-bold rounded-full"
                            >
                                Start a Project
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
