import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',            
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',            
    required: true
  },
  content: {
    type: String,
    required: true          
  },
  likes: {
    count: {
      type: Number,
      default: 0             
    },
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'            
    }]
  },
  timestamp: {
    type: Date,
    default: Date.now       
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Comment = mongoose.model('Comment', commentSchema);

export { Comment };
