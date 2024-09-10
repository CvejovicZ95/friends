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

export const createConversation = async (senderId, receiverId) => {
    try {
      let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] }
      });
  
      if (!conversation) {
        conversation = new Conversation({
          participants: [senderId, receiverId],
          messages: []
        });
  
        await conversation.save(); 
        logger.info(`Created new conversation between ${senderId} and ${receiverId}`);
      } else {
        logger.info(`Conversation already exists between ${senderId} and ${receiverId}`);
      }
  
      return conversation;
    } catch (error) {
      logger.error(`Error creating conversation between ${senderId} and ${receiverId}: ${error.message}`, {
        stack: error.stack
      });
      throw new Error('Error creating conversation');
    }
  };
