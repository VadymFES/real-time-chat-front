import React, { useState } from "react";
import styles from "./addMessage.module.css";

interface AddMessageProps {
  onAddMessage: (message: string) => void;
}

export default function AddMessage({ onAddMessage }: AddMessageProps): JSX.Element {
  const [message, setMessage] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        onAddMessage(message);
        setMessage("");
      } else {
        alert("Please enter a message");
      }
    }
  };

  const handleButtonClick = () => {
    if (message.trim()) {
      onAddMessage(message);
      setMessage("");
    } else {
      alert("Please enter a message");
    }
  };

  return (
    <section className={styles.inputSection}>
      <textarea
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleButtonClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M28.3839 1.61612C28.872 2.10427 28.872 2.89573 28.3839 3.38388L14.6339 17.1339C14.1457 17.622 13.3543 17.622 12.8661 17.1339C12.378 16.6457 12.378 15.8543 12.8661 15.3661L26.6161 1.61612C27.1043 1.12796 27.8957 1.12796 28.3839 1.61612Z" fill="#12229D" />
          <path fillRule="evenodd" clipRule="evenodd" d="M28.3839 1.61609C28.7234 1.95564 28.8385 2.45968 28.6798 2.91291L19.9298 27.9129C19.7605 28.3967 19.3131 28.728 18.801 28.7489C18.2889 28.7698 17.8159 28.476 17.6077 28.0076L12.803 17.197L1.99233 12.3922C1.52398 12.1841 1.23015 11.7111 1.25105 11.199C1.27194 10.6869 1.60332 10.2395 2.08707 10.0702L27.0871 1.32015C27.5403 1.16152 28.0443 1.27654 28.3839 1.61609ZM5.88885 11.3882L14.2577 15.1077C14.5405 15.2334 14.7666 15.4595 14.8923 15.7423L18.6118 24.1111L25.4625 4.53744L5.88885 11.3882Z" fill="#12229D" />
        </svg>
      </button>
    </section>
  );
}
