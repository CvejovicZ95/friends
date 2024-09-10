import { useState, useEffect } from 'react';
import { getUserConversations, createConversation } from '../api/conversationApi';

export const useUserConversations = (userId) => {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [creating, setCreating] = useState(false);
    const [createError, setCreateError] = useState(null);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const data = await getUserConversations(userId);
                setConversations(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchConversations();
        }
    }, [userId]);

    const handleCreateConversation = async (receiverId) => {
        setCreating(true);
        setCreateError(null);
        try {
            const newConversation = await createConversation(userId, receiverId);
            setConversations((prevConversations) => [...prevConversations, newConversation]);
        } catch (err) {
            setCreateError(err.message);
        } finally {
            setCreating(false);
        }
    };

    return {
        conversations,
        loading,
        error,
        creating,
        createError,
        handleCreateConversation
    };
};
