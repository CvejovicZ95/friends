import { Comment } from "../models/commentSchema.js";
import { Post } from "../models/postsSchema.js";
import { User } from "../models/userSchema.js";
import { logger } from "../../logger.js";

export const getCommentsByPostId = async (postId) => {
    try {
        const allCommentsInPost = await Comment.find({ post: postId })
            .populate('user', 'username profilePhotoImagePath')
            .sort({ created_at: -1 });
        return allCommentsInPost;
    } catch (error) {
        logger.error('Error fetching all comments', error.message);
        throw new Error('Error fetching all comments');
    }
};;


export const addComment = async (userId, postId, text) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const post = await Post.findById(postId);
        if (!post) {
            throw new Error('Post not found');
        }

        
        const newComment = new Comment({
            user: userId,
            post: postId,
            content: { text }
        });
        await newComment.save();

        post.actions.comments.count += 1;
        post.actions.comments.commentIds.push(newComment._id);
        await post.save();

        logger.info('New comment added');
        return newComment;
    } catch (error) {
        logger.error('Error adding new comment', error.message);
        throw new Error('Error adding new comment');
    }
};