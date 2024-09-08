import { Server } from 'socket.io';
import { Conversation } from '../models/conversationSchema.js'; 

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

    socket.on('sendMessage', async (messageData) => {
      const { conversationId, sender, receiver, content } = messageData;

      try {
        // Dodaj poruku u bazu
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

        // Pretpostavljam da imaš metod za dodavanje poruka u konverzaciju
        conversation.messages.push(message);
        await conversation.save();

        io.to(conversationId).emit('receiveMessage', message);
      } catch (error) {
        console.error('Error sending message:', error.message);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    socket.on('createConversation', async (participants) => {
      try {
        if (participants.length < 2) {
          throw new Error('Participants must be an array with at least two users.');
        }

        // Kreiraj novu konverzaciju
        const newConversation = new Conversation({ participants });
        await newConversation.save();

        io.emit('ConversationCreated', newConversation);
      } catch (error) {
        console.error('Error creating conversation:', error.message);
        socket.emit('error', { message: 'Failed to create conversation' });
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