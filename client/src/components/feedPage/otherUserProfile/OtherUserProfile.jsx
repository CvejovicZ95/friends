import React, { useContext } from "react";
import { NavBar } from "../nav/NavBar";
import { useParams } from "react-router-dom";
import { useUserProfile } from "../../../hooks/useGetProfileAndPosts";
import { PostItem } from "../postItem/PostItem";
import { AuthContext } from "../../../context/authContext";
import { CiChat1 } from "react-icons/ci"; 
import "./OtherUserProfile.scss";

export const OtherUserProfile = () => {
    const { username } = useParams();
    const { user, loading, error } = useUserProfile(username);
    const { authUser } = useContext(AuthContext);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!user) return <p>No user found</p>;

    const isFriend = authUser?.friends.includes(user._id);

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
                
                {isFriend && (
                    <div className="chat-icon">
                        <button onClick={() => console.log('Start chat with', user.username)}>
                            <CiChat1 className="user-chat-icon" />
                        </button>
                    </div>
                )}

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
