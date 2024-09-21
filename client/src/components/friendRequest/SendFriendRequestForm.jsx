import React, { useState } from 'react';
import { useAuthContext } from '../../context/authContext';
import { sendFriendRequest } from '../../api/friendRequestApi';
import { toast } from 'react-toastify';

export const SendFriendRequestForm = () => {
    const { authUser } = useAuthContext();
    const [receiverUsername, setReceiverUsername] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (authUser && receiverUsername) {
            try {
                await sendFriendRequest(authUser.id, receiverUsername);
                setReceiverUsername('');
                toast.success('Friend request sent successfully!');
            } catch (error) {
                toast.error(`Failed to send friend request: ${error.message}`);
            }
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
