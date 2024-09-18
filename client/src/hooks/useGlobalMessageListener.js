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
    console.log('Received new message:', message);

    if (message.sender !== authUserRef.current.id) {
        const sound = new Audio(notificationSound);
        sound.play();
    }

    setMessages((prevMessages) => {
        console.log('Previous messages:', prevMessages);

        if (!message._id || prevMessages.some((msg) => msg._id === message._id)) {
            console.log('Message already exists or has no ID:', message);
            return prevMessages;
        }

        const updatedMessages = [...prevMessages, message];
        console.log('Updated messages:', updatedMessages);

        return updatedMessages;
    });

    setAuthUser((prevUser) => {
        if (!prevUser) return null;

        console.log('Previous user state:', prevUser);

        // Create a map for easy lookup and update
        const existingNotifications = new Map(
            prevUser.unreadNotifications.map(notif => [notif.senderId, notif.count])
        );

        console.log('Existing notifications before update:', existingNotifications);

        if (existingNotifications.has(message.sender)) {
            console.log('Updating existing notification count for sender:', message.sender);
            existingNotifications.set(message.sender, existingNotifications.get(message.sender) + 1);
        } else {
            console.log('Adding new notification for sender:', message.sender);
            existingNotifications.set(message.sender, 1);
        }

        const updatedNotifications = Array.from(existingNotifications, ([senderId, count]) => ({
            senderId,
            count
        }));

        console.log('Updated unread notifications:', updatedNotifications);

        // Ensure that updated notifications don't contain duplicates
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