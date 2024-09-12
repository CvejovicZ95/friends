import { Server } from 'socket.io';

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ['http://localhost:3000', 'http://192.168.1.8:3000'],
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    
  
    socket.on('sendMessage', (message) => {
      io.to(message.conversationId).emit('newMessage', message);
    });
  
    socket.on('joinConversation', (conversationId) => {
      socket.join(conversationId);
    });
  
    socket.on('disconnect', () => {
      
    });
  });
  

  return io;
};
