'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import MainContent from '../components/mainContent/mainContent';
import RegistrationPopup from '../components/popUpRegistration/RegistrationPopup';
import UserContext from '../contexts/UserContext';
import RoomSelection from '../components/roomSelection/RoomSelection';

export default function Home() {
  const [username, setUsername] = useState('');
  const [showRegistrationPopup, setShowRegistrationPopup] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('');


  useEffect(() => {
    // Retrieve the username from localStorage
    const storedUsername = localStorage.getItem('registeredUsername');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      setShowRegistrationPopup(true); // Show the registration popup if no username is stored
    }
  }, []);

  const closeRegistrationPopup = () => {
    setShowRegistrationPopup(false);
  };

  useEffect(() => {
    // If username is set, store it in localStorage and close the registration popup
    if (username) {
      localStorage.setItem('registeredUsername', username);
      setShowRegistrationPopup(false);
    }
  }, [username]);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
    <main className={styles.main}>

      {showRegistrationPopup && <RegistrationPopup onClose={closeRegistrationPopup} />}
      
      <RoomSelection onSelectRoom={setSelectedRoom} selectedRoom={selectedRoom} />

      <div className={styles.mainContent}>
        {selectedRoom && <MainContent selectedRoom={selectedRoom} />}
      </div>

    </main>
  </UserContext.Provider>
  );
}
