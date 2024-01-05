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
  const [selectedRoom, setSelectedRoom] = useState('');

  useEffect(() => {
    // Retrieve the username, userId, and selectedRoom from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('userId');
    const storedSelectedRoom = localStorage.getItem('selectedRoom');

    if (storedUsername && storedUserId) {
      setUsername(storedUsername);
      setUserId(storedUserId);
    } else {
      setShowRegistrationPopup(true); // Show the registration popup if no user data is found
      setSelectedRoom(''); // Reset the selected room when user is not logged in
      localStorage.removeItem('selectedRoom'); // Clear the selected room from local storage
    }

    if (storedSelectedRoom) {
      setSelectedRoom(storedSelectedRoom);
    }
  }, []);

  const closeRegistrationPopup = () => {
    setShowRegistrationPopup(false);
    setSelectedRoom(''); 
    localStorage.removeItem('selectedRoom'); 
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
      setSelectedRoom(roomName);
      localStorage.setItem('selectedRoom', roomName);
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
        <RoomSelection onSelectRoom={handleRoomSelection} selectedRoom={selectedRoom} />
        <div className={styles.mainContent}>
          {selectedRoom && <MainContent selectedRoom={selectedRoom} />}
        </div>
      </main>
    </UserContext.Provider>
  );
}
