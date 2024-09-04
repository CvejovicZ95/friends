import express from 'express'
//import { authenticateToken } from '../middleware/authToken.js'
import { sendMessageController, getMessagesController } from '../controllers/messageController.js'

export const messageRouter = express.Router()

messageRouter.post('/messages', sendMessageController);
messageRouter.get('/messages/:user1Username/:user2Username', getMessagesController);
