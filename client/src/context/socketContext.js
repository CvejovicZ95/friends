/*import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [handlers, setHandlers] = useState({});

  useEffect(() => {
    const socketIo = io("http://localhost:4500"); // Zameni sa vašom URL adresom servera
    setSocket(socketIo);

    // Prijavite se za `receiveMessage` događaj i prosledite sve funkcije
    socketIo.on('receiveMessage', (message) => {
      if (handlers.receiveMessage) {
        handlers.receiveMessage(message);
      }
    });

    return () => {
      socketIo.disconnect();
    };
  }, [handlers]);

  const sendMessage = (messageData) => {
    if (socket) {
      socket.emit("sendMessage", messageData);
    }
  };

  const onReceiveMessage = (callback) => {
    setHandlers(prev => ({ ...prev, receiveMessage: callback }));
  };

  return (
    <SocketContext.Provider value={{ sendMessage, onReceiveMessage }}>
      {children}
    </SocketContext.Provider>
  );
};*/
