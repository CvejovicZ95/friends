const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const sendChatRequest = async (senderId, receiverUsername) => {
    try {
        const res = await fetch(`${apiUrl}/api/send-chat-request`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ senderId, receiverUsername }),
            //credentials: 'include', // Ako koristiš autentifikaciju
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Failed to send chat request');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getChatRequests = async (userId) => {
    try {
        const res = await fetch(`${apiUrl}/api/chat-requests/${userId}`);
        const data = await res.json();

        if (data.error) {
            throw new Error(data.error);
        }

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const manageChatRequest = async (requestId, action) => {
    try {
        const res = await fetch(`${apiUrl}/api/manage-chat-request`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ requestId, action }),
            //credentials: 'include', // Ako koristiš autentifikaciju
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Failed to manage chat request');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};
