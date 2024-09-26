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
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to add comment");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteComment = async (id) => {
  try {
    const res = await fetch(`${apiUrl}/api/comments/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData || "Failed to delete comment");
    }

    const result = await res.json();
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateComment = async (id, text) => {
  try {
    const res = await fetch(`${apiUrl}/api/comments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error while updating comment");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message || "Error while updating comment");
  }
};
