import mongoose from 'mongoose';

const chatRequestSchema = new mongoose.Schema({
    senderId: 
        { type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    receiverId: 
        { type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    status: 
        { type: String, 
        enum: ['pending', 'accepted', 'declined'],
        default: 'pending' 
    },
}, { timestamps: true });

const ChatRequest = mongoose.model('ChatRequest', chatRequestSchema);

export { ChatRequest };
