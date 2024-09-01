import React from 'react';
import { useGetAllComments } from '../../../hooks/useComments';
import "./Comments.scss";

export const CommentsList = ({ postId }) => {
    const { comments, loading } = useGetAllComments(postId);

    if (loading) {
        return <div>Loading...</div>;
    }

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
                                <p className="comment-username"><strong>{comment.user.username}</strong>:{comment.content.text}</p>
                                <span className="comment-timestamp">
                                        {new Date(comment.timestamp).toLocaleString()}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No comments yet</p>
            )}
        </div>
    );
};

