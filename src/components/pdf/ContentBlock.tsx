import { ReactNode } from 'react';
import styles from './ContentBlock.module.css';

interface ContentBlockProps {
  title: string;
  children: ReactNode;
}

export function ContentBlock({ title, children }: ContentBlockProps) {
  return (
    <div className={styles.contentBlock}>
      <div className={styles.contentBlockHeader}>
        <h4>{title}</h4>
      </div>
      {children}
    </div>
  );
}
