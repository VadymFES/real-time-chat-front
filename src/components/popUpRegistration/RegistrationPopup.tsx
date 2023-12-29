import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../../contexts/UserContext';
import styles from './RegistrationPopup.module.css'; 

interface RegistrationPopupProps {
  onClose: () => void;
}

const RegistrationPopup: React.FC<RegistrationPopupProps> = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [registrationError, setRegistrationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUsername: setGlobalUsername } = useContext(UserContext);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setRegistrationError(null);
  };

  const handleRegistration = async () => {
    if (!username) {
      setRegistrationError('Please enter your name.');
      return;
    }
  
    try {
      setIsLoading(true);
      // Step 1: Create the user
      const userCreationResponse = await axios.post(`http://51.20.108.68/guests/create`, { name: username });
  
      setGlobalUsername(username);
      onClose(); // Close the registration popup
    } catch (error) {
      console.error(error);
      setRegistrationError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  
  

  return (
    <>
      <div className={styles.backdrop} />
      <div className={styles.registrationPopup}>
        {isLoading ? <p>Loading...</p> : (
          <>
            <h1>Hi there!</h1>
            <h2>Type your name</h2>
            <label htmlFor="username" className={styles.label}>
              Your Name:
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
            {registrationError && (
              <p className={styles.error}>{registrationError}</p>
            )}
            <button onClick={handleRegistration} className={styles.button_go}>
              Let's go
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default RegistrationPopup;
