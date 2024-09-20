import { ChatRequest } from "../models/chatRequestSchema.js";
import { logger } from "../../logger.js";

export const createChatRequest = async (senderId, receiverId) => {
    try {
        const request = new ChatRequest({ senderId, receiverId });
        await request.save();
        return request;
    } catch (error) {
        logger.error('Error creating chat request', error.message);
        throw new Error('Error creating chat request');
    }
};

export const getChatRequestsByUserId = async (userId) => {
    try {
        const requests = await ChatRequest.find({ receiverId: userId, status: 'pending' })
            .populate('senderId', 'username');
        return requests;
    } catch (error) {
        logger.error('Error fetching chat requests', error.message);
        throw new Error('Error fetching chat requests');
    }
};

export const manageChatRequest = async (requestId, action) => {
    try {
        const request = await ChatRequest.findById(requestId);
        if (!request) {
            throw new Error('Chat request not found');
        }
        if (action === 'accept') {
            request.status = 'accepted';
        } else if (action === 'decline') {
            request.status = 'declined';
        } else {
            throw new Error('Invalid action');
        }
        await request.save();
        return request;
    } catch (error) {
        logger.error('Error managing chat request', error.message);
        throw new Error('Error managing chat request');
    }
};
