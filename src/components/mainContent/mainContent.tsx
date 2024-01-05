'use client'

import React, { useState, useEffect, useContext } from 'react';
import styles from './mainContent.module.css';
import MessageHistory from './chatHistory/MessageHistory';
import autosize from 'autosize';
import AddMessage from '../addMessage/addMessage';
import { v4 as uuidv4 } from 'uuid';
import MembersList from '../membersList/MembersList';
import UserContext from '../../contexts/UserContext';


interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

const MainContent: React.FC<{ selectedRoomId: string, selectedRoomName: string }> = ({ selectedRoomId, selectedRoomName }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const { username } = useContext(UserContext);

  useEffect(() => {
    autosize(document.querySelectorAll('textarea'));
  }, []);

    // Only load messages and members list if a room is selected
  useEffect(() => {
    if (selectedRoomId) {
      // Load messages for the selected room
      // Load members list for the selected room
      // This is a placeholder, replace it with your actual data fetching logic
    }
  }, [selectedRoomId]);

  const handleSendMessage = (newMessageText: string) => {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const timestamp = `${hours}:${minutes}`;
    

    const newMessage: Message = {
      id: uuidv4(), // This will assign a unique ID to each message
      text: newMessageText,
      sender: username, // Replace with the sender's name or ID
      timestamp: timestamp, // Replace with the time sent
    };
    setMessages([...messages, newMessage]);
  };


  return (
    <div className={styles.chatContainer} >
      <div className={styles.header}>
        <p className={styles.chatName}>{`Chat Name - ${selectedRoomName}`}</p>
      </div>

      {selectedRoomId && (
        <>
          <section className={styles.MessageHistory}>
            <MessageHistory messages={messages} />
          </section>

          <section className={styles.MembersList}>
          <MembersList selectedRoomId={selectedRoomId} />
          </section>

          <section className={styles.AddMessage}>
            <AddMessage onAddMessage={handleSendMessage} currentUser={username} />
          </section>
        </>
      )}
    </div>
  );
};

export default MainContent;