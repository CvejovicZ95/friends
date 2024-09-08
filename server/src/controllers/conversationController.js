import { getUserConversations } from '../service/conversationService.js';

export const getUserConversationsController = async (req, res) => {
    try {
        const userId = req.params.id;
        const conversations = await getUserConversations(userId);
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json({ error: `Server error: ${error.message}` });
    }
}

