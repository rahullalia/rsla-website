import styles from './CoverContent.module.css';

interface CoverContentProps {
  eyebrow: string;
  title: string;
  titleAccent: string;
  titleSuffix?: string;
  subtitle: string;
  bonus?: string;
}

export function CoverContent({ eyebrow, title, titleAccent, titleSuffix = '', subtitle, bonus }: CoverContentProps) {
  return (
    <>
      <div className={styles.coverEyebrow}>{eyebrow}</div>
      <h1 className={styles.coverTitle}>
        {title}
        <span className={styles.coverTitleAccent}>{titleAccent}</span>
        {titleSuffix}
      </h1>
      <div className={styles.coverDivider} />
      <p className={styles.coverSubtitle}>{subtitle}</p>
      {bonus && <p className={styles.coverBonus}>{bonus}</p>}
    </>
  );
}

interface BonusCoverContentProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
}

export function BonusCoverContent({ eyebrow, title, subtitle, description, badge }: BonusCoverContentProps) {
  return (
    <>
      <div className={styles.bonusCoverEyebrow}>{eyebrow}</div>
      <h1 className={styles.bonusCoverTitle}>{title}</h1>
      <p className={styles.bonusCoverSubtitle}>{subtitle}</p>
      <div className={styles.bonusCoverDivider} />
      <p className={styles.bonusCoverDescription}>{description}</p>
      <div className={styles.bonusCoverBadge}>
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        {badge}
      </div>
    </>
  );
}
