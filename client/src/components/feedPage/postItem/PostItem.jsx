import React from "react";
import { FaThumbsUp, FaComment, FaEllipsisV } from 'react-icons/fa';
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import "./PostItem.scss"

export const PostItem = ({ post, onEdit, onDelete }) => {
    const { authUser } = useContext(AuthContext);

    return (
        <div key={post._id} className="post-item">
            <div className="post-header">
                <div className="post-user-info">
                    <img
                        src={`${process.env.REACT_APP_API_BASE_URL}/images/${post.user.profilePhotoImagePath}`}
                        alt={post.user.username}
                        className="post-user-photo"
                    />
                    <span className="post-username">{post.user.username}</span>
                </div>
                {authUser && authUser.username === post.user.username && (
                    <div className="post-menu">
                        <FaEllipsisV className="menu-icon" />
                        <div className="dropdown-menu">
                            <span onClick={() => onEdit(post)}>Edit</span>
                            <span onClick={() => onDelete(post._id)}>Delete</span>
                        </div>
                    </div>
                )}
            </div>
            <div className="post-content">
                <p>{post.content.text}</p>
                {post.content.imageUrl && (
                    <img
                        src={`${process.env.REACT_APP_API_BASE_URL}/images/${post.content.imageUrl}`}
                        alt="Post"
                        className="post-image"
                    />
                )}
            </div>
            <div className="post-footer">
                <div className="post-actions">
                    <div className="like-action">
                        <FaThumbsUp className="action-icon" />
                        <span className="like-count">{post.actions.likes.count}</span>
                    </div>
                    <div className="comment-action">
                        <FaComment className="action-icon" />
                        <span className="comment-count">{post.actions.comments.count}</span>
                    </div>
                </div>
                <span className="post-timestamp">
                    {new Date(post.timestamp).toLocaleString()}
                </span>
            </div>
        </div>
    );
};
