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

export const sendMessageToConversation = async (sender, receiver, content) => {
  try {
    const res = await fetch(`${apiUrl}/api/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sender, receiver, content })
    });
    
    const data = await res.json();
    

    if (!res.ok) {
      throw new Error(data.message || 'Error sending message');
    }

    return data;
  } catch (error) {
    console.error("Error sending message to server:", error);
    throw new Error(error.message);
  }
};
