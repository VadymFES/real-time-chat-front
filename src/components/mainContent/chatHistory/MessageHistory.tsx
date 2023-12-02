import React, { useRef, useEffect } from 'react';
import styles from './messageHistory.module.css';
import Message from '../MessageComponent/message';

interface MessageHistoryProps {
  messages: Message[];
}

const MessageHistory: React.FC<MessageHistoryProps> = ({ messages }) => {
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      // Scroll to the bottom of the container when messages change
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section className={styles.messageContainer} ref={messageContainerRef}>
      {messages.map((message) => ( 
        <Message key={message.id} message={message} />
      ))}
    </section>
  );
};

export default MessageHistory;
