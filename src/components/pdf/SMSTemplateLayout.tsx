import { ReactNode } from 'react';
import styles from './SMSTemplateLayout.module.css';

interface SMSTemplateLayoutProps {
  title: string;
  children: ReactNode;
  result?: string;
  device: ReactNode;
}

export function SMSTemplateLayout({ title, children, result, device }: SMSTemplateLayoutProps) {
  return (
    <div className={styles.smsTemplateLayout}>
      <div className={styles.smsTemplateText}>
        <h4 className={styles.smsTemplateTitle}>{title}</h4>
        {children}
        {result && (
          <div className={styles.smsTemplateResult}>
            <strong>Result:</strong> {result}
          </div>
        )}
      </div>
      {device}
    </div>
  );
}
