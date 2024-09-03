import React, { useContext } from 'react';
import { useGetAllComments } from '../../../hooks/useComments';
import { AuthContext } from '../../../context/authContext';
import { AddComment } from './AddComment';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import the icons
import "./Comments.scss";

export const CommentsList = ({ postId }) => {
    const { comments, loading, handleDeleteComment } = useGetAllComments(postId);
    const { authUser } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleEditComment = (commentId) => {
        // Implement your edit comment logic here
    };


    return (
        <div className='comments-list'>
            {comments.length > 0 ? (
                <ul>
                    {comments.map(comment => (
                        <li key={comment._id} className="comment-item">
                            <div className="comment-user-info">
                                <img
                                    src={`${process.env.REACT_APP_API_BASE_URL}/images/${comment.user.profilePhotoImagePath}`}
                                    alt={comment.user.username}
                                    className="comment-user-photo"
                                />
                                <div className="comment-content">
                                    <p className="comment-username">
                                        <strong>{comment.user.username}</strong>: {comment.content.text}
                                    </p>
                                    <span className="comment-timestamp">
                                        {new Date(comment.timestamp).toLocaleString()}
                                    </span>
                                </div>
                                {authUser.username === comment.user.username && (
                                    <div className="comment-actions">
                                        <button onClick={() => handleEditComment(comment._id)} className="edit-button">
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteComment(comment._id)}
                                            className="delete-button"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No comments yet</p>
            )}
            <AddComment postId={postId} />
        </div>
    );
};
