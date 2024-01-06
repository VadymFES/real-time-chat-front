import React from 'react';
import styles from './message.module.css';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

interface MessageProps {
  message: Message;
  currentUser: string;
}

const userColors: { [key: string]: string } = {}; 

const getRandomColor = (): string => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const getUserColor = (username: string): string => {
  if (!userColors[username]) {
    userColors[username] = getRandomColor();
  }

  return userColors[username];
};

const Message: React.FC<MessageProps> = ({ message, currentUser }) => {
  const isUserMessage = message.sender === currentUser;
  const textColor = isUserMessage ? '#000000' : getUserColor(message.sender);

  return (
    <div className={`${styles.message} ${isUserMessage ? styles.userMessage : styles.otherMessage}`}>
      <div className={styles.messageContent}>
        <span className={styles.sender} style={{ color: textColor }}>
          {`[${message.timestamp}] - <${message.sender}>`}
        </span>
        <span className={styles.text} style={{ color: textColor }}>{message.text}</span>
      </div>
    </div>
  );
};

export default Message;
