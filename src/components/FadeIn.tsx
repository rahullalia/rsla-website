'use client';

import { ReactNode, useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

// Mobile detection - defaults to true to prevent animations during SSR
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);
  return isMobile;
}

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
  className?: string;
  once?: boolean;
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  yOffset = 30,
  xOffset = 0,
  className = '',
  once = true,
}: FadeInProps) {
  const isMobile = useIsMobile();

  // On mobile, just render children without any animation
  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return <FadeInDesktop delay={delay} duration={duration} yOffset={yOffset} xOffset={xOffset} className={className} once={once}>{children}</FadeInDesktop>;
}

function FadeInDesktop({
  children,
  delay = 0,
  duration = 0.6,
  yOffset = 30,
  xOffset = 0,
  className = '',
  once = true,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: yOffset, x: xOffset }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: yOffset, x: xOffset }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
