import React, { useState } from 'react';
import { useGetAllPosts } from '../../../hooks/usePosts'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UpdatePostForm.scss';

export const UpdatePostForm = ({ postId, onClose }) => {
    const { handleUpdatePost } = useGetAllPosts();
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('text', text);
        if (image) {
            formData.append('image', image);
        }
        try {
            await handleUpdatePost(postId, formData);
            toast.success('Post updated successfully');
            onClose();
        } catch (error) {
            toast.error(`Failed to update post: ${error.message}`);
        }
    };

    return (
        <div className="update-post-form">
            <form onSubmit={handleSubmit}>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Update your post"
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <div className="form-actions">
                    <button type="submit">Update Post</button>
                    <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
};
