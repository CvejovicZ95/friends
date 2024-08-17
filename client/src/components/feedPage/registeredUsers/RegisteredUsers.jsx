import React from "react";
import "./RegisteredUsers.scss";
import { FaUserCircle } from "react-icons/fa";
import { useGetUsers } from "../../../hooks/useUsers";
import { useAuthContext } from "../../../context/authContext";

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
                    <li key={user._id} className="user-item">
                        {user.profilePhotoImagePath ? (
                            <img
                                src={`${process.env.REACT_APP_API_BASE_URL}/images/${user.profilePhotoImagePath}`}
                                alt={user.username}
                                className="user-photo"
                            />
                        ) : (
                            <FaUserCircle className="user-icon" />
                        )}
                        <p>{user.username}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
