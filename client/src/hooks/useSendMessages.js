import { useConversation } from "../zustand/useConversation";
import { sendMessageToConversation } from "../api/messagesApi";

export const useSendMessage = () => {
  const { selectedConversation, messages, setMessages } = useConversation();
 
 /* console.log("selectedConversation:", selectedConversation);
  console.log("messages:", messages);*/

  const handleSendMessage = async (messageContent, senderId) => {
    if (messageContent) {
      try {
        console.log("Sending message:", messageContent);
  
        // Pretpostavljamo da receiverId može biti iz nekog UI-a ili props-a
        const receiverId = selectedConversation ? selectedConversation.participants[1] : null;

        console.log(selectedConversation)
  
        const message = await sendMessageToConversation(senderId, receiverId, messageContent);
  
        console.log("Message received from server:", message);
  
        // Dodaj novu poruku u stanje
        setMessages(prevMessages => [...prevMessages, message]);

      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return { handleSendMessage };
};