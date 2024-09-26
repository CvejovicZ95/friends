import { Server } from 'socket.io'

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ['http://localhost:3000', 'http://192.168.1.8:3000'],
      methods: ['GET', 'POST'],
      credentials: true
    }
  })

  const userSockets = {}

  io.on('connection', (socket) => {
    socket.on('sendMessage', (message) => {
      const { conversationId } = message

      const room = io.sockets.adapter.rooms.get(conversationId)

      if (room) {
        room.forEach(clientSocketId => {
          if (clientSocketId !== socket.id) {
            io.to(clientSocketId).emit('newMessage', message)
          }
        })
      }
    })

    socket.on('joinConversation', (conversationId) => {
      socket.join(conversationId)

      userSockets[socket.id] = conversationId
    })

    socket.on('disconnect', () => {
      delete userSockets[socket.id]
    })
  })

  return io
}
