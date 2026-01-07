import { ReactNode } from 'react';
import styles from './Page.module.css';

interface PageProps {
  children: ReactNode;
  pageNumber?: number;
  variant?: 'default' | 'cover' | 'bonus-cover';
  className?: string;
}

export function Page({ children, pageNumber, variant = 'default', className = '' }: PageProps) {
  const pageClass = variant === 'cover'
    ? styles.pageCover
    : variant === 'bonus-cover'
    ? styles.pageBonusCover
    : styles.page;

  if (variant === 'cover') {
    return (
      <div className={`${pageClass} ${className}`} data-pdf-page>
        <div className={styles.coverShape1} />
        <div className={styles.coverShape2} />
        <div className={styles.coverShape3} />
        <div className={styles.pageContent}>
          {children}
        </div>
        <div className={styles.coverFooter}>RSL/A</div>
      </div>
    );
  }

  if (variant === 'bonus-cover') {
    return (
      <div className={`${pageClass} ${className}`} data-pdf-page>
        <div className={styles.bonusCoverRays} />
        <div className={styles.bonusCoverGlow1} />
        <div className={styles.bonusCoverGlow2} />
        <div className={styles.bonusCoverGlow3} />
        <div className={`${styles.bonusCoverSparkle} ${styles.bonusCoverSparkle1}`} />
        <div className={`${styles.bonusCoverSparkle} ${styles.bonusCoverSparkle2}`} />
        <div className={`${styles.bonusCoverSparkle} ${styles.bonusCoverSparkle3} ${styles.bonusCoverSparkleSm}`} />
        <div className={`${styles.bonusCoverSparkle} ${styles.bonusCoverSparkle4} ${styles.bonusCoverSparkleSm}`} />
        <div className={`${styles.bonusCoverSparkle} ${styles.bonusCoverSparkle5} ${styles.bonusCoverSparkleSm}`} />
        <div className={`${styles.bonusCoverSparkle} ${styles.bonusCoverSparkle6}`} />
        <div className={styles.pageContent}>
          {children}
        </div>
        <div className={styles.bonusCoverFooter}>RSL/A</div>
      </div>
    );
  }

  return (
    <div className={`${styles.page} ${className}`} data-pdf-page>
      <div className={styles.pageHeader} />
      <div className={styles.pageHeaderText}>RSL/A</div>
      <div className={styles.pageAccentTop} />
      <div className={styles.pageAccentBottom} />
      <div className={styles.pageContent}>
        {children}
      </div>
      {pageNumber && <div className={styles.pageNumber}>{pageNumber}</div>}
    </div>
  );
}
