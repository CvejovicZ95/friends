import { FriendRequest } from "../models/friendRequestSchema.js";
import { logger } from "../../logger.js";

export const createFriendRequest = async (senderId, receiverId) => {
    try {
        const request = new FriendRequest({ senderId, receiverId });
        await request.save();
        return request;
    } catch (error) {
        logger.error('Error creating friend request', error.message);
        throw new Error('Error creating friend request');
    }
};

export const getFriendRequestsByUserId = async (userId) => {
    try {
        const requests = await FriendRequest.find({ receiverId: userId, status: 'pending' })
            .populate('senderId', 'username');
        return requests;
    } catch (error) {
        logger.error('Error fetching friend requests', error.message);
        throw new Error('Error fetching friend requests');
    }
};

export const manageFriendRequest = async (requestId, action) => {
    try {
        const request = await FriendRequest.findById(requestId);
        if (!request) {
            throw new Error('Friend request not found');
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
        logger.error('Error managing friend request', error.message);
        throw new Error('Error managing friend request');
    }
};
