// Message.tsx

import React from 'react';
import styles from './message.module.css';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
  userAvatar: string;
}

interface MessageProps {
  message: Message;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isUserMessage = message.sender === 'User';

  return (
    <div className={`${styles.message} ${isUserMessage ? styles.userMessage : styles.otherMessage}`}>
      {!isUserMessage && (
        <img
          className={styles.userAvatar}
          src={message.userAvatar}
          alt="User Avatar"
        />
      )}
      <div className={styles.messageContent}>
        <div className={styles.header}>
          <span className={styles.sender}>{message.sender}</span>
          <span className={styles.timestamp}>{message.timestamp}</span>
        </div>
        <div className={styles.text}>{message.text}</div>
      </div>
      {isUserMessage && (
        <img
          className={styles.userAvatar}
          src={message.userAvatar}
          alt="User Avatar"
        />
      )}
    </div>
  );
};

export default Message;
