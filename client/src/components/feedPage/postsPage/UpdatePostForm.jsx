import React, { useState, useEffect } from 'react';
import { useGetAllPosts } from '../../../hooks/usePosts'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UpdatePostForm.scss';

export const UpdatePostForm = ({ post, onClose }) => {
    const { handleUpdatePost } = useGetAllPosts();
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [removeImage, setRemoveImage] = useState(false);

    useEffect(() => {
        if (post) {
            setText(post.content.text || '');
            setImagePreview(post.content.imageUrl ? `${process.env.REACT_APP_API_BASE_URL}/images/${post.content.imageUrl}` : '');
        }
    }, [post]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('text', text);
        if (image) {
            formData.append('image', image);
        }
        if (removeImage) {
            formData.append('removeImage', true);
        }
        try {
            await handleUpdatePost(post._id, formData);
            onClose();
        } catch (error) {
            toast.error(`Failed to update post: ${error.message}`);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview('');
        setRemoveImage(true);
    };

    return (
        <div className="update-post-form">
            <form onSubmit={handleSubmit}>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Update your post"
                />
                {imagePreview && (
                    <div className="image-preview">
                        <img src={imagePreview} alt="Post preview" />
                        <button
                            type="button"
                            className="remove-image-button"
                            onClick={handleRemoveImage}
                        >
                            
                        </button>
                    </div>
                )}
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
