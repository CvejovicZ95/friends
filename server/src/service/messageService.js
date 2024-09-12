import { Message } from "../models/messageSchema.js";
import { Conversation } from "../models/conversationSchema.js";
import { logger } from "../../logger.js";

export const createMessage = async (sender, receiver, content, conversationId) => {
  try {
    let conversation;

    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        throw new Error('Conversation not found');
      }
    } else {
      conversation = await Conversation.findOne({
        participants: { $all: [sender, receiver] }
      });

      if (!conversation) {
        conversation = new Conversation({
          participants: [sender, receiver]
        });
        await conversation.save();
      }
    }

    const message = new Message({
      sender,
      receiver,
      content,
      timestamp: new Date(),
    });

    await message.save();

    // Ažuriraj Conversation da uključuje novu poruku
    await Conversation.findByIdAndUpdate(
      conversation._id,
      { $push: { messages: message._id } },
      { new: true }
    );

    return message;

  } catch (error) {
    console.error("Error creating message:", error);
    throw new Error('Error creating message');
  }
};


export const getMessages = async (conversationId) => {
  try {
    const conversation = await Conversation.findById(conversationId).populate('messages');

    if (!conversation) {
      throw new Error('Conversation not found');
    }

    return conversation.messages;

  } catch (error) {
    logger.error('Error retrieving messages', {
      message: error.message,
      stack: error.stack,
      conversationId
    });
    throw new Error('Error retrieving messages');
  }
};

