import { FriendRequest } from "../models/friendRequestSchema.js";
import { logger } from "../../logger.js";
import { User } from "../models/userSchema.js";

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
    let request;
    try {
        request = await FriendRequest.findById(requestId);
        if (!request) {
            throw new Error('Friend request not found');
        }

        if (action === 'accept') {
            request.status = 'accepted';

            const sender = await User.findById(request.senderId);
            const receiver = await User.findById(request.receiverId);

            if (!sender || !receiver) {
                throw new Error('Sender or receiver not found');
            }

            const alreadyFriends = sender.friends.includes(receiver._id) || receiver.friends.includes(sender._id);

            if (alreadyFriends) {
                throw new Error('Users are already friends');
            }

            sender.friends.push(receiver._id);
            receiver.friends.push(sender._id);
            await sender.save();
            await receiver.save();
        } else if (action === 'decline') {
            request.status = 'declined';
        } else {
            throw new Error('Invalid action');
        }

        await request.save();
        return request;
    } catch (error) {
        logger.error('Error managing friend request', {
            message: error.message,
            requestId,
            action,
            senderId: request ? request.senderId : null,
            receiverId: request ? request.receiverId : null
        });
        throw new Error('Error managing friend request');
    }
};

