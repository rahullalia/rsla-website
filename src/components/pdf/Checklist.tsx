import { ReactNode, CSSProperties } from 'react';
import styles from './Checklist.module.css';

interface ChecklistProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export function Checklist({ children, style, className }: ChecklistProps) {
  return (
    <ul
      className={`${styles.checklist}${className ? ` ${className}` : ''}`}
      style={style}
    >
      {children}
    </ul>
  );
}

interface ChecklistItemProps {
  children: ReactNode;
}

export function ChecklistItem({ children }: ChecklistItemProps) {
  return <li>{children}</li>;
}
