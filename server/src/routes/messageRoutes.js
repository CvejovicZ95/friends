import express from 'express'
import { createMessageController, getMessagesController, clearSenderNotificationsController } from '../controllers/messageController.js'

export const messageRouter = express.Router()

messageRouter.get('/:id', getMessagesController)
messageRouter.post('/send/:conversationId', createMessageController)
messageRouter.post('/users/:userId/clear-notifications/sender/:senderId', clearSenderNotificationsController)
