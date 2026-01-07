import { ReactNode } from 'react';
import styles from './Steps.module.css';

interface StepsProps {
  children: ReactNode;
  centered?: boolean;
}

export function Steps({ children, centered = false }: StepsProps) {
  return (
    <ol className={`${styles.steps} ${centered ? styles.stepsCentered : ''}`}>
      {children}
    </ol>
  );
}

interface StepItemProps {
  children: ReactNode;
}

export function StepItem({ children }: StepItemProps) {
  return <li>{children}</li>;
}
