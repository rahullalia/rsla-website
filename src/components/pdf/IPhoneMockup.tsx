import { ReactNode } from 'react';
import styles from './IPhoneMockup.module.css';

// Icons used in the phone UI
const WifiIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
);

const BatteryIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
);

const BackIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
);

interface IPhoneMockupProps {
  contactName: string;
  avatarSrc?: string;
  avatarInitials?: string;
  timestamp?: string;
  children: ReactNode;
}

export function IPhoneMockup({
  contactName,
  avatarSrc,
  avatarInitials,
  timestamp = 'Today 9:41 AM',
  children
}: IPhoneMockupProps) {
  return (
    <div className={styles.device}>
      <div className={styles.deviceFrame}>
        <div className={styles.deviceScreen}>
          <div className={styles.imessageScreen}>
            {/* Status Bar */}
            <div className={styles.statusbar}>
              <div className={styles.statusbarLeft}>9:41</div>
              <div className={styles.statusbarCenter}></div>
              <div className={styles.statusbarRight}>
                <WifiIcon />
                <BatteryIcon />
              </div>
            </div>

            {/* Header */}
            <div className={styles.header}>
              <div className={styles.back}>
                <BackIcon />
              </div>
              <div className={styles.avatar}>
                {avatarSrc ? (
                  <img src={avatarSrc} alt={contactName} />
                ) : (
                  avatarInitials
                )}
              </div>
              <div className={styles.contactName}>{contactName}</div>
            </div>

            {/* Message Body */}
            <div className={styles.body}>
              <div className={styles.timestamp}>{timestamp}</div>
              {children}
            </div>

            {/* Input Area */}
            <div className={styles.input}>
              <div className={styles.inputPlus}>+</div>
              <div className={styles.inputField}>Text Message</div>
              <div className={styles.inputSend}>
                <SendIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.deviceStripe}></div>
      <div className={styles.deviceHeader}></div>
      <div className={styles.deviceSensors}></div>
      <div className={styles.deviceBtns}></div>
      <div className={styles.devicePower}></div>
      <div className={styles.deviceHome}></div>
    </div>
  );
}

interface MessageBubbleProps {
  children: ReactNode;
  hasTail?: boolean;
  variant?: 'sent' | 'received';
}

export function MessageBubble({ children, hasTail = true, variant = 'received' }: MessageBubbleProps) {
  const isReceived = variant === 'received';
  return (
    <div className={`${styles.bubbleWrapper} ${isReceived ? styles.bubbleWrapperReceived : ''}`}>
      <div className={`${styles.bubble} ${isReceived ? styles.bubbleReceived : styles.bubbleSent} ${hasTail ? styles.hasTail : ''}`}>
        {children}
      </div>
    </div>
  );
}

export function Delivered() {
  return <div className={styles.delivered}>Delivered</div>;
}

interface HighlightTextProps {
  children: ReactNode;
}

export function HL({ children }: HighlightTextProps) {
  return <span className={styles.hl}>{children}</span>;
}

export function Link({ children }: HighlightTextProps) {
  return <span className={styles.link}>{children}</span>;
}
