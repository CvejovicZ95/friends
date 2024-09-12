import React, { useState, useContext } from "react";
import "./UserProfile.scss";
import { NavBar } from "../nav/NavBar";
import { useGetUserPosts } from "../../../hooks/useGetUserPosts";
import { useGetAllPosts } from "../../../hooks/usePosts";
import { AuthContext } from "../../../context/authContext";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdatePostForm } from "../postsPage/UpdatePostForm"; 
import { ModalOverlay } from "../../ModalOverlay";
import { PostItem } from "../postItem/PostItem";

export const UserProfile = () => {
    const { authUser } = useContext(AuthContext);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showModal, setShowModal] = useState(false);
    

    const { posts, loading } = useGetUserPosts(authUser?.id);
    const { handleDeletePost } = useGetAllPosts();

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

    const handleEdit = (post) => {
        setSelectedPost(post);
        setShowModal(true);
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
                            <PostItem
                                key={post._id}
                                post={post}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))
                    ) : (
                        <p>No posts found</p>
                    )}
                </div>
                {showModal && (
                    <ModalOverlay onClose={() => setShowModal(false)}>
                        <UpdatePostForm
                            post={selectedPost}
                            onClose={() => setShowModal(false)}
                        />
                    </ModalOverlay>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};
