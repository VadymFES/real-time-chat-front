import React, { useState, ChangeEvent, useEffect } from 'react';
import styles from './RegistrationPopup.module.css';
import axios from 'axios';

interface RegistrationPopupProps {
  onClose: () => void;
}

const RegistrationPopup: React.FC<RegistrationPopupProps> = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [registered, setRegistered] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const isUserRegistered = localStorage.getItem('isUserRegistered');
    if (isUserRegistered) {
      setRegistered(true);
    }
  }, []);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setError(''); // Clear error when the username changes
  };
  
  const createUser = async () => {
    if (!username.trim()) {
      setError('Please enter a valid username.');
      return;
    }
  
    try {
      const response = await axios.post(
        'http://51.20.108.68/guests/create',
        { name: username },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200 || response.status === 201) {
        const createdUser = response.data; // Assuming the response contains the created user's data with an ID
  
        // Set a flag in localStorage indicating that the user has registered
        localStorage.setItem('isUserRegistered', 'true');
  
        // You can perform actions here based on the created user's data
        console.log('User created:', createdUser);
  
        onClose();
      } else {
        throw new Error('Failed to create user');
      }
    } catch (error) {
      setError('Failed to create user. Please try again.'); // Set error message on failure
    }
  };
    
  if (registered) {
    return null; // If the user is registered, don't render the registration popup
  }

  return (
    <>
      <div className={styles.backdrop} />
      <div className={styles.registrationPopup}>
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
        {error && <p className={styles.error}>{error}</p>} {/* Display error if present */}
        <button onClick={createUser} className={styles.button_go}>
          Let's talk!
        </button>
      </div>
    </>
  );
};

export default RegistrationPopup;
