import React, { useState } from "react";
import { useGetAllPosts } from '../../../hooks/usePosts'; 
import "./PostsPage.scss";
import { UpdatePostForm } from "./UpdatePostForm";
import { ModalOverlay } from "../../ModalOverlay";
import { PostItem } from "../postItem/PostItem";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const PostsPage = () => {
    const { posts, loading, handleDeletePost } = useGetAllPosts();
    const [editingPost, setEditingPost] = useState(null);

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
                    <PostItem
                        key={post._id}
                        post={post}
                        onEdit={setEditingPost}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
            {editingPost && (
                <ModalOverlay onClose={() => setEditingPost(null)}>
                    <UpdatePostForm
                        post={editingPost}
                        onClose={() => setEditingPost(null)}
                    />
                </ModalOverlay>
            )}
            <ToastContainer />
        </div>
    );
};
