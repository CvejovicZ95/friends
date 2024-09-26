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
    console.error("Error fetching user conversations:", error.message);
    throw new Error(error.message);
  }
};

export const createConversation = async (senderId, receiverId) => {
  try {
    const response = await fetch(`${apiUrl}/api/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ senderId, receiverId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating conversation:", error.message);
    throw new Error(error.message);
  }
};
