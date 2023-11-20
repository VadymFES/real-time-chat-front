'use client'

import React, { useState, useEffect, useRef } from 'react';
import styles from './mainContent.module.css';
import ChatHistory from './chatHistory/chatHistory';
import autosize from 'autosize';

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
}

const MainContent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
  }, []);


  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputValue,
        sender: 'User', // Replace with the sender's name or ID
        timestamp: new Date().toLocaleTimeString(), // Replace with the actual timestamp logic
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleLogout = () => {
    // Logic for handling logout
  };

  const handleCloseChat = () => {
    // Logic for handling chat close
  };

  return (
    <div className={styles.chatContainer}>

      <div className={styles.header}>

        <p className={styles.chatName}>Chat Name</p>

        <input className={styles.headerSearch} type="text" placeholder="Search" />
        <button className={styles.chatLogout} onClick={handleLogout}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 4C4.73478 4 4.48043 4.10536 4.29289 4.29289C4.10536 4.48043 4 4.73478 4 5V19C4 19.2652 4.10536 19.5196 4.29289 19.7071C4.48043 19.8946 4.73478 20 5 20H9C9.55228 20 10 20.4477 10 21C10 21.5523 9.55228 22 9 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7957 2 19V5C2 4.20435 2.31607 3.44129 2.87868 2.87868C3.44129 2.31607 4.20435 2 5 2H9C9.55228 2 10 2.44772 10 3C10 3.55228 9.55228 4 9 4H5Z" fill="#050A30" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2929 6.29289C15.6834 5.90237 16.3166 5.90237 16.7071 6.29289L21.7071 11.2929C22.0976 11.6834 22.0976 12.3166 21.7071 12.7071L16.7071 17.7071C16.3166 18.0976 15.6834 18.0976 15.2929 17.7071C14.9024 17.3166 14.9024 16.6834 15.2929 16.2929L19.5858 12L15.2929 7.70711C14.9024 7.31658 14.9024 6.68342 15.2929 6.29289Z" fill="#050A30" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 12C8 11.4477 8.44772 11 9 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H9C8.44772 13 8 12.5523 8 12Z" fill="#050A30" />
          </svg>
        </button>
        <button className={styles.chatClose} onClick={handleCloseChat}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 4C4.44772 4 4 4.44772 4 5V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V5C20 4.44772 19.5523 4 19 4H5ZM2 5C2 3.34315 3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V5Z" fill="#050A30" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 8.29289C8.68342 7.90237 9.31658 7.90237 9.70711 8.29289L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L8.29289 9.70711C7.90237 9.31658 7.90237 8.68342 8.29289 8.29289Z" fill="#050A30" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289Z" fill="#050A30" />
          </svg>
        </button>
      </div>

        <ChatHistory messages={messages} />

      <div className={styles.inputSection}>
        <textarea
          ref={textareaRef}
          placeholder="Type a message..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleEnterPress}
        />

        <button onClick={handleSendMessage}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M28.3839 1.61612C28.872 2.10427 28.872 2.89573 28.3839 3.38388L14.6339 17.1339C14.1457 17.622 13.3543 17.622 12.8661 17.1339C12.378 16.6457 12.378 15.8543 12.8661 15.3661L26.6161 1.61612C27.1043 1.12796 27.8957 1.12796 28.3839 1.61612Z" fill="#12229D" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M28.3839 1.61609C28.7234 1.95564 28.8385 2.45968 28.6798 2.91291L19.9298 27.9129C19.7605 28.3967 19.3131 28.728 18.801 28.7489C18.2889 28.7698 17.8159 28.476 17.6077 28.0076L12.803 17.197L1.99233 12.3922C1.52398 12.1841 1.23015 11.7111 1.25105 11.199C1.27194 10.6869 1.60332 10.2395 2.08707 10.0702L27.0871 1.32015C27.5403 1.16152 28.0443 1.27654 28.3839 1.61609ZM5.88885 11.3882L14.2577 15.1077C14.5405 15.2334 14.7666 15.4595 14.8923 15.7423L18.6118 24.1111L25.4625 4.53744L5.88885 11.3882Z" fill="#12229D" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MainContent;
