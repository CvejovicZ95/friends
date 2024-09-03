import { logger } from "../../logger.js";
import { getCommentsByPostId, addComment, deleteCommentById, updateCommentById } from "../service/commentService.js";

export const getAllCommentsInPostController = async (req, res) => {
    try {
        const postId = req.params.id; 
        if (!postId) {
            return res.status(400).json({ message: 'Post ID is required' });
        }

        const allComments = await getCommentsByPostId(postId);
        res.status(200).json(allComments);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


export const addCommentController = async (req, res) => {
    try {
        const { content, postId, username } = req.body;
        const text = content.text;

        if (!text || !postId || !username) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newComment = await addComment(username, postId, text);
        res.status(201).json(newComment);
    } catch (error) {
        logger.error('Error adding new comment', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};


export const deleteCommentController = async (req, res) => {
    try {
        const commentId = req.params.id
        await deleteCommentById(commentId)
        res.status(200).json({message : 'Comment deleted'})
    } catch (error) {
        logger.error('Error deleting comment', error.message)
        res.status(500).json({ message: 'Server error'})
    }
}

export const updateCommentController = async (req, res) => {
    try {
        const commentId = req.params.id;
        const { text } = req.body;

        if (!commentId || !text) {
            return res.status(400).json({ message: 'Comment ID and new text are required' });
        }

        const updatedComment = await updateCommentById(commentId, text);
        res.status(200).json(updatedComment);
    } catch (error) {
        logger.error('Error updating comment', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
