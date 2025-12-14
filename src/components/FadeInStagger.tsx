'use client';

import { ReactNode, CSSProperties } from 'react';

interface FadeInStaggerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
  once?: boolean;
  style?: CSSProperties;
}

/**
 * FadeInStagger - Pure CSS, no framer-motion
 * Just renders children in a div
 */
export default function FadeInStagger({
  children,
  className = '',
  style,
}: FadeInStaggerProps) {
  return <div className={className} style={style}>{children}</div>;
}
