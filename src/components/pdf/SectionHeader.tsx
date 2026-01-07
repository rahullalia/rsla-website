import { ReactNode } from 'react';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  icon: ReactNode;
  title: string;
}

export function SectionHeader({ icon, title }: SectionHeaderProps) {
  return (
    <div className={styles.sectionHeader}>
      <div className={styles.sectionIcon}>{icon}</div>
      <h2>{title}</h2>
    </div>
  );
}
