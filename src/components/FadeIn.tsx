'use client';

import { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
  className?: string;
  once?: boolean;
}

/**
 * FadeIn - Pure CSS, no framer-motion
 * Just renders children in a div
 */
export default function FadeIn({
  children,
  className = '',
}: FadeInProps) {
  return <div className={className}>{children}</div>;
}
