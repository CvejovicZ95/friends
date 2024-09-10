const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const getAllPosts = async () => {
    try {
        const res = await fetch(`${apiUrl}/api/posts`)
        const data = await res.json()
        if (data.error) {
            throw new Error(data.error)
        }
        return data
    } catch (error) {
        throw new Error(error.message)
    }
}

export const deletePost = async (id) => {
    try {
        const response = await fetch(`${apiUrl}/api/post/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        if (!response.ok) {
            let errorText = await response.text();
            try {
                const errorJson = JSON.parse(errorText);
                throw new Error(errorJson.message || 'Error deleting post');
            } catch {
                throw new Error(errorText || 'Error deleting post');
            }
        }

        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const addPost = async (formData) => {
    try {
        const res = await fetch(`${apiUrl}/api/newPost`, {
            method: "POST",
            body: formData,
            credentials:'include'
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Error while creating post");
        }

        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error(error.message || "Error while creating post");
    }
};

export const getPostsByUser = async (userId) => {
    try {
        const res = await fetch(`${apiUrl}/api/posts/user/${userId}`);
        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}


export const updatePost = async (id, formData) => {
    try {
        const res = await fetch(`${apiUrl}/api/post/${id}`, {
            method: "PUT",
            body: formData,
            credentials: 'include',
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Error while updating post");
        }

        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error(error.message || "Error while updating post");
    }
};

export const likePost = async (id) => {
    try {
        const res = await fetch(`${apiUrl}/api/post/like/${id}` , {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        })
        const data = await res.json()

        if (data.error) {
            throw new Error(data.error)
        }
        return data;
    } catch (error) {
        throw new Error(error.message || 'Error in like post');
    }
}
