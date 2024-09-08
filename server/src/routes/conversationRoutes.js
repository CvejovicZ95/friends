import express from 'express';
import { getUserConversationsController } from '../controllers/conversationController.js';

export const conversationRouter = express.Router();

conversationRouter.get('/user/:id/conversations', getUserConversationsController);


