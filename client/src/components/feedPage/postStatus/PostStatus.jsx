import React, { useState, useContext, useEffect } from "react";
import "./PostStatus.scss";
import { FaImage, FaRegSmile, FaUserCircle } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import { AuthContext } from "../../../context/authContext";
import { useGetAllPosts } from "../../../hooks/usePosts";
import { EmojiPicker } from "./EmojiPicker"; 

export const PostStatus = () => {
    const { authUser } = useContext(AuthContext);
    const { handleAddPost } = useGetAllPosts();
    const [text, setText] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        if (text.trim() || selectedImage) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [text, selectedImage]);

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

    const handleEmojiSelect = (emoji) => {
        setText(text + emoji);
        setShowEmojiPicker(false);
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
                        style={{display:'none'}}
                    />
                </label>
                <div className="emoji-picker-container">
                    <FaRegSmile 
                        className="post-icon" 
                        title="Add emoji" 
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)} 
                    />
                    {showEmojiPicker && <EmojiPicker onSelect={handleEmojiSelect} />}
                </div>
                <button type="submit" className="post-button" disabled={isButtonDisabled}>
                    <MdSend className="send-icon" />
                    Post
                </button>
            </div>
        </form>
    );
};
