import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getAllComments, addComment } from '../api/commentsApi';

export const useGetAllComments = (postId) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true);
            try {
                const data = await getAllComments(postId);
                setComments(data);
            } catch (error) {
                toast.error(`Failed to load comments: ${error.message}`);
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [postId]);

    const handleAddComment = async (commentData) => {
        try {
            const formattedCommentData = {
                content: {
                    text: commentData.text
                },
                postId: commentData.postId,
                username: commentData.username
            };
    
            const newComment = await addComment(formattedCommentData);
            setComments((prevComments) => [...prevComments, newComment]);
            toast.success('Comment added successfully!');
        } catch (error) {
            toast.error(`Failed to add comment: ${error.message}`);
            console.error(error);
        }
    };
    

    return { comments, loading, handleAddComment };
};
