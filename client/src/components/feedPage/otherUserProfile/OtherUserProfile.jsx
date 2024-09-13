import React from "react";
import { NavBar } from "../nav/NavBar";
import { useParams } from "react-router-dom";
import { useUserProfile } from "../../../hooks/useGetProfileAndPosts";
import { PostItem } from "../postItem/PostItem";
import { Link } from "react-router-dom";
import { CiChat1 } from "react-icons/ci";
import { useUserConversations } from "../../../hooks/useConversations";
import { useAuthContext } from "../../../context/authContext";
import "./OtherUserProfile.scss";

export const OtherUserProfile = () => {
    const { username } = useParams();
    const { user, loading, error } = useUserProfile(username);
    const { authUser } = useAuthContext();
    const { handleCreateConversation } = useUserConversations(authUser?.id);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    if (!user) return <p>No user found</p>;

    const handleChatClick = async (receiverId) => {
        try {
            await handleCreateConversation(receiverId);
        } catch (error) {
            console.error("Error creating conversation:", error);
        }
    };

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
                <button onClick={() => handleChatClick(user._id, user.username)}><Link to={`/conversation/${user.username}`}><CiChat1 className="user-chat-icon"/></Link></button>
                <div className="user-posts">
                    {user.posts.length > 0 ? (
                        <ul>
                            {user.posts.map((post) => (
                                <PostItem
                                    key={post._id}
                                    post={post}
                                />
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
