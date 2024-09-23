import { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { sendFriendRequest, getFriendRequests, manageFriendRequest } from '../api/friendRequestApi';
import { AuthContext } from '../context/authContext';

export const useFriendRequests = (userId) => {
    const [friendRequests, setFriendRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const { updateFriendRequests } = useContext(AuthContext);

    useEffect(() => {
        const fetchFriendRequests = async () => {
            setLoading(true);
            try {
                const data = await getFriendRequests(userId);
                setFriendRequests(data);
            } catch (error) {
                toast.error(`Failed to load friend requests: ${error.message}`);
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchFriendRequests();
    }, [userId]);
    

    const handleSendFriendRequest = async (senderId, receiverUsername) => {
        try {
            const newRequest = await sendFriendRequest(senderId, receiverUsername);
            setFriendRequests((prevRequests) => [...prevRequests, newRequest]);
            updateFriendRequests({ ...newRequest, receiverUsername });
            toast.success('Friend request sent successfully!');
        } catch (error) {
            if (error.message.includes('Friend request already sent')) {
                toast.info(`You have already sent a friend request to ${receiverUsername}`);
            } else {
                toast.error(`Failed to send friend request: ${error.message}`);
            }
            console.error(error);
        }
    };

    const handleManageFriendRequest = async (requestId, action) => {
        try {
            const response = await manageFriendRequest(requestId, action);
            if (response) {
                setFriendRequests((prevRequests) => 
                    prevRequests.filter((request) => request._id !== requestId)
                );
                toast.success(`Friend request ${action === 'accept' ? 'accepted' : 'declined'} successfully!`);
            }
        } catch (error) {
            toast.error(`Failed to manage friend request: ${error.message}`);
            console.error(error);
        }
    };
    
    

    return { friendRequests, loading, handleSendFriendRequest, handleManageFriendRequest };
};
