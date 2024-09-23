const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const sendFriendRequest = async (senderId, receiverUsername) => {
    try {
        const res = await fetch(`${apiUrl}/api/send-friend-request`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ senderId, receiverUsername }),
            //credentials: 'include'
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Failed to send friend request');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getFriendRequests = async (userId) => {
    try {
        const res = await fetch(`${apiUrl}/api/friend-requests/${userId}`);
        const data = await res.json();

        if (data.error) {
            throw new Error(data.error);
        }

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const manageFriendRequest = async (requestId, action) => {
    try {
        const res = await fetch(`${apiUrl}/api/manage-friend-request`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ requestId, action }),
            //credentials: 'include',
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Failed to manage friend request');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};
