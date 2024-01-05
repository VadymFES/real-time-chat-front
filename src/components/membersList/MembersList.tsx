// MembersList.tsx

import React, { useState } from 'react';
import styles from './MembersList.module.css';

interface MemberProps {
  name: string;
  isActive: boolean;
}

const Member: React.FC<MemberProps> = ({ name, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={`${styles.member} ${isActive ? styles.active : ''}`}>
      {isActive && <div className={styles.activeBadge} />}
      <div className={styles.avatar} />
      <div className={styles.nameContainer}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={`${styles.name} ${isHovered && name.length > 12 ? styles.scrollText : ''}`}>
          {name}
        </div>
      </div>
    </div>
  );
};

interface MembersListProps {
  isOpen: boolean;

}

const MembersList: React.FC<MembersListProps> = ({ isOpen }) => {
    return (
    <section className={`${styles.membersList} ${isOpen ? styles.unvisible : ''}`}>
      <div className={styles.title}>Members</div>
      <Member name="John Doeklnnnnnnnnnnnnnnnnnnnnnn" isActive={true} />
      <Member name="Jane Doe" isActive={true} />
      <Member name="John Smith" isActive={false} />
      <Member name="Jane Smith" isActive={false} />
    </section>
  );
};

export default MembersList;
