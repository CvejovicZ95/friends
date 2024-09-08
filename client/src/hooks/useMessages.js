import { useState, useEffect } from 'react';
import { getMessagesFromConversation } from '../api/messagesApi';

export const useMessages = (conversationId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
        try {
            if (conversationId) {
                const data = await getMessagesFromConversation(conversationId);
                setMessages(data);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    fetchMessages();
}, [conversationId]);

  return { messages, loading, error };
};

