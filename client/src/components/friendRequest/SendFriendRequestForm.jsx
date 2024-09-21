import React, { useState } from 'react';
import { useAuthContext } from '../../context/authContext';
import { useFriendRequests } from '../../hooks/useFriendRequest';

export const SendFriendRequestForm = () => {
    const { authUser } = useAuthContext();
    const [receiverUsername, setReceiverUsername] = useState('');
    const { handleSendFriendRequest } = useFriendRequests(authUser ? authUser.id : null); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (authUser && receiverUsername) {
            await handleSendFriendRequest(authUser.id, receiverUsername); 
            setReceiverUsername('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Enter username" 
                value={receiverUsername}
                onChange={(e) => setReceiverUsername(e.target.value)}
                required 
            />
            <button type="submit">Send Friend Request</button>
        </form>
    );
};
