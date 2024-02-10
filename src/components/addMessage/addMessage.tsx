import React, { useState, useEffect } from "react";
import styles from "./addMessage.module.css";

interface AddMessageProps {
  currentUser: string;
  selectedRoomId: string;
  socket: WebSocket | null;
}

const AddMessage: React.FC<AddMessageProps> = ({ currentUser, selectedRoomId }) => {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>("Disconnected");

  useEffect(() => {
    setConnectionStatus("Connecting...");
    const newSocket = new WebSocket(`ws://localhost:3000/messages/send_message/${selectedRoomId}`);

    const connectionTimeout = setTimeout(() => {
      // If the connection is not open within 10 seconds, consider it failed
      if (newSocket.readyState !== WebSocket.OPEN) {
        setConnectionStatus("Connection Failed");
        console.error("WebSocket connection timeout");
        newSocket.close(); // Close the connection attempt
      }
    }, 10000); // Timeout period (e.g., 10000 milliseconds)

    newSocket.onopen = () => {
      clearTimeout(connectionTimeout); // Clear the timeout on successful connection
      console.log("WebSocket connected!");
      setConnectionStatus("Connected");
    };

    newSocket.onerror = (error) => {
      clearTimeout(connectionTimeout); // Clear the timeout on error
      console.error("WebSocket error:", error);
      setConnectionStatus("Error");
    };

    newSocket.onclose = () => {
      clearTimeout(connectionTimeout); // Ensure timeout is cleared on close
      console.log("WebSocket disconnected");
      setConnectionStatus("Disconnected");
    };

    setSocket(newSocket);

    if (newSocket.readyState === 1) { // <-- This is important
      newSocket.close();
    }

  }, [selectedRoomId]);

  const sendMessageToServer = (message: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const messageData = {
        sender: currentUser,
        text: message,
      };
      socket.send(JSON.stringify(messageData));
    } else {
      console.error("WebSocket is not connected or still connecting");
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessageToServer(message);
      setMessage("");
    } else {
      alert("Please enter a message");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section className={styles.inputSection}>
      <div className={styles.connectionStatus}>{connectionStatus}</div>
      <textarea
        placeholder="Type a message..."
        className={styles.textarea}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className={styles.sendButton} onClick={handleSendMessage}>
        Send
      </button>
    </section>
  );
};

export default AddMessage;
