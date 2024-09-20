import express from 'express';
import { 
    createChatRequestController, 
    getChatRequestsByUserIdController, 
    manageChatRequestController 
} from '../controllers/chatRequestController.js';

export const chatRequestRouter = express.Router();

chatRequestRouter.post('/send-chat-request', createChatRequestController);
chatRequestRouter.get('/chat-requests/:userId', getChatRequestsByUserIdController);
chatRequestRouter.post('/manage-chat-request', manageChatRequestController);
