import { Message } from "../models/messageSchema.js";
import { Conversation } from "../models/conversationSchema.js";
import { User } from "../models/userSchema.js"
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

    await Conversation.findByIdAndUpdate(
      conversation._id,
      { $push: { messages: message._id } },
      { new: true }
    );

    // Provera da li već postoji notifikacija za ovog pošiljaoca
    const receiverUser = await User.findById(receiver);
    const existingNotification = receiverUser.unreadNotifications.find(notification => notification.senderId.toString() === sender.toString());

    if (existingNotification) {
      // Ako notifikacija postoji, povećavamo count
      await User.updateOne(
        { _id: receiver, 'unreadNotifications.senderId': sender },
        { $inc: { 'unreadNotifications.$.count': 1 } }
      );
    } else {
      // Ako notifikacija ne postoji, dodajemo novu
      await User.findByIdAndUpdate(
        receiver,
        {
          $push: { unreadNotifications: { senderId: sender, count: 1, timestamp: new Date() } }
        },
        { new: true }
      );
    }

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

export const clearSenderNotifications = async (userId, senderId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Clear notifications only from specific sender
    user.unreadNotifications = user.unreadNotifications.filter(
      notification => notification.senderId.toString() !== senderId
    );

    await user.save();
    return { success: true };
  } catch (error) {
    console.error("Error clearing sender notifications:", error);
    throw new Error('Error clearing sender notifications');
  }
};

export const clearAllNotifications = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    user.unreadNotifications = [];
    await user.save();

    return { success: true };
  } catch (error) {
    console.error("Error clearing notifications:", error);
    throw new Error('Error clearing notifications');
  }
};
