const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const getUserConversations = async (userId) => {
    try {
        const response = await fetch(`${apiUrl}/api/user/${userId}/conversations`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user conversations:', error.message);
        throw new Error(error.message);
    }
};
