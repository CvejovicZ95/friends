import { Conversation } from '../models/conversationSchema.js';
import { logger } from "../../logger.js";

export const getUserConversations = async (userId) => {
  try {
      const conversations = await Conversation.find({
          participants: userId
      }).populate('participants').populate('messages');
      
      return conversations;
  } catch (error) {
      logger.error(`Error fetching conversations for user ${userId}: ${error.message}`, {
          stack: error.stack,
          userId
      });
      throw new Error('Error fetching conversations for user');
  }
}
