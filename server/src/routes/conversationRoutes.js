import express from 'express'
import { getUserConversationsController, createConversationController } from '../controllers/conversationController.js'

export const conversationRouter = express.Router()

conversationRouter.get('/user/:id/conversations', getUserConversationsController)
conversationRouter.post('/create', createConversationController)
