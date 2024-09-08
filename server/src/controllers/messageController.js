import { createMessage, getMessages } from "../service/messageService.js";
import { logger } from "../../logger.js";

export const createMessageController = async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;

    if (!sender || !receiver || !content) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const message = await createMessage(sender, receiver, content);
    res.status(201).json(message);

  } catch (error) {
    logger.error('Error creating message', {
      message: error.message,
      stack: error.stack,
      requestBody: req.body
    });

    res.status(500).json({ message: 'Server error' });
  }
};

export const getMessagesController = async (req, res) => {
  try {
    const { id: conversationId } = req.params;

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
