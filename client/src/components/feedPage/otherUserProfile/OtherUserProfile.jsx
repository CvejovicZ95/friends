import React from "react";
import { NavBar } from "../nav/NavBar";
import { useParams } from "react-router-dom";
import { useUserProfile } from "../../../hooks/useGetProfileAndPosts";
import { FaThumbsUp, FaComment } from "react-icons/fa";
import "./OtherUserProfile.scss";

export const OtherUserProfile = () => {
    const { username } = useParams();
    const { user, loading, error } = useUserProfile(username);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    if (!user) return <p>No user found</p>;

    return (
        <>
            <NavBar />
            <div className="user-profile" key={user._id}>
                <h1>{user.username}'s Profile</h1>
                {user.profilePhotoImagePath ? (
                    <img
                        src={`${process.env.REACT_APP_API_BASE_URL}/images/${user.profilePhotoImagePath}`}
                        alt={user.username}
                        className="profile-photo"
                    />
                ) : (
                    <div className="profile-placeholder">No Photo</div>
                )}
                <div className="user-posts">
                    {user.posts.length > 0 ? (
                        <ul>
                            {user.posts.map((post) => (
                                <li key={post._id} className="post-item">
                                    <div className="post-user-info">
                                        <img
                                            src={`${process.env.REACT_APP_API_BASE_URL}/images/${post.user.profilePhotoImagePath}`}
                                            alt={post.user.username}
                                            className="post-user-photo"
                                        />
                                        <span className="post-username">{post.user.username}</span>
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
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-posts">No Posts by {user.username}...</p>
                    )}
                </div>
            </div>
        </>
    );
};
