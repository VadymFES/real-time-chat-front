// MessageHistory.tsx

import React from 'react';
import styles from './messageHistory.module.css';
import Message from '../MessageComponent/message';


interface MessageHistoryProps {
  messages: Message[];
}

const MessageHistory: React.FC<MessageHistoryProps> = ({ messages }) => {

  
  return (
<div className={`${styles.messageContainer}`}>
  {messages.map((message) => ( 
    <Message key={message.id} message={message} />
  ))}
</div>
  );
};

export default MessageHistory;
