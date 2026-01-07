import styles from './StatCards.module.css';

interface StatCardData {
  label: string;
  value: string;
  context: string;
  highlight?: boolean;
}

interface StatCardsProps {
  cards: StatCardData[];
}

export function StatCards({ cards }: StatCardsProps) {
  return (
    <div className={styles.statCards}>
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${styles.statCard} ${card.highlight ? styles.statCardHighlight : ''}`}
        >
          <div className={styles.statCardLabel}>{card.label}</div>
          <div className={styles.statCardValue}>{card.value}</div>
          <div className={styles.statCardContext}>{card.context}</div>
        </div>
      ))}
    </div>
  );
}
