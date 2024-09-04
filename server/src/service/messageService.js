import { User } from "../models/userSchema.js";
import { Message } from "../models/messageSchema.js";

export const sendMessage = async (senderUsername, receiverUsername, content) => {
    try {
        const sender = await User.findOne({ username: senderUsername });
        const receiver = await User.findOne({ username: receiverUsername });

        if (!sender || !receiver) {
            throw new Error('Sender or receiver not found');
        }

        const newMessage = new Message({
            sender: sender._id,
            receiver: receiver._id,
            content
        });

        await newMessage.save();
        return newMessage;
    } catch (error) {
        console.error('Error in sendMessage function:', error);
        throw error;
    }
};


export const getMessagesBetweenUsers = async (username1, username2) => {
    try {
        const user1 = await User.findOne({ username: username1 });
        const user2 = await User.findOne({ username: username2 });

        if (!user1 || !user2) {
            throw new Error('One or both users not found');
        }

        const messages = await Message.find({
            $or: [
                { sender: user1._id, receiver: user2._id },
                { sender: user2._id, receiver: user1._id }
            ]
        }).populate('sender', 'username').populate('receiver', 'username');

        return messages;
    } catch (error) {
        console.error('Error in getMessagesBetweenUsers function:', error);
        throw error;
    }
};
