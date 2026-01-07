import { ReactNode } from 'react';
import styles from './HackHeader.module.css';

interface HackHeaderProps {
  number: string;
  title: string;
  tagline: string;
  icon: ReactNode;
  variant?: 'default' | 'bonus';
}

export function HackHeader({ number, title, tagline, icon, variant = 'default' }: HackHeaderProps) {
  return (
    <div className={styles.hackHeader}>
      <div className={`${styles.hackBadge} ${variant === 'bonus' ? styles.hackBadgeBonus : ''}`}>
        <span className={styles.hackBadgeNumber}>{number}</span>
        <span className={styles.hackBadgeLabel}>{variant === 'bonus' ? 'Bonus' : 'Hack'}</span>
      </div>
      <div className={styles.hackInfo}>
        <h2 className={styles.hackTitle}>
          {title}
          <span className={styles.hackIcon}>{icon}</span>
        </h2>
        <p className={styles.hackTagline}>{tagline}</p>
      </div>
    </div>
  );
}
