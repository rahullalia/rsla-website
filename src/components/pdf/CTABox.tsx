import { ReactNode } from 'react';
import styles from './CTABox.module.css';

interface CTABoxProps {
  title: string;
  children: ReactNode;
  keyword?: string;
}

export function CTABox({ title, children, keyword }: CTABoxProps) {
  return (
    <div className={styles.ctaBox}>
      <h3>{title}</h3>
      <div className={styles.content}>{children}</div>
      {keyword && <div className={styles.keyword}>{keyword}</div>}
    </div>
  );
}
