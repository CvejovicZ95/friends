import { useState, useEffect } from 'react';
import { getUserConversations } from '../api/conversationApi';

export const useUserConversations = (userId) => {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const data = await getUserConversations(userId);
                setConversations(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        if (userId) {
            fetchConversations();
        }
    }, [userId]);

    return { conversations, loading, error };
};
