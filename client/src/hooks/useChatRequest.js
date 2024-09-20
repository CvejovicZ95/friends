import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { sendChatRequest, getChatRequests, manageChatRequest } from '../api/chatRequestApi';

export const useChatRequests = (userId) => {
    const [chatRequests, setChatRequests] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchChatRequests = async () => {
            setLoading(true);
            try {
                const data = await getChatRequests(userId);
                setChatRequests(data);
            } catch (error) {
                toast.error(`Failed to load chat requests: ${error.message}`);
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchChatRequests();
    }, [userId]);

    const handleSendChatRequest = async (senderId, receiverUsername) => {
        try {
            const newRequest = await sendChatRequest(senderId, receiverUsername);
            setChatRequests((prevRequests) => [...prevRequests, newRequest]);
            toast.success('Chat request sent successfully!');
        } catch (error) {
            toast.error(`Failed to send chat request: ${error.message}`);
            console.error(error);
        }
    };

    const handleManageChatRequest = async (requestId, action) => {
        try {
            const response = await manageChatRequest(requestId, action);
            if (response) {
                setChatRequests((prevRequests) => 
                    prevRequests.filter((request) => request._id !== requestId)
                );
                toast.success(`Chat request ${action === 'accept' ? 'accepted' : 'declined'} successfully!`);
            }
        } catch (error) {
            toast.error(`Failed to manage chat request: ${error.message}`);
            console.error(error);
        }
    };
    

    return { chatRequests, loading, handleSendChatRequest, handleManageChatRequest };
};
