import { ReactNode } from 'react';
import styles from './ActionFooter.module.css';

interface ActionFooterProps {
  items: {
    icon: ReactNode;
    label: string;
    value: string;
  }[];
}

export function ActionFooter({ items }: ActionFooterProps) {
  return (
    <div className={styles.actionFooter}>
      {items.map((item, index) => (
        <div key={index} className={styles.actionFooterItem}>
          <span className={styles.icon}>{item.icon}</span>
          <span>
            <strong>{item.label}:</strong> {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}
