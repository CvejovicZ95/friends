import { useCallback } from 'react';
import { clearSenderNotifications } from '../api/messagesApi'; 

export const useClearNotifications = (userId) => {
    const clearNotifications = useCallback(async (senderId) => {
        try {
            await clearSenderNotifications(userId, senderId);
            return true; 
        } catch (error) {
            console.error("Error clearing notifications:", error.message);
            return false;
        }
    }, [userId]);

    return { clearNotifications };
};
