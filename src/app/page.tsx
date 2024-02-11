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
  const [showRegistrationPopup, setShowRegistrationPopup] = useState(true);
  const [selectedRoomName, setSelectedRoomName] = useState('');
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [isAddTabOpen, setIsAddTabOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchCategories();
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

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:7000/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

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

      await axios.post(`http://localhost:7000/rooms/${parsedRoomId}/join?guest_id=${parsedUserId}`);
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

  const createRoom = async () => {
    try {
      console.log('Creating room with name:', newRoomName);
      const url = `http://localhost:7000/rooms/create?room_name=${encodeURIComponent(newRoomName)}&category_id=${selectedCategory}&description=${encodeURIComponent(description)}`;
      const response = await axios.post(url);
      const { room_id } = response.data;
      setSelectedRoomName(newRoomName);
      setSelectedRoomId(room_id);
      Cookies.set('selectedRoomId', room_id);
      setIsAddTabOpen(false);
    } catch (error: any) {
      console.error('Error creating the room:', error.response?.data || error.message);
    }
  };
  

  const toggleAddTab = (isOpen: boolean | ((prevState: boolean) => boolean)) => {
    setIsAddTabOpen(isOpen);
    if (!isOpen) {
      setNewRoomName('');
      setSelectedCategory('');
      setDescription('');
    }
  };

  const handleCategoryChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedCategory(e.target.value);
  };

  const renderMainContent = () => {
    if (isAddTabOpen) {
      return (
        <div className={styles.createRoom}>
          <h1 className={styles.chatNameNew}>Enter chat name</h1> 
          <input type="text" className={styles.nameInputNew} value={newRoomName} onChange={(e) => setNewRoomName(e.target.value)} />
          <h1 className={styles.chatNameNew}>Select Category</h1>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Select a category</option>
            {categories.map((category: { id: string, name: string }) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          <h1 className={styles.chatNameNew}>Enter Description</h1>
          <input type="text" className={styles.nameInputNew} value={description} onChange={(e) => setDescription(e.target.value)} />
          <div className={styles.buttonContainer}>
            <button type="reset" className={styles.buttonCancel} onClick={() => toggleAddTab(false)}>Cancel</button>
            <button type="submit" className={styles.buttonSubmit} onClick={createRoom}>Create</button>
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
