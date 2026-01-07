import { ReactNode } from 'react';
import styles from './TemplateBox.module.css';

interface TemplateBoxProps {
  title: string;
  children: ReactNode;
}

export function TemplateBox({ title, children }: TemplateBoxProps) {
  return (
    <div className={styles.templateBox}>
      <div className={styles.templateBoxHeader}>
        <div className={styles.templateBoxDots}>
          <div className={`${styles.templateBoxDot} ${styles.templateBoxDotRed}`} />
          <div className={`${styles.templateBoxDot} ${styles.templateBoxDotYellow}`} />
          <div className={`${styles.templateBoxDot} ${styles.templateBoxDotGreen}`} />
        </div>
        <div className={styles.templateBoxTitle}>{title}</div>
      </div>
      <div className={styles.templateBoxContent}>{children}</div>
    </div>
  );
}

interface HighlightProps {
  children: ReactNode;
}

export function Highlight({ children }: HighlightProps) {
  return <span className={styles.highlight}>{children}</span>;
}
