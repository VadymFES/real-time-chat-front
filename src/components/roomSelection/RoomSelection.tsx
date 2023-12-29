import React, { useState, useEffect } from 'react';
import styles from './roomSelection.module.css';

type RoomSelectionProps = {
  onSelectRoom: (roomName: string) => void;
  selectedRoom: string;
};


interface Room {
  id: string;
  name: string;
  description: string;
  created_at: string; // Adjust the types based on your actual API response
}

const RoomSelection = ({ onSelectRoom, selectedRoom }: RoomSelectionProps) => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    fetch('http://51.20.108.68/rooms/')
      .then(response => response.json())
      .then(data => {
        setRooms(data); // Assuming data is an array of Room objects
      })
      .catch(error => {
        console.error('Error fetching rooms:', error);
      });
  }, []);

  return (
    <div className={styles.tabContainer}>
      <section className={styles.topChatName}>
        <div className={styles.tabHeader}>
          <h1 className={styles.chatName}>Echo chat</h1>
          <div className={styles.supportSettings}>
          <button className={styles.support}>Support</button>
          <button className={styles.settings}>Settings</button>
          </div>
         
          <p> userName writting...</p>
        </div>
      </section>
      <section className={styles.roomButtons}>
        {rooms.map(room => (
          <button
            key={room.id}
            onClick={() => onSelectRoom(room.name)}
            className={`${styles.tab} ${room.name === selectedRoom ? styles.activeTab : ''}`}
          >
            {room.name}
          </button>
        ))}
      </section>
    </div>
  );
};

export default RoomSelection;