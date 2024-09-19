import { useEffect, useCallback, useRef } from 'react';
import { socket } from '../socket';
import notificationSound from '../assets/sounds/notification.mp3';
import { useAuthContext } from '../context/authContext';
import { useConversation } from '../zustand/useConversation';

export const useGlobalMessageListener = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const { setMessages } = useConversation();

  const authUserRef = useRef(authUser);
  useEffect(() => {
    authUserRef.current = authUser;
  }, [authUser]);

  const handleNewMessage = useCallback((message) => {

    if (message.sender !== authUserRef.current.id) {
        const sound = new Audio(notificationSound);
        sound.play();
    }

    setMessages((prevMessages) => {

        if (!message._id || prevMessages.some((msg) => msg._id === message._id)) {
            return prevMessages;
        }

        const updatedMessages = [...prevMessages, message];

        return updatedMessages;
    });

    setAuthUser((prevUser) => {
        if (!prevUser) return null;

        const existingNotifications = new Map(
            prevUser.unreadNotifications.map(notif => [notif.senderId, notif.count])
        );

        if (existingNotifications.has(message.sender)) {
            existingNotifications.set(message.sender, existingNotifications.get(message.sender) + 1);
        } else {
            existingNotifications.set(message.sender, 1);
        }

        const updatedNotifications = Array.from(existingNotifications, ([senderId, count]) => ({
            senderId,
            count
        }));

        return {
            ...prevUser,
            unreadNotifications: updatedNotifications
        };
    });
}, [setMessages, setAuthUser]);


  useEffect(() => {
    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [handleNewMessage]);
};