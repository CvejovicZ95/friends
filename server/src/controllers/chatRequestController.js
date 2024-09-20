import { createChatRequest, getChatRequestsByUserId, manageChatRequest } from "../service/chatRequestService.js";
import { getUserByUsername, getUserById } from "../service/usersService.js";


export const createChatRequestController = async (req, res) => {
    const { senderId, receiverUsername } = req.body; 
    try {
        const receiver = await getUserByUsername(receiverUsername); 
        const request = await createChatRequest(senderId, receiver._id); 
        res.status(201).json(request);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getChatRequestsByUserIdController = async (req, res) => {
    const { userId } = req.params;
    try {
        const requests = await getChatRequestsByUserId(userId);
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const manageChatRequestController = async (req, res) => {
    const { requestId, action } = req.body;
    try {
        const request = await manageChatRequest(requestId, action);
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

