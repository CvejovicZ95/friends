import { getAllPosts, addPost, updatePost, deletePost } from "../service/postsService.js";
import { logger } from "../../logger.js";

export const getAllPostsController = async (req, res) => {
    try {
        const allPosts = await getAllPosts()
        res.status(200).json(allPosts)
    } catch (error) {
        res.status(500).json({ error: 'Server error'})
    }
}

export const addPostController = async (req, res) => {
    try {
        const { userId, text, imageUrl } = req.body;

        const newPost = await addPost(userId, text, imageUrl);

        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

export const updatePostController = async (req, res) => {
    try {
        const postId = req.params.id;
        const newData = req.body;
        
        logger.info('Update request received for post ID:', postId, 'New Data:', newData);
        
        const updatedPost = await updatePost(postId, newData);
        res.status(200).json(updatedPost);
    } catch (error) {
        logger.error('Error in updatePostController', error.message);
        res.status(500).json('Server error');
    }
}

export const deletePostController = async (req, res) => {
    try {
        const postId = req.params.id
        await deletePost(postId)
        res.status(200).json({ message: 'Post deleted'})
    } catch (error) {
        if (error.message === 'You do not have permission to delete this post') {
            res.status(403).json({ error: error.message });
        } else if (error.message === 'Post not found') {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Server error' });
        }
    }
}