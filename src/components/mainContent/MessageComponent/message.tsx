// Message.tsx

import React from 'react';
import styles from './message.module.css';
import { Url } from 'next/dist/shared/lib/router/router';

interface Message {
    id: string;
    text: string;
    sender: string;
    timestamp: string;
    userAvatar: Url;
  }

interface MessageProps {
  message: Message;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <div key={message.id} className={`${styles.message} ${message.sender === 'User' ? styles.userMessage : styles.otherMessage}`}>
      <p className={styles.sender}>{message.sender}</p>
      <div className={styles.messageContent}>
        <p className={styles.text}>{message.text}</p>
        <span className={styles.timestamp}>{message.timestamp}</span>
        {<img className={styles.userAvatar} src={message.userAvatar} alt="User Avatar" />}
      </div>
    </div>
    
  );
};

export default Message;
