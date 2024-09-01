const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const getAllComments = async (postId) => {
    try {
        const res = await fetch(`${apiUrl}/api/comments/${postId}`);
        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const addComment = async (commentData) => {
    try {
        const res = await fetch(`${apiUrl}/api/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(commentData),
            credentials: 'include'
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};
