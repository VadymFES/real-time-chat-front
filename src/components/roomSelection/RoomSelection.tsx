import React, { useState, useEffect } from 'react';
import styles from './roomSelection.module.css';

type RoomSelectionProps = {
  onSelectRoom: (roomName: string, roomId: string) => void;
  selectedRoom: string;
  onAddTabToggle: (isOpen: boolean) => void;
};

interface Room {
  id: string;
  name: string;
  description: string;
  created_at: string; 
}

const RoomSelection = ({ onSelectRoom, selectedRoom, onAddTabToggle }: RoomSelectionProps) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  
  const [isAddTabActive, setIsAddTabActive] = useState(false);

  useEffect(() => {
    const isAddTabActiveFromStorage = localStorage.getItem('isAddTabActive') === 'true';
    setIsAddTabActive(isAddTabActiveFromStorage);

    fetch('http://localhost:7000/rooms/') 
      .then(response => response.json())
      .then(data => setRooms(data))
      .catch(error => console.error('Error fetching rooms:', error));
  }, []);

  useEffect(() => {
    localStorage.setItem('isAddTabActive', isAddTabActive.toString());
  }, [isAddTabActive]);

  const handleTabClick = (roomName: string, roomId: string) => {
    onSelectRoom(roomName, roomId);
    setIsAddTabActive(false); 
    onAddTabToggle(false); 
  };

  const handleAddTabClick = () => {
    setIsAddTabActive(true); 
    onAddTabToggle(true);
  
    localStorage.removeItem('selectedRoomId');
    localStorage.removeItem('selectedRoomName');
  };

  return (
    <>
      <div className={styles.tabContainer}>
        <section className={styles.topChatName}>
          <div className={styles.tabHeader}>
            <h1 className={styles.chatName}>Echo chat</h1>
            <div className={styles.supportSettings}>
              <button className={styles.support}>Support</button>
              <button className={styles.settings}>Settings</button>
            </div>
            <p>userName writing...</p>
          </div>
        </section>
      </div>
      <section className={styles.roomButtons}>
        {rooms.map(room => (
          <button
            key={room.id}
            onClick={() => handleTabClick(room.name, room.id)}
            className={`${styles.tab} ${selectedRoom === room.name ? styles.activeTab : ''}`}
          >
            {room.name}
          </button>
        ))}
        <button 
          className={`${styles.addTab} ${isAddTabActive ? styles.activeTab : ''}`}
          onClick={handleAddTabClick}
        >
          +
        </button>
      </section>
    </>
  );
};

export default RoomSelection;
