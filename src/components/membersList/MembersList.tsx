import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MembersList.module.css';

interface MemberProps {
  name: string;
  isActiveSession: boolean;
}

const Member: React.FC<MemberProps> = ({ name, isActiveSession }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={`${styles.member} ${isActiveSession ? styles.active : ''}`}>
      {isActiveSession && <div className={styles.activeBadge} />}
      <div className={styles.avatar}>
        <img src="" alt="" />
        </div>
      <div
        className={styles.nameContainer}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`${styles.name} ${isHovered && name.length > 18 ? styles.scrollText : ''}`}
        >
          {name}
        </div>
      </div>
    </div>
  );
};

interface MembersListProps {
  selectedRoomId: string;
}

const MembersList: React.FC<MembersListProps> = ({ selectedRoomId }) => {
  const [members, setMembers] = useState<any[]>([]); // Assuming the structure of members fetched

  const fetchMembers = async () => {
    const roomId = parseInt(selectedRoomId, 10); // Convert the room ID to an integer
    if (!isNaN(roomId)) {
      try {
        const response = await axios.get(`http://localhost:7000/rooms/${roomId}/users`);
        if (response && response.data) {
          setMembers(response.data);
        }
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    }
  };

  useEffect(() => {
    fetchMembers();
    const intervalId = setInterval(fetchMembers, 5000);
    return () => clearInterval(intervalId);
  }, [selectedRoomId]);

  return (
    <section className={styles.membersList}>
      <div className={styles.title}>Members</div>
      {members.map((member: any, index: number) => (
        <Member
          key={index}
          name={member.name}
          isActiveSession={member.isActive} 
        />
      ))}
    </section>
  );
};

export default MembersList;