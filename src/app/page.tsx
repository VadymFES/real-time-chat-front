'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

  useEffect(() => {
    // Retrieve the username, userId, selectedRoomName, and selectedRoomId from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('userId');
    const storedSelectedRoomName = localStorage.getItem('selectedRoomName');
    const storedSelectedRoomId = localStorage.getItem('selectedRoomId');

    if (storedUsername && storedUserId) {
      setUsername(storedUsername);
      setUserId(storedUserId);
    } else {
      setShowRegistrationPopup(true); // Show registration popup if no user data
      setSelectedRoomName('');
      setSelectedRoomId('');
      localStorage.removeItem('selectedRoomName');
      localStorage.removeItem('selectedRoomId');
    }

    if (storedSelectedRoomName && storedSelectedRoomId) {
      setSelectedRoomName(storedSelectedRoomName);
      setSelectedRoomId(storedSelectedRoomId);
    }
  }, []);

  const closeRegistrationPopup = () => {
    setShowRegistrationPopup(false);
    setSelectedRoomName(''); 
    setSelectedRoomId('');
    localStorage.removeItem('selectedRoomName');
    localStorage.removeItem('selectedRoomId');
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
      localStorage.setItem('selectedRoomName', roomName);
      localStorage.setItem('selectedRoomId', roomId);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error joining the room:', error.response?.data || error.message);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  return (
    <UserContext.Provider value={{ username, setUsername, setUserId, userId }}>
      <main className={styles.main}>
        {showRegistrationPopup && <RegistrationPopup onClose={closeRegistrationPopup} />}
        <RoomSelection onSelectRoom={handleRoomSelection} selectedRoom={selectedRoomName} />
        <div className={styles.mainContent}>
          {selectedRoomId && <MainContent selectedRoomId={selectedRoomId} selectedRoomName={selectedRoomName} />}
        </div>
      </main>
    </UserContext.Provider>
  );
}
