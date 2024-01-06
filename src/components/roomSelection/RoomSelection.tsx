import React, { useState, useEffect } from 'react';
import styles from './roomSelection.module.css';

type RoomSelectionProps = {
  onSelectRoom: (roomName: string, roomId: string) => void;
  selectedRoom: string;
};

interface Room {
  id: string;
  name: string;
  description: string;
  created_at: string; 
}

const RoomSelection = ({ onSelectRoom, selectedRoom }: RoomSelectionProps) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [anyTabActive, setAnyTabActive] = useState(() => {
    return localStorage.getItem('anyTabActive') === 'true';
  });

  useEffect(() => {
    fetch('http://51.20.108.68/rooms/') 
      .then(response => response.json())
      .then(data => setRooms(data))
      .catch(error => console.error('Error fetching rooms:', error));
  }, []);

  useEffect(() => {
    localStorage.setItem('anyTabActive', anyTabActive.toString());
  }, [anyTabActive]);

  const handleTabClick = (roomName: string, roomId: string) => {
    onSelectRoom(roomName, roomId);
    setAnyTabActive(true);
  };

  return (
    <><div className={styles.tabContainer}>
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
            className={`${styles.tab} ${anyTabActive ? styles.roundedTabs : ''} ${room.name === selectedRoom ? styles.activeTab : ''}`}
          >
            {room.name}
          </button>
        ))}
        <button className={`${styles.tab} ${anyTabActive ? styles.roundedTabs : ''}`}>+</button>
      </section></>
  );
};

export default RoomSelection;
