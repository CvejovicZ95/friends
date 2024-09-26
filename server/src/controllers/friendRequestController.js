import { createFriendRequest, getFriendRequestsByUserId, manageFriendRequest } from "../service/friendRequestService.js";
import { getUserByUsername, getUserById } from "../service/usersService.js";
import { FriendRequest } from "../models/friendRequestSchema.js";

export const createFriendRequestController = async (req, res) => {
    const { senderId, receiverUsername } = req.body; 
    try {
        const receiver = await getUserByUsername(receiverUsername); 
        if (!receiver) {
            return res.status(404).json({ error: 'Receiver not found' });
        }

        const existingRequest = await FriendRequest.findOne({
            senderId: senderId,
            receiverId: receiver._id,
            status: 'pending'
        });

        if (existingRequest) {
            return res.status(400).json({ error: 'Friend request already sent' });
        }

        const request = await createFriendRequest(senderId, receiver._id); 
        res.status(201).json(request);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getFriendRequestsByUserIdController = async (req, res) => {
    const { userId } = req.params;
    try {
        const requests = await getFriendRequestsByUserId(userId);
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const manageFriendRequestController = async (req, res) => {
    const { requestId, action } = req.body;
    try {
        const request = await manageFriendRequest(requestId, action);
        if (action === 'accept') {
            const sender = await getUserById(request.senderId); 
            res.status(200).json({ request, senderUsername: sender.username });
        } else {
            res.status(200).json({ request });
        }        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

