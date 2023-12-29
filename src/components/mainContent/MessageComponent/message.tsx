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

const userColors: { [key: string]: string } = {}; // Dictionary to store user colors

const getRandomColor = (): string => {
  // Generate a random color in hexadecimal format
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const getUserColor = (username: string): string => {
  // Check if the user already has a color assigned
  if (!userColors[username]) {
    // If not, generate a random color and assign it
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
