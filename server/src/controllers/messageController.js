import { createMessage, getMessages, clearNotifications } from "../service/messageService.js";
import { logger } from "../../logger.js";

export const createMessageController = async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;
    const { conversationId } = req.params;

    const newMessage = await createMessage(sender, receiver, content, conversationId);

    const rooms = req.io.sockets.adapter.rooms;

    req.io.to(conversationId).emit("newMessage", newMessage);
    

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in createMessageController:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessagesController = async (req, res) => {
  const conversationId = req.params.id;

  try {
    if (!conversationId) {
      return res.status(400).json({ message: 'Conversation ID is required' });
    }

    const messages = await getMessages(conversationId);
    res.status(200).json(messages);

  } catch (error) {
    logger.error('Error retrieving messages', {
      message: error.message,
      stack: error.stack,
      conversationId
    });
    
    res.status(500).json({ message: 'Server error' });
  }
};

export const clearNotificationsController = async (req, res) => {
  const userId = req.params.userId;

  try {
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    await clearNotifications(userId);
    res.status(200).json({ message: 'Notifications cleared' });

  } catch (error) {
    console.error("Error in clearNotificationsController:", error);
    res.status(500).json({ message: 'Server error' });
  }
};
