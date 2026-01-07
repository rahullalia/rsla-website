import styles from './PullQuote.module.css';

interface PullQuoteProps {
  quote: string;
  cite: string;
}

export function PullQuote({ quote, cite }: PullQuoteProps) {
  return (
    <div className={styles.pullQuote}>
      <div className={styles.pullQuoteIcon}>&ldquo;</div>
      <blockquote>{quote}</blockquote>
      <cite>{cite}</cite>
    </div>
  );
}
