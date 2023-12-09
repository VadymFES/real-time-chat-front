import React, { useState, ChangeEvent } from 'react';
import styles from './RegistrationPopup.module.css'; // Import CSS module

interface RegistrationPopupProps {
  onClose: () => void;
}

const RegistrationPopup: React.FC<RegistrationPopupProps> = ({ onClose }) => {
  const [username, setUsername] = useState('');

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return (
    <>
      <div className={styles.backdrop} /> {/* Backdrop for blurring */}
      <div className={styles.registrationPopup}> {/* Registration popup */}
        <h1>Hi there!</h1>
        <h2>Type your name</h2>
        <label htmlFor="username" className={styles.label}>Your Name:</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
        {/* You can use the onClose function to close the registration pop-up */}
        <button onClick={onClose} className={styles.button_go}>
          Let's go
        </button>
      </div>
    </>
  );
};

export default RegistrationPopup;
