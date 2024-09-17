import React from "react";
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

    if (loading) {
        return <p>Loading...</p>;
    }

    const filteredUsers = users.filter(user => user.username !== authUser?.username);

    const handleChatClick = async (receiverId, username) => {
        try {
            await handleCreateConversation(receiverId);
            navigate(`/conversation/${username}`); // Navigacija nakon što je konverzacija kreirana
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
                        <button onClick={() => handleChatClick(user._id, user.username)}>
                            <CiChat1 className="user-chat-icon"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
