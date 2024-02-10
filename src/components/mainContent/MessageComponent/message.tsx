import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to install axios if you haven't
import styles from './message.module.css';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

interface MessageProps {
  roomId: string; 
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

const MessageComponent: React.FC<MessageProps> = ({ roomId, currentUser }) => {
  const [messages, setMessages] = useState<Message[]>([]); 

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/messages/get_room_messages/${roomId}`);
        setMessages(response.data);
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    };

    fetchMessages();
  }, [roomId]); // re-fetch when roomId changes

  return (
    <div>
      {messages.map((message) => {
        const isUserMessage = message.sender === currentUser;
        const textColor = isUserMessage ? '#000000' : getUserColor(message.sender);

        return (
          <div key={message.id} className={`${styles.message} ${isUserMessage ? styles.userMessage : styles.otherMessage}`}>
            <div className={styles.messageContent}>
              <span className={styles.sender} style={{ color: textColor }}>
                {`[${message.timestamp}] - <${message.sender}>`}
              </span>
              <span className={styles.text} style={{ color: textColor }}>{message.text}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageComponent;
