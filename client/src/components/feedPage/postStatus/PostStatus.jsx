import React, { useContext } from "react";
import "./PostStatus.scss";
import { FaImage, FaRegSmile } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import { AuthContext } from "../../../context/authContext";
import { FaUserCircle } from "react-icons/fa";

export const PostStatus = () => {
    const { authUser } = useContext(AuthContext);

    return (
        <div className="create-post">
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
            />
            <div className="post-options">
                <FaImage className="post-icon" title="Add image" />
                <FaRegSmile className="post-icon" title="Add emoji" />
                <button className="post-button">
                    <MdSend className="send-icon" />
                    Post
                </button>
            </div>
        </div>
    );
};