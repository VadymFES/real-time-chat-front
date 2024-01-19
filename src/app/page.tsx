"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import styles from './page.module.css';
import MainContent from '../components/mainContent/mainContent';
import RegistrationPopup from '../components/popUpRegistration/RegistrationPopup';
import UserContext from '../contexts/UserContext';
import RoomSelection from '../components/roomSelection/RoomSelection';

export default function Home() {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [showRegistrationPopup, setShowRegistrationPopup] = useState(!localStorage.getItem('username') || !localStorage.getItem('userId'));
  const [selectedRoomName, setSelectedRoomName] = useState('');
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [isAddTabOpen, setIsAddTabOpen] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('userId');
    const storedSelectedRoomId = Cookies.get('selectedRoomId');
    const storedSelectedRoomName = localStorage.getItem('selectedRoomName') || '';
  
    setUsername(storedUsername || '');
    setUserId(storedUserId || '');
    setShowRegistrationPopup(!storedUsername || !storedUserId);
  
    if (storedSelectedRoomId) {
      setSelectedRoomId(storedSelectedRoomId);
      setSelectedRoomName(storedSelectedRoomName);
      setIsAddTabOpen(storedSelectedRoomId === 'addTab');
    }
  }, []);

  const closeRegistrationPopup = () => {
    setShowRegistrationPopup(false);
    setSelectedRoomName('');
    setSelectedRoomId('');
    localStorage.removeItem('selectedRoomName');
    localStorage.removeItem('selectedRoomId');
    Cookies.remove('selectedRoomId');
  };

  const handleRoomSelection = async (roomName: string, roomId: string) => {
    try {
      const parsedRoomId = parseInt(roomId, 10);
      const parsedUserId = parseInt(userId, 10);

      if (isNaN(parsedRoomId) || isNaN(parsedUserId)) {
        console.error('Invalid room ID or user ID');
        return;
      }

      await axios.post(`http://51.20.108.68/rooms/${parsedRoomId}/join?guest_id=${parsedUserId}`);
      setSelectedRoomName(roomName);
      setSelectedRoomId(roomId);
      setIsAddTabOpen(false);
      localStorage.setItem('selectedRoomName', roomName);
      localStorage.setItem('selectedRoomId', roomId);
      Cookies.set('selectedRoomId', roomId);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error joining the room:', error.response?.data || error.message);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  const toggleAddTab = (isOpen: boolean) => {
    setIsAddTabOpen(isOpen);
    if (isOpen) {
      setSelectedRoomName('');
      setSelectedRoomId('addTab');
      Cookies.set('selectedRoomId', 'addTab');
    } else {
      Cookies.remove('selectedRoomId');
    }
  };

  const renderMainContent = () => {
    if (isAddTabOpen) {
      return (
        <div className={styles.createRoom}>
          <h1 className={styles.chatNameNew}>Enter chat name</h1> 
          <input type="text" className={styles.nameInputNew} />
          <div className={styles.buttonContainer}>
            <button type="reset" className={styles.buttonCancel}>Cancel</button>
            <button type="submit" className={styles.buttonSubmit}>Create</button>
          </div>
        </div>
      );
    } else if (selectedRoomId && selectedRoomId !== 'addTab') {
      return <MainContent selectedRoomId={selectedRoomId} selectedRoomName={selectedRoomName} />;
    } else {
      return <div className={styles.placeholder}>Please select a room to start chatting.</div>;
    }
  };

  return (
    <UserContext.Provider value={{ username, setUsername, setUserId, userId }}>
      <main className={styles.main}>
        {showRegistrationPopup && <RegistrationPopup onClose={closeRegistrationPopup} />}
        <RoomSelection onSelectRoom={handleRoomSelection} selectedRoom={selectedRoomName} onAddTabToggle={toggleAddTab} />
        <div className={styles.mainContent}>
          {renderMainContent()}
        </div>
      </main>
    </UserContext.Provider>
  );
}
