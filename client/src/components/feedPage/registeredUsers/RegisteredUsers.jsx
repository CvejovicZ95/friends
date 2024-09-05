import React from "react";
import "./RegisteredUsers.scss";
import { FaUserCircle } from "react-icons/fa";
import { CiChat1 } from "react-icons/ci";
import { useGetUsers } from "../../../hooks/useUsers";
import { useAuthContext } from "../../../context/authContext";
import { Link } from "react-router-dom";

export const RegisteredUsers = () => {
    const { users, loading } = useGetUsers();
    const { authUser } = useAuthContext();
    

    if (loading) {
        return <p>Loading...</p>;
    }

    const filteredUsers = users.filter(user => user.username !== authUser?.username);

    return (
        <div className="registered-users">
            <h2>Users</h2>
            <ul>
                {filteredUsers.map(user => (
                   <li className="user-item">
                        {user.profilePhotoImagePath ? (
                             <Link to={`/profile/${user.username}`} key={user._id}><img
                                src={`${process.env.REACT_APP_API_BASE_URL}/images/${user.profilePhotoImagePath}`}
                                alt={user.username}
                                className="user-photo"
                            /></Link>
                        ) : (
                            <FaUserCircle className="user-icon" />
                        )}
                        <p>{user.username}</p>
                        <Link to={`/conversation/${user.username}`}><CiChat1 className="user-chat-icon"/></Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
