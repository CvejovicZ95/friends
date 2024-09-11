import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import io from "socket.io-client";
import { useAuthContext } from "./authContext"; // Pretpostavljam da je AuthContext u istom folderu

const SOCKET_URL = "http://localhost:4500"; // Promenite URL na vaš server

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const { authUser } = useAuthContext();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (authUser) {
      const socketInstance = io(SOCKET_URL, {
        query: { userId: authUser.id },
        transports: ["websocket"], // Podesite prevoz ako je potrebno
      });

      setSocket(socketInstance);

      return () => {
        socketInstance.disconnect();
      };
    }
  }, [authUser]);

  const sendMessage = (messageData) => {
    if (socket) {
      socket.emit("sendMessage", messageData);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (message) => {
        // Obradite primljenu poruku
        console.log("New message received:", message);
      });

      // Opcionalno: Povezivanje sa serverom radi obrade poruka
      socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });
    }
  }, [socket]);

  return (
    <SocketContext.Provider value={{ sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

SocketProvider.propTypes = { children: PropTypes.any };
