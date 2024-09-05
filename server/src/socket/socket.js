import {Server} from 'socket.io'

export const initializeSocket = (server) => {
    const io = new Server(server, {
        cors:{
            origin:["http://localhost:3000"],
            methods:["GET","POST"]
          },
    });

    io.on('connection',(socket)=> {
        console.log(`User connected: ${socket.id}`)

        socket.on('sendMessage', (messageData)=> {
            const { conversationId, sender, receiver, content} = messageData;
            io.to(conversationId).emit('receiveMessage', { sender,receiver, content })
        });

        socket.on('createConversation', (participants) => {
            //
            //
            io.emit('ConversationCreated', participants)
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`)
        })
    })

    return io;
}