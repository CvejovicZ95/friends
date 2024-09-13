import { useEffect } from 'react';
import { socket } from '../socket';
import notificationSound from '../assets/sounds/notification.mp3';
import { useAuthContext } from '../context/authContext';
import { useConversation } from '../zustand/useConversation';

export const useGlobalMessageListener = () => {
  const { authUser } = useAuthContext(); 
  const { setMessages } = useConversation();

  useEffect(() => {
    const handleNewMessage = (message) => {
      if (message.sender !== authUser.id) {
        const sound = new Audio(notificationSound);
        sound.play(); 
      }

      setMessages((prevMessages) => {
        if (!message._id || prevMessages.some((msg) => msg._id === message._id)) {
          return prevMessages; 
        }
        return [...prevMessages, message];
      });
    };

    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [authUser, setMessages]);
};
