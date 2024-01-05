'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import AsidePannel from '../components/asidePannel/asidePannel';
import MainContent from '../components/mainContent/mainContent';
import CollapsibleChatMenu from '../components/collapseButton/CollapseButton';
import RegistrationPopup from '../components/popUpRegistration/RegistrationPopup';

export default function Home() {
  const [isChatMenuCollapsed, setChatMenuCollapsed] = useState(false);
  const [showRegistrationPopup, setShowRegistrationPopup] = useState(false);
  const [hasVisitedChat, setHasVisitedChat] = useState(false); // This keeps track of whether the user has visited the chat

  const toggleChatMenu = () => {
    setChatMenuCollapsed(!isChatMenuCollapsed);
  };

  useEffect(() => {
    // Check if the user has visited the chat before showing the registration pop-up
    if (!hasVisitedChat) {
      setShowRegistrationPopup(true);
      setHasVisitedChat(true); // Update the state to indicate that the user has visited the chat
    }
  }, [hasVisitedChat]);

  const closeRegistrationPopup = () => {
    setShowRegistrationPopup(false);
  };

  return (
    <main className={styles.main}>
      {/* Aside panel */}
      <div className={styles.aside}>
        <AsidePannel />
      </div>

      {/* Chat Menu */}
      <CollapsibleChatMenu isCollapsed={isChatMenuCollapsed} toggleChatMenu={toggleChatMenu} />

      {/* Main Chat Content */}
      <div className={styles.mainContent}>
        <MainContent />
      </div>

      {/* Registration Popup */}
      {showRegistrationPopup && (
        <RegistrationPopup onClose={closeRegistrationPopup} />
      )}
    </main>
  );
}
