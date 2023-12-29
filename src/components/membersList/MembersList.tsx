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
        <img src="/avatar.png" alt="" />
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

interface MembersListProps {}

const MembersList: React.FC<MembersListProps> = ({}) => {
  const [members, setMembers] = useState<any[]>([]); // Assuming the structure of members fetched

  const fetchMembers = async () => {
    try {
      const response = await axios.get('http://51.20.108.68/guests');
      if (response && response.data) {
        // Assuming the response.data is an array of members
        setMembers(response.data);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  useEffect(() => {
    // Fetch members initially
    fetchMembers();

    // Set up interval to fetch members periodically (every 5 seconds in this example)
    const intervalId = setInterval(fetchMembers, 5000);

    // Cleanup function to clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className={styles.membersList}>
      <div className={styles.title}>Members</div>
      {members.map((member: any, index: number) => (
        <Member
          key={index}
          name={member.name}
          isActiveSession={member.isActive} // Assuming member object contains an 'isActive' property
        />
      ))}
    </section>
  );
};

export default MembersList;