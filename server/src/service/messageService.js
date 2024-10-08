import { Message } from '../models/messageSchema.js'
import { Conversation } from '../models/conversationSchema.js'
import { User } from '../models/userSchema.js'
import { logger } from '../../logger.js'

export const createMessage = async (sender, receiver, content, conversationId) => {
  try {
    let conversation

    if (conversationId) {
      conversation = await Conversation.findById(conversationId)
      if (!conversation) {
        throw new Error('Conversation not found')
      }
    } else {
      conversation = await Conversation.findOne({
        participants: { $all: [sender, receiver] }
      })

      if (!conversation) {
        conversation = new Conversation({
          participants: [sender, receiver]
        })
        await conversation.save()
      }
    }

    const message = new Message({
      sender,
      receiver,
      content,
      timestamp: new Date()
    })

    await message.save()

    await Conversation.findByIdAndUpdate(
      conversation._id,
      { $push: { messages: message._id } },
      { new: true }
    )

    const receiverUser = await User.findById(receiver)
    const existingNotification = receiverUser.unreadNotifications.find(notification => notification.senderId.toString() === sender.toString())

    if (existingNotification) {
      await User.updateOne(
        { _id: receiver, 'unreadNotifications.senderId': sender },
        { $inc: { 'unreadNotifications.$.count': 1 } }
      )
    } else {
      await User.findByIdAndUpdate(
        receiver,
        {
          $push: { unreadNotifications: { senderId: sender, count: 1, timestamp: new Date() } }
        },
        { new: true }
      )
    }

    return message
  } catch (error) {
    console.error('Error creating message:', error)
    throw new Error('Error creating message')
  }
}

export const getMessages = async (conversationId) => {
  try {
    const conversation = await Conversation.findById(conversationId).populate('messages')

    if (!conversation) {
      throw new Error('Conversation not found')
    }

    return conversation.messages
  } catch (error) {
    logger.error('Error retrieving messages', {
      message: error.message,
      stack: error.stack,
      conversationId
    })
    throw new Error('Error retrieving messages')
  }
}

export const clearSenderNotifications = async (userId, senderId) => {
  try {
    const user = await User.findById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    const notification = user.unreadNotifications.find(notification => notification.senderId.toString() === senderId.toString())

    if (notification) {
      notification.count = 0
      await user.save()
    }

    return { success: true }
  } catch (error) {
    console.error('Error clearing sender notifications:', error)
    throw new Error('Error clearing sender notifications')
  }
}
