import express from 'express'
//import { authenticateToken } from '../middleware/authToken'
import { createMessageController, getMessagesController, clearAllNotificationsController, clearSenderNotificationsController } from '../controllers/messageController.js'

export const messageRouter = express.Router()

messageRouter.get("/:id", getMessagesController)
messageRouter.post('/send/:conversationId', createMessageController);
messageRouter.post('/users/:userId/clear-notifications', clearAllNotificationsController);
messageRouter.post('/users/:userId/clear-notifications/sender/:senderId', clearSenderNotificationsController);
