import { ReactNode } from 'react';
import styles from './Callout.module.css';

interface CalloutProps {
  variant: 'situation' | 'insight' | 'tip';
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

const defaultIcons = {
  situation: (
    <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
  ),
  insight: (
    <svg viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>
  ),
  tip: (
    <svg viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>
  ),
};

export function Callout({ variant, title, icon, children, className = '' }: CalloutProps) {
  const variantClass = {
    situation: styles.calloutSituation,
    insight: styles.calloutInsight,
    tip: styles.calloutTip,
  }[variant];

  return (
    <div className={`${styles.callout} ${variantClass} ${className}`}>
      <div className={styles.calloutTitle}>
        {icon || defaultIcons[variant]}
        {title}
      </div>
      {children}
    </div>
  );
}
