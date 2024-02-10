'use client'

import React, { useState, useEffect, useContext } from 'react';
import styles from './mainContent.module.css';
import MessageHistory from './chatHistory/MessageHistory';
import autosize from 'autosize';
import AddMessage from '../addMessage/addMessage';
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
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    autosize(document.querySelectorAll('textarea'));
  }, []);

  useEffect(() => {

    // Create a new WebSocket connection when selectedRoomId changes
    const newSocket = new WebSocket(`ws://localhost:3000/rooms/${selectedRoomId}`);
    setSocket(newSocket);

    newSocket.onmessage = (event) => {
      const message: Message = JSON.parse(event.data);
      setMessages(prevMessages => [...prevMessages, message]);
    };

    newSocket.onopen = () => {
      console.log("WebSocket connected!");
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };


    return () => {
      if (newSocket.readyState === 1) { // <-- This is important
        newSocket.close();
      }
  }

  }, [selectedRoomId]);;

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
            <AddMessage currentUser={username} selectedRoomId={selectedRoomId} socket={socket} />
          </section>
        </>
      )}
    </div>
  );
};

export default MainContent;