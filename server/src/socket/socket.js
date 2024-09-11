import { Server } from 'socket.io';
import { Conversation } from '../models/conversationSchema.js';
import { Message } from '../models/messageSchema.js'; 

const userSocketMap = {}; // { userId: socketId }

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
    },
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    const userId = socket.handshake.query.userId;
    if (userId && userId !== 'undefined') {
      userSocketMap[userId] = socket.id;
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    // Dodavanje poruke u razgovor
socket.on('sendMessage', async (messageData) => {
  const { conversationId, sender, receiver, content } = messageData;

  try {
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      throw new Error('Conversation not found');
    }

    const message = {
      sender,
      receiver,
      content,
      timestamp: new Date(),
    };

    const savedMessage = await new Message(message).save(); // Sačuvaj poruku

    conversation.messages.push(savedMessage._id); // Dodaj ID poruke u razgovor
    await conversation.save();

    io.to(conversationId).emit('receiveMessage', savedMessage);
  } catch (error) {
    console.error('Error sending message:', error.message);
    socket.emit('error', { message: 'Failed to send message' });
  }
});


    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
      delete userSocketMap[userId];
      io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
  });

  return io;
};
