import React, { useState } from 'react';
import { useAuthContext } from '../../context/authContext';
import { useFriendRequests } from '../../hooks/useFriendRequest';
import { useGetUsers } from '../../hooks/useUsers';
import { IoPersonAddSharp } from "react-icons/io5";
import "./SendFriendRequestForm.scss";

export const SendFriendRequestForm = () => {
    const { authUser } = useAuthContext();
    const { users } = useGetUsers(); 
    const { handleSendFriendRequest } = useFriendRequests(authUser ? authUser.id : null); 
    const [selectedUser, setSelectedUser] = useState('');

    const nonFriendUsers = users.filter(user => !authUser.friends.includes(user._id) && user.username !== authUser.username);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (authUser && selectedUser) {
            await handleSendFriendRequest(authUser.id, selectedUser); 
            setSelectedUser('');
        }
    };

    return (
        <form className="friend-request-form" onSubmit={handleSubmit}>
            <select 
                className="friend-request-select"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                required
            >
                <option value="" disabled>Send friend request to</option>
                {nonFriendUsers.map(user => (
                    <option key={user._id} value={user.username}>
                        {user.username}
                    </option>
                ))}
            </select>
            <button className="friend-request-button" type="submit"><IoPersonAddSharp/></button>
        </form>
    );
};
