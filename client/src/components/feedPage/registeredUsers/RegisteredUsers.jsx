import React, { useState, useEffect } from "react";
import "./RegisteredUsers.scss";
import { FaUserCircle } from "react-icons/fa";
import { CiChat1 } from "react-icons/ci";
import { useGetUsers } from "../../../hooks/useUsers";
import { useAuthContext } from "../../../context/authContext";
import { useUserConversations } from "../../../hooks/useConversations";
import { useNavigate, Link } from "react-router-dom";

export const RegisteredUsers = () => {
    const { users, loading } = useGetUsers();
    const { authUser } = useAuthContext();
    const { handleCreateConversation } = useUserConversations(authUser?.id);
    const navigate = useNavigate();
    const [notificationCounts, setNotificationCounts] = useState({});

    useEffect(() => {
        if (authUser && authUser.unreadNotifications) {
            const counts = {};
            authUser.unreadNotifications.forEach(notif => {
                counts[notif.senderId] = notif.count;
            });
            setNotificationCounts(counts);
        }
    }, [authUser]);

    const getUnreadNotificationCount = (userId) => {
        return notificationCounts[userId] || 0;
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    // Filter out the current user from the list
    const filteredUsers = users.filter(user => user.username !== authUser?.username);

    const handleChatClick = async (receiverId, username) => {
        try {
            await handleCreateConversation(receiverId);
            navigate(`/conversation/${username}`);
        } catch (error) {
            console.error("Error creating conversation:", error);
        }
    };

    return (
        <div className="registered-users">
            <h2>Users</h2>
            <ul>
                {filteredUsers.map(user => (
                    <li className="user-item" key={user._id}>
                        {user.profilePhotoImagePath ? (
                            <Link to={`/profile/${user.username}`}>
                                <img
                                    src={`${process.env.REACT_APP_API_BASE_URL}/images/${user.profilePhotoImagePath}`}
                                    alt={user.username}
                                    className="user-photo"
                                />
                            </Link>
                        ) : (
                            <FaUserCircle className="user-icon" />
                        )}
                        <p>{user.username}</p>
                        <div className="chat-button-container">
                            <button onClick={() => handleChatClick(user._id, user.username)}>
                                <CiChat1 className="user-chat-icon"/>
                            </button>
                            {/* Display unread notifications count for each user */}
                            <span className="notification-count">
                                {getUnreadNotificationCount(user._id)}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
