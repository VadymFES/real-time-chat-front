'use client';

import React, { useState, useRef, useEffect } from 'react';
import ChatMenu from '../chatMenu/chatMenu';
import styles from './CollapseButton.module.css'; // Import your CSS module

interface CollapsibleChatMenuProps {
  isCollapsed: boolean;
  toggleChatMenu: () => void;
}

const CollapsibleChatMenu: React.FC<CollapsibleChatMenuProps> = ({ isCollapsed, toggleChatMenu }) => {
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isCollapsed]);

  const chatMenuContentStyle: React.CSSProperties = {
    maxHeight: isCollapsed ? '0' : `${contentHeight}px`,
  };

  return (
    <div className={`${styles.chatMenu} ${isCollapsed ? styles.collapsed : ''}`}>
      <button className={styles.collapseButton} onClick={toggleChatMenu}>
        <span className={styles.arrowIcon}>{isCollapsed ? '❯' : '❮'}</span>
      </button>
      <div
        className={`${styles.chatMenuContent} ${isCollapsed ? styles.collapsedContent : ''}`}
        style={chatMenuContentStyle}
        ref={contentRef}
      >
        {!isCollapsed && <ChatMenu />}
      </div>
    </div>
  );
};

export default CollapsibleChatMenu;
