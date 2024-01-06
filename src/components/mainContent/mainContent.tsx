'use client'

import React, { useState, useEffect, useContext } from 'react';
import styles from './mainContent.module.css';
import MessageHistory from './chatHistory/MessageHistory';
import autosize from 'autosize';
import AddMessage from '../addMessage/addMessage';
import { v4 as uuidv4 } from 'uuid';
import MembersList from '../membersList/MembersList';
import UserContext from '../../contexts/UserContext';
import axios from 'axios';


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

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://51.20.108.68/messages/get_room_messages/${selectedRoomId}`);
        const newMessages = response.data;
        // console.log(response);

        setMessages(prevMessages => {
          const newUniqueMessages = newMessages.filter((newMsg: { id: string; }) => 
            !prevMessages.some(prevMsg => prevMsg.id === newMsg.id));
          return [...prevMessages, ...newUniqueMessages];
        });
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    if (selectedRoomId) {
      fetchMessages();

      const intervalId = setInterval(fetchMessages, 5000);
      return () => clearInterval(intervalId);
    }
  }, [selectedRoomId]);

  const handleSendMessage = (newMessageText: string) => {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const timestamp = `${hours}:${minutes}`;
    

    const newMessage: Message = {
      id: uuidv4(),
      text: newMessageText,
      sender: username, 
      timestamp: timestamp, 
    };
    setMessages([...messages, newMessage]);
  };


  return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>
        <p className={styles.chatName}>{`Chat Name - ${selectedRoomName}`}</p>
      </div>

      {selectedRoomId && (
        <>
          <section className={styles.MessageHistory}>
            <MessageHistory messages={messages} currentUser={username} />
          </section>
          <section className={styles.MembersList}>
            <MembersList selectedRoomId={selectedRoomId} />
          </section>
          <section className={styles.AddMessage}>
          <AddMessage currentUser={username} selectedRoomId={selectedRoomId} />
          </section>
        </>
      )}
    </div>
  );
};

export default MainContent;