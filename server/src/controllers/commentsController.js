import { getCommentsByPostId, addComment } from "../service/commentService.js";

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
        const { content, postId, userId } = req.body;
        const text = content.text;
        //const userId = req.user._id

        if (!text || !postId || !userId) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newComment = await addComment(userId, postId, text);
        res.status(201).json(newComment);
    } catch (error) {
        logger.error('Error adding new comment', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
