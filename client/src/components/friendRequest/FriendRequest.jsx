import React, { useEffect, useState } from "react";
import { NavBar } from "../feedPage/nav/NavBar";
import { useFriendRequests } from "../../hooks/useFriendRequest";
import { useAuthContext } from "../../context/authContext";
import { ToastContainer } from 'react-toastify';
import { CiChat1 } from "react-icons/ci";
import 'react-toastify/dist/ReactToastify.css';
import { useGetUsers } from "../../hooks/useUsers";
import { useUserConversations } from "../../hooks/useConversations";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./FriendRequest.scss";

export const FriendRequest = () => {
    const { authUser } = useAuthContext();
    const { friendRequests, handleManageFriendRequest } = useFriendRequests(authUser ? authUser.id : null);
    const { users, loading } = useGetUsers(); // Učitaj korisnike
    const [friends, setFriends] = useState([]);
    const { handleCreateConversation } = useUserConversations(authUser?.id);
    const navigate = useNavigate();
    const [notificationCounts, setNotificationCounts] = useState({});

    useEffect(() => {
        if (users && authUser) {
            // Filtriraj prijatelje na osnovu korisničkih ID-jeva
            const filteredFriends = users.filter(user => authUser.friends.includes(user._id));
            setFriends(filteredFriends);
        }
    }, [users, authUser]);

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

    const handleChatClick = async (receiverId, username) => {
        try {
            await handleCreateConversation(receiverId);
            navigate(`/conversation/${username}`);
        } catch (error) {
            console.error("Error creating conversation:", error);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="friend-request-container">
                <div className="friend-requests">
                    <ul>
                        {friendRequests.filter(request => request.receiverId === authUser.id).length === 0 ? (
                            <p className="no-requests">No friend requests at the moment.</p>
                        ) : (
                            friendRequests.filter(request => request.receiverId === authUser.id).map(request => (
                                <li key={request._id} className="request-item">
                                    <p>Friend request from {request.senderId.username}</p>
                                    <div className="actions">
                                        <button onClick={() => handleManageFriendRequest(request._id, 'accept')}>Accept</button>
                                        <button onClick={() => handleManageFriendRequest(request._id, 'decline')}>Decline</button>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
                {/* Prikaz prijatelja */}
                <div className="friends-list">
                    <h2>Your Friends</h2>
                    <ul>
                        {friends.length === 0 ? (
                            <p className="no-friends">No friends to display.</p>
                        ) : (
                            friends.map(friend => (
                                <li className="user-item" key={friend._id}>
                                    {friend.profilePhotoImagePath ? (
                                        <Link to={`/profile/${friend.username}`}>
                                            <img
                                                src={`${process.env.REACT_APP_API_BASE_URL}/images/${friend.profilePhotoImagePath}`}
                                                alt={friend.username}
                                                className="user-photo"
                                            />
                                        </Link>
                                    ) : (
                                        <FaUserCircle className="user-icon" />
                                    )}
                                    <p>{friend.username}</p>
                                    <button 
                                        onClick={() => handleChatClick(friend._id, friend.username)}>
                                        <CiChat1 className="user-chat-icon"/>
                                    </button>
                                    <span className="notification-count">
                                    {getUnreadNotificationCount(friend._id) > 0 ? getUnreadNotificationCount(friend._id) : null}
                                </span>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};
