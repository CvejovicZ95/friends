import { useConversation } from "../zustand/useConversation";
import { sendMessageToConversation } from "../api/messagesApi";
import { socket } from "../socket";

export const useSendMessage = () => {
  const { selectedConversation, setMessages } = useConversation();

  const handleSendMessage = async (messageContent, senderId) => {
    if (messageContent) {
      try {
        const receiverId = selectedConversation?.participants.find(participant => participant._id !== senderId)?._id;

        if (!receiverId) throw new Error("Receiver ID not found");

        const message = await sendMessageToConversation(selectedConversation._id, senderId, receiverId, messageContent);

        console.log("Message sent:", message);

        // Emituj novu poruku preko socket.io
        console.log("Emitting message to socket:", {
          sender: senderId,
          receiver: receiverId,
          content: messageContent,
          conversationId: selectedConversation._id,
        });
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
