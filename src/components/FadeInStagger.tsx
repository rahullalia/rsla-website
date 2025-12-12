'use client';

import { ReactNode, useRef, Children, isValidElement, cloneElement, ReactElement } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface FadeInStaggerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
  once?: boolean;
}

export default function FadeInStagger({
  children,
  staggerDelay = 0.1,
  className = '',
  once = true,
}: FadeInStaggerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return (
            <motion.div variants={itemVariants}>
              {cloneElement(child as ReactElement)}
            </motion.div>
          );
        }
        return child;
      })}
    </motion.div>
  );
}
