import { getUserConversations, createConversation } from '../service/conversationService.js'

export const getUserConversationsController = async (req, res) => {
  try {
    const userId = req.params.id
    const conversations = await getUserConversations(userId)
    res.status(200).json(conversations)
  } catch (error) {
    res.status(500).json({ error: `Server error: ${error.message}` })
  }
}

export const createConversationController = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body

    if (!senderId || !receiverId) {
      return res.status(400).json({ error: 'Sender and receiver IDs are required' })
    }

    const conversation = await createConversation(senderId, receiverId)

    res.status(201).json(conversation)
  } catch (error) {
    res.status(500).json({ error: `Server error: ${error.message}` })
  }
}
