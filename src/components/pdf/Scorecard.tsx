import { ReactNode } from 'react';
import styles from './Scorecard.module.css';

interface ScorecardRowData {
  number: string;
  hack: string;
  result: ReactNode;
}

interface ScorecardProps {
  rows: ScorecardRowData[];
  totalLabel: string;
  totalValue: string;
}

export function Scorecard({ rows, totalLabel, totalValue }: ScorecardProps) {
  return (
    <div className={styles.scorecard}>
      {rows.map((row, index) => (
        <div key={index} className={styles.scorecardRow}>
          <div className={styles.scorecardHack}>
            <span className={styles.scorecardHackNum}>{row.number}</span>
            {row.hack}
          </div>
          <div className={styles.scorecardResult}>{row.result}</div>
        </div>
      ))}
      <div className={styles.scorecardTotal}>
        <span className={styles.scorecardTotalLabel}>{totalLabel}</span>
        <span className={styles.scorecardTotalValue}>{totalValue}</span>
      </div>
    </div>
  );
}

interface ScorecardValueProps {
  children: ReactNode;
}

export function ScorecardValue({ children }: ScorecardValueProps) {
  return <span className={styles.scorecardValue}>{children}</span>;
}
