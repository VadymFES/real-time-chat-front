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
  const { setUsername: setGlobalUsername, setUserId: setGlobalUserId } = useContext(UserContext);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setRegistrationError(null);
  };
  
  const handleRegistration = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!username) {
      setRegistrationError('Please enter your name.');
      return;
    }
    
    try {
      setIsLoading(true);
      const postResponse = await axios.post(`http://51.20.108.68/guests/create`, { name: username }, { withCredentials: true });
      console.log('Registration Response:', postResponse.data); 
      console.log('Headers:', postResponse.headers);

  
      const userId = postResponse.data.id; 
      setGlobalUsername(username);
      setGlobalUserId(userId);
  

      localStorage.setItem('username', username);
      localStorage.setItem('userId', userId.toString());
  
      onClose();
    } catch (error: any) {
      console.error('Registration Error:', error); 
      setRegistrationError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  
  


  

  return (
    <>
      <div className={styles.backdrop} />
      <div className={styles.registrationPopup}>
        {isLoading ? <p>Loading...</p> : (
          <form onSubmit={handleRegistration}>
            <h1>Hi there!</h1>
            <h2>Type your name</h2>
            <label htmlFor="usernameInput" className={styles.label}>
              Your Name:
            </label>
            <input
              type="text"
              id="usernameInput"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
            {registrationError && (
              <p className={styles.error}>{registrationError}</p>
            )}
            <button type="submit" className={styles.button_go}>
              Let's go
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default RegistrationPopup;
