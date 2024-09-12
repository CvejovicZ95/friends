import { io } from "socket.io-client";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:4500";

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
});

socket.on('connect', () => {
  
});

socket.on('disconnect', () => {
  
});
