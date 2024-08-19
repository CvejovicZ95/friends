import React, { useState, useContext } from "react";
import "./PostStatus.scss";
import { FaImage, FaRegSmile, FaUserCircle } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import { AuthContext } from "../../../context/authContext";
import { useGetAllPosts } from "../../../hooks/usePosts";

export const PostStatus = () => {
    const { authUser } = useContext(AuthContext);
    const { handleAddPost } = useGetAllPosts();
    const [text, setText] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("username", authUser.username);
        formData.append("text", text);
        if (selectedImage) {
            formData.append("image", selectedImage);
        }

        const success = await handleAddPost(formData);
        if (success) {
            setText("");
            setSelectedImage(null);
        }
    };

    return (
        <form className="create-post" onSubmit={handleSubmit}>
            <div className="user-photo-container">
                {authUser?.profilePhotoImagePath ? (
                    <img
                        src={`${process.env.REACT_APP_API_BASE_URL}/images/${authUser.profilePhotoImagePath}`}
                        alt="Profile"
                        className="user-photo"
                    />
                ) : (
                    <FaUserCircle className="user-icon" />
                )}
            </div>
            <textarea 
                className="post-input" 
                placeholder={`What's on your mind, ${authUser.username}?`} 
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <div className="post-options">
                <label className="post-icon">
                    <FaImage title="Add image" />
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                    />
                </label>
                <FaRegSmile className="post-icon" title="Add emoji" />
                <button type="submit" className="post-button">
                    <MdSend className="send-icon" />
                    Post
                </button>
            </div>
        </form>
    );
};
