import React, { useContext } from "react";
import { useGetAllPosts } from '../../../hooks/usePosts'; 
import "./PostsPage.scss";
import { FaThumbsUp, FaComment, FaEllipsisV } from 'react-icons/fa';
import { AuthContext } from "../../../context/authContext";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const PostsPage = () => {
    const { posts, loading, handleDeletePost } = useGetAllPosts();
    const { authUser } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }
    

    const sortedPosts = [...posts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Delete post?');
        if (confirmed) {
            try {
                await handleDeletePost(id);
                toast.success('Post deleted');
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    return (
        <div className="posts-page">
            <div className="posts-feed">
                {sortedPosts.map(post => (
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
                            <div className="post-menu">
                                {authUser && authUser.username === post.user.username && (
                                    <>
                                        <FaEllipsisV className="menu-icon" />
                                        <div className="dropdown-menu">
                                            <span>Edit</span>
                                            <span onClick={() => handleDelete(post._id)}>Delete</span>
                                        </div>
                                    </>
                                )}
                            </div>
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
                ))}
            </div>
            <ToastContainer/>
        </div>
    );
};
