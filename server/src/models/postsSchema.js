import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',              
    required: true
  },
  content: {
    text: {
      type: String,
      required: true         
    },
    imageUrl: {
      type: String,          
      required: false
    }
  },
  actions: {
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
    comments: {
      count: {
        type: Number,
        default: 0          
      },
      commentIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'       
      }]
    }
  },
  timestamp: {
    type: Date,
    default: Date.now         
  },
  menuOptions: {
    canEdit: {
      type: Boolean,
      default: false          
    },
    canDelete: {
      type: Boolean,
      default: false          
    }
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Post = mongoose.model('Post', postSchema);

export { Post };
