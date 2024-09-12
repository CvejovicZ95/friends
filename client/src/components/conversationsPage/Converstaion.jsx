import React, { useState, useEffect } from "react";
import { NavBar } from "../feedPage/nav/NavBar";
import { useGetUsers } from "../../hooks/useUsers";
import { useAuthContext } from "../../context/authContext";
import { useParams } from "react-router-dom";
import { useUserConversations } from "../../hooks/useConversations";
import { useSendMessage } from "../../hooks/useSendMessages";
import { useConversation } from "../../zustand/useConversation";
import { IoSend } from "react-icons/io5";
import { socket } from "../../socket"; // Import socket
import "./Conversation.scss";

export const Conversation = () => {
  const { username } = useParams(); 
  const { users, loading: usersLoading } = useGetUsers();  
  const { authUser } = useAuthContext();
  const { conversations, loading: conversationsLoading } = useUserConversations(authUser?.id);

  const [currentConversationId, setCurrentConversationId] = useState(null);
  const { messages, setMessages, setSelectedConversation } = useConversation(); // Use Zustand store
  const { handleSendMessage } = useSendMessage();
  const [newMessage, setNewMessage] = useState("");

  console.log("Messages in conversation:", messages);

  useEffect(() => {
    const handleNewMessage = (message) => {
      console.log('New message received:', message);
      setMessages(prevMessages => {
        console.log("Previous messages:", prevMessages);
        return [...prevMessages, message];
      });
    };
  
    socket.on('newMessage', handleNewMessage);
  
    return () => {
      console.log('Cleaning up socket.on for newMessage');
      socket.off('newMessage', handleNewMessage);
    };
  }, [setMessages]);
  

  useEffect(() => {
    if (currentConversationId) {
      socket.emit('joinConversation', currentConversationId);
      console.log(`Joined conversation: ${currentConversationId}`);
    }
  }, [currentConversationId]);

  useEffect(() => {
    if (conversations.length > 0) {
      let selectedConversation = conversations.find(convo =>
        convo.participants.some(participant => participant.username === username)
      );

      if (!selectedConversation) {
        selectedConversation = {
          _id: null,
          participants: [{ username: username }],
          messages: []
        };
      }

      console.log("Setting selected conversation in Zustand:", selectedConversation);
      setSelectedConversation(selectedConversation);
      setCurrentConversationId(selectedConversation._id);
    }
  }, [conversations, username, setSelectedConversation]);

  if (usersLoading || conversationsLoading) {
    return <p>Loading...</p>;
  }

  const selectedUser = users.find(user => user.username === username);

  if (!selectedUser) {
    return <p>User not found.</p>;
  }

  const handleSubmitMessage = (e) => {
    e.preventDefault();

    if (newMessage.trim() === "") return;

    try {
      handleSendMessage(newMessage, authUser.id);
      setNewMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="conversation-container">
        <h1>
          Chat with <img src={`${process.env.REACT_APP_API_BASE_URL}/images/${selectedUser.profilePhotoImagePath}`} alt={selectedUser.username} className="profile-photo" />
        </h1>

        <div className="chat-window">
          <div className="messages">
            {Array.isArray(messages) && messages.length > 0 ? (
              messages.map((msg) => {
                const isSentByAuthUser = msg.sender === authUser.id;
                const senderUser = users.find(user => user._id === msg.sender);

                console.log("Rendering message:", msg);

                return (
                  <div key={msg._id} className={`message ${isSentByAuthUser ? "sent" : "received"}`}>
                    <img
                      src={`${process.env.REACT_APP_API_BASE_URL}/images/${senderUser?.profilePhotoImagePath}`}
                      alt={senderUser?.username}
                      className="user-photo"
                    />
                    <div className="message-content">
                      <p>{msg.content}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No messages available.</p>
            )}
          </div>

          <form onSubmit={handleSubmitMessage} className="message-form">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
            />
            <button type="submit"><IoSend/></button>
          </form>
        </div>
      </div>
    </>
  );
};
