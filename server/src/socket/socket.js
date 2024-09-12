import { Server } from 'socket.io';

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ['http://localhost:3000', 'http://192.168.1.8:3000'], // Obezbedi CORS podršku za frontend
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('User connected');
  
    socket.on('sendMessage', (message) => {
      console.log('Message received on server:', message);
      io.to(message.conversationId).emit('newMessage', message);
    });
  
    socket.on('joinConversation', (conversationId) => {
      socket.join(conversationId);
      console.log(`User joined conversation: ${conversationId}`);
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
  

  return io;
};
