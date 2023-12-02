'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import AsidePannel from '../components/asidePannel/asidePannel';
import MainContent from '../components/mainContent/mainContent';
import CollapsibleChatMenu from  '../components/collapseButton/CollapseButton';

export default function Home() {
  const [isChatMenuCollapsed, setChatMenuCollapsed] = useState(false);

  const toggleChatMenu = () => {
    setChatMenuCollapsed(!isChatMenuCollapsed);
  };

  return (
    <main className={styles.main}>
      {/* Aside pannel */}
      <div className={styles.aside}>
        <AsidePannel />
      </div>
      
      {/* Chat Menu */}
      <CollapsibleChatMenu
        isCollapsed={isChatMenuCollapsed}
        toggleChatMenu={toggleChatMenu}
      />
      
      {/* Main Chat Content */}
      <div className={styles.mainContent}>
        <MainContent />
      </div>
    </main>
  );
}
