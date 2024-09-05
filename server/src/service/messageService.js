import mongoose from 'mongoose';
import { Message } from "../models/messageSchema.js";
import { Conversation } from "../models/conversationSchema.js";
import { logger } from "../../logger.js";

export const createMessage = async (sender, receiver, content) => {
  try {
    // Pronađi konverzaciju između pošiljaoca i primaoca
    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] }
    });

    // Ako konverzacija ne postoji, kreiraj novu
    if (!conversation) {
      conversation = new Conversation({
        participants: [sender, receiver]
      });
      await conversation.save();
    }

    // Kreiraj novu poruku
    const message = new Message({
      sender,
      receiver,
      content,
      timestamp: new Date(),
    });

    await message.save();

    // Dodaj poruku u konverzaciju
    conversation.messages.push(message._id);
    await conversation.save();

    return message;

  } catch (error) {
    logger.error('Error creating message', {
      message: error.message,
      stack: error.stack,
      sender,
      receiver,
      content
    });

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
