const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const getMessagesFromConversation = async (conversationId) => {
  try {
    const res = await fetch(`${apiUrl}/api/${conversationId}`);
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const sendMessageToConversation = async (
  conversationId,
  sender,
  receiver,
  content,
) => {
  try {
    const res = await fetch(`${apiUrl}/api/send/${conversationId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sender, receiver, content }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error sending message");
    }

    return data;
  } catch (error) {
    console.error("Error sending message to server:", error);
    throw new Error(error.message);
  }
};

export const clearSenderNotifications = async (userId, senderId) => {
  try {
    const res = await fetch(
      `${apiUrl}/api/users/${userId}/clear-notifications/sender/${senderId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error clearing notifications");
    }

    return data;
  } catch (error) {
    console.error("Error clearing notifications:", error);
    throw new Error(error.message);
  }
};
