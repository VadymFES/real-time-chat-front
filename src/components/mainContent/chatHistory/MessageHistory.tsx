import React, { useRef, useEffect } from 'react';
import styles from './messageHistory.module.css';
import Message from '../MessageComponent/message';

interface MessageHistoryProps {
  messages: Message[];
  currentUser: string;
}

const MessageHistory: React.FC<MessageHistoryProps> = ({ messages, currentUser }) => {
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section className={styles.messageContainer} ref={messageContainerRef}>
      {messages.map((message) => (
        <Message key={message.id} message={message} currentUser={currentUser} />
      ))}
    </section>
  );
};

export default MessageHistory;
