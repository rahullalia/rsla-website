import { ReactNode } from 'react';
import styles from './SimpleTable.module.css';

interface SimpleTableProps {
  headers: string[];
  rows: ReactNode[][];
  footer?: ReactNode[];
  footerHighlight?: boolean;
}

export function SimpleTable({ headers, rows, footer, footerHighlight }: SimpleTableProps) {
  return (
    <table className={styles.simpleTable}>
      <thead>
        <tr>
          {headers.map((header, i) => (
            <th key={i}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
        {footer && (
          <tr className={`${styles.footerRow}${footerHighlight ? ` ${styles.footerHighlight}` : ''}`}>
            {footer.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        )}
      </tbody>
    </table>
  );
}
