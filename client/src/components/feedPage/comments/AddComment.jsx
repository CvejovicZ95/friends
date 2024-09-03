import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../context/authContext';
import { useGetAllComments } from '../../../hooks/useComments';
import { toast } from 'react-toastify';
import "./AddComment.scss";

export const AddComment = ({ postId }) => {
    const { authUser } = useContext(AuthContext);
    const { handleAddComment } = useGetAllComments(postId);
    const [newComment, setNewComment] = useState('');

    const onAddComment = async () => {
        if (newComment.trim()) {
            try {
                await handleAddComment({
                    text: newComment,
                    postId,
                    username: authUser.username
                });
                setNewComment('');
            } catch (error) {
                toast.error(`Failed to add comment: ${error.message}`);
                console.error("Failed to add comment:", error.message);
            }
        } else {
            toast.warn('Comment cannot be empty');
        }
    };

    return (
        <div className="add-comment-container">
            <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={`Add a comment...`}
                className="comment-input"
            />
            <button onClick={onAddComment} className="add-comment-button">
                Add Comment
            </button>
        </div>
    );
};
