import { useConversation } from "../zustand/useConversation";
import { sendMessageToConversation } from "../api/messagesApi";

export const useSendMessage = () => {
  const { selectedConversation, setMessages } = useConversation();

  const handleSendMessage = async (messageContent, senderId) => {
    if (messageContent) {
      try {
        const receiverId = selectedConversation?.participants.find(participant => participant._id !== senderId)?._id;
        
        if (!receiverId) throw new Error("Receiver ID not found");
        
        const message = await sendMessageToConversation(senderId, receiverId, messageContent);

        setMessages(prevMessages => [...prevMessages, message]);

      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return { handleSendMessage };
};
