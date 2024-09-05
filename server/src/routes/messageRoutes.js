import express from 'express'
//import { authenticateToken } from '../middleware/authToken'
import { createMessageController, getMessagesController } from '../controllers/messageController.js'

export const messageRouter = express.Router()

messageRouter.get("/:id", getMessagesController)
messageRouter.post('/send', createMessageController);