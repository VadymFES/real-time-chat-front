import React from 'react';
import styles from './chatHistory.module.css';

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
}

interface ChatHistoryProps {
  messages: Message[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
  return (
    <div className={styles.chatHistory}>
      {messages.map((message) => (
        <div key={message.id} className={message.sender === 'User' ? 'user-message' : 'other-message'}>
          <p>{message.text}</p>
          <span>{message.timestamp}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
