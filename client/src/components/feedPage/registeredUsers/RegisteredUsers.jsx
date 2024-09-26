import React, { useState, useEffect } from "react";
import "./RegisteredUsers.scss";
import { FaUserCircle } from "react-icons/fa";
import { CiChat1 } from "react-icons/ci";
import { FaUserPlus } from "react-icons/fa";
import { useGetUsers } from "../../../hooks/useUsers";
import { useAuthContext } from "../../../context/authContext";
import { useUserConversations } from "../../../hooks/useConversations";
import { useClearNotifications } from "../../../hooks/useClearMessageNotifications";
import { useFriendRequests } from "../../../hooks/useFriendRequest";
import { useNavigate, Link } from "react-router-dom";

export const RegisteredUsers = () => {
  const { users, loading } = useGetUsers();
  const { authUser, resetUnreadNotifications } = useAuthContext();
  const { clearNotifications } = useClearNotifications(authUser?.id);
  const { handleCreateConversation } = useUserConversations(authUser?.id);
  const navigate = useNavigate();
  const [notificationCounts, setNotificationCounts] = useState({});
  const { handleSendFriendRequest } = useFriendRequests(
    authUser ? authUser.id : null,
  );
  const [sentRequests, setSentRequests] = useState([]);

  useEffect(() => {
    if (authUser && authUser.unreadNotifications) {
      const counts = {};
      authUser.unreadNotifications.forEach((notif) => {
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

  const filteredUsers = users.filter(
    (user) => user.username !== authUser?.username,
  );
  const friendUsers = users.filter((user) =>
    authUser.friends.includes(user._id),
  );
  const nonFriendUsers = filteredUsers.filter(
    (user) => !authUser.friends.includes(user._id),
  );

  const handleChatClick = async (receiverId, username, senderId) => {
    try {
      await clearNotifications(senderId);
      await handleCreateConversation(receiverId);
      resetUnreadNotifications(senderId);
      navigate(`/conversation/${username}`, { state: { senderId } });
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  const handleChatRequestClick = async (receiverUsername) => {
    if (authUser) {
      try {
        await handleSendFriendRequest(authUser.id, receiverUsername);
        setSentRequests((prev) => [...prev, receiverUsername]);
      } catch (error) {
        console.error("Error sending chat request:", error);
      }
    }
  };

  const hasSentRequest = (username) => {
    return sentRequests.includes(username);
  };

  return (
    <div className="registered-users">
      <h2>Friends</h2>
      <ul>
        {friendUsers.map((friend) => (
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
            <div className="chat-button-container">
              <button
                onClick={() =>
                  handleChatClick(friend._id, friend.username, friend._id)
                }
              >
                <CiChat1 className="user-chat-icon" />
              </button>
              <span className="notification-count">
                {getUnreadNotificationCount(friend._id) > 0
                  ? getUnreadNotificationCount(friend._id)
                  : null}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <h2>Users</h2>
      <ul>
        {nonFriendUsers.map((user) => (
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
              <button
                onClick={() => handleChatRequestClick(user.username)}
                disabled={hasSentRequest(user.username)}
              >
                <FaUserPlus className="user-request-icon" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
