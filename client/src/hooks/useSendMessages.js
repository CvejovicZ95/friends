import { useConversation } from "../zustand/useConversation";
import { sendMessageToConversation } from "../api/messagesApi";
import { socket } from "../socket";

export const useSendMessage = () => {
  const { selectedConversation } = useConversation();

  const handleSendMessage = async (messageContent, senderId) => {
    if (messageContent) {
      try {
        const receiverId = selectedConversation?.participants.find(participant => participant._id !== senderId)?._id;

        if (!receiverId) throw new Error("Receiver ID not found");

        await sendMessageToConversation(selectedConversation._id, senderId, receiverId, messageContent);

      
        socket.emit("sendMessage", {
          sender: senderId,
          receiver: receiverId,
          content: messageContent,
          conversationId: selectedConversation._id,
        });

      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };
  
  return { handleSendMessage };
};
