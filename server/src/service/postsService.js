import { Post } from "../models/postsSchema.js";
import { logger } from "../../logger.js";
import { User } from "../models/userSchema.js"

export const getAllPosts = async () => {
    try {
        const allPosts = await Post.find().populate('user', 'username profilePhotoImagePath')
        return allPosts;
    } catch (error) {
        logger.error('Error fetching all posts', error.message);
        throw new Error('Error fetching all posts');
    }
}

export const addPost = async (userId, text, imageUrl = null) => {
    try {
        const newPost = new Post({
            user: userId,
            content: {
                text,
                imageUrl
            },
            actions: {
                likes: {
                    count: 0,
                    users: []
                },
                comments: {
                    count: 0,
                    commentIds: []
                }
            },
            menuOptions: {
                canEdit: true,
                canDelete: true
            }
        });

        await newPost.save();
        logger.info('New post added');
        return newPost;
    } catch (error) {
        logger.error('Error adding a new post:', error);
        throw new Error('Error adding a new post');
    }
}

export const updatePost = async (postId, newData) => {
    try {
        logger.info('Updating post with ID:', postId, 'New Data:', newData);
        
        const updatedPost = await Post.findByIdAndUpdate(postId, { $set: newData }, { new: true});
        
        if (!updatedPost) {
            logger.error('Post not found with ID:', postId);
            throw new Error('Post not found');
        }

        logger.info('Post updated successfully', updatedPost);
        return updatedPost;
    } catch (error) {
        logger.error('Error updating post', error.message);
        throw new Error('Error updating post');
    }
}

export const deletePost = async (postId) => {
    try {
        const post = await Post.findById(postId);

        if (!post) {
            throw new Error('Post not found');
        }

        await Post.findByIdAndDelete(postId);
        logger.info('Post deleted')
        return { message: 'Post successfully deleted' };
    } catch (error) {
        logger.error('Error deleting post', error.message);
        throw new Error('Error deleting post');
    }
}

export const getPostsByUsername = async (username) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return { message: "User not found" };
        }

        const posts = await Post.find({ user: user._id }).populate('user', 'username');

        if (!posts || posts.length === 0) {
            return { message: "This user hasn't posted any status" };
        }

        return posts;
    } catch (error) {
        logger.error('Error fetching posts by username:', error.message);
        throw new Error('Error fetching posts by username');
    }
}