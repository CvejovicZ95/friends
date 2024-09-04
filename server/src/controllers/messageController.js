import { sendMessage, getMessagesBetweenUsers } from "../service/messageService.js";
import { logger } from "../../logger.js";

export const sendMessageController = async (req, res) => {
    try {
        const senderUsername = req.body.senderUsername; // Sada se uzima iz tela zahteva
        const receiverUsername = req.body.receiverUsername;
        const content = req.body.content;

        if (!senderUsername || !receiverUsername || !content) {
            return res.status(400).json({ message: 'Sender username, receiver username, and content are required' });
        }

        const newMessage = await sendMessage(senderUsername, receiverUsername, content);
        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Detailed error sending message:', error);
        res.status(500).json({ error: 'Error sending message', details: error.message });
    }
};


export const getMessagesController = async (req, res) => {
    try {
        const user1Username = req.params.user1Username;
        const user2Username = req.params.user2Username;

        if (!user1Username || !user2Username) {
            return res.status(400).json({ message: 'Both user usernames are required' });
        }

        const messages = await getMessagesBetweenUsers(user1Username, user2Username);
        res.status(200).json(messages);
    } catch (error) {
        console.error('Detailed error fetching messages:', error);
        res.status(500).json({ error: 'Error fetching messages', details: error.message });
    }
};


