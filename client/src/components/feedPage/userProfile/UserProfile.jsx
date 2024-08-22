import React, { useEffect, useState, useContext } from "react";
import "./UserProfile.scss";
import { NavBar } from "../nav/NavBar";
import { useGetUserPosts } from "../../../hooks/useGetUserPosts";
import { useGetAllPosts } from "../../../hooks/usePosts";
import { AuthContext } from "../../../context/authContext";
import { FaThumbsUp, FaComment, FaUserCircle, FaEllipsisV } from "react-icons/fa";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UserProfile = () => {
    const { authUser } = useContext(AuthContext);
    const [username, setUsername] = useState(authUser ? authUser.username : '');

    useEffect(() => {
        if (authUser) {
            setUsername(authUser.username);
        }
    }, [authUser]);

    const { posts, loading } = useGetUserPosts(username);
    const { handleDeletePost } = useGetAllPosts()

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
        <div>
            <NavBar />
            <div className="user-profile">
                <div className="profile-header">
                    {authUser?.profilePhotoImagePath ? (
                        <img
                            src={`${process.env.REACT_APP_API_BASE_URL}/images/${authUser.profilePhotoImagePath}`}
                            alt="Profile"
                            className="user-photo"
                        />
                    ) : (
                        <FaUserCircle className="user-icon" />
                    )}
                    <h1>{authUser.username}</h1>
                </div>
                <h2>{authUser.username}'s Posts</h2>
                <div className="posts-feed">
                    {sortedPosts.length > 0 ? (
                        sortedPosts.map(post => (
                            <div key={post._id} className="post-item">
                                <div className="post-header">
                                    <div className="post-user-info">
                                        {authUser?.profilePhotoImagePath ? (
                                            <img
                                                src={`${process.env.REACT_APP_API_BASE_URL}/images/${authUser.profilePhotoImagePath}`}
                                                alt="Profile"
                                                className="post-user-photo"
                                            />
                                        ) : (
                                            <FaUserCircle className="user-icon" />
                                        )}
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
                        ))
                    ) : (
                        <p>No posts found</p>
                    )}
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};
