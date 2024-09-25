import React, { useState, useEffect, useRef } from "react";
import { useGetUsers } from "../../hooks/useUsers";
import { useAuthContext } from "../../context/authContext";
import { useParams, useNavigate, useLocation } from "react-router-dom"; 
import { useUserConversations } from "../../hooks/useConversations";
import { useSendMessage } from "../../hooks/useSendMessages";
import { useClearNotifications } from "../../hooks/useClearMessageNotifications";
import { useConversation } from "../../zustand/useConversation";
import { IoSend } from "react-icons/io5";
import { IoClose } from "react-icons/io5"; 
import { socket } from "../../socket";
import "./Conversation.scss";

export const Conversation = () => {
  const { username } = useParams(); 
  const { users, loading: usersLoading } = useGetUsers();  
  const { authUser, resetUnreadNotifications } = useAuthContext();
  const location = useLocation();
  const { senderId } = location.state || {};
  const { clearNotifications } = useClearNotifications(authUser?.id);
  const { conversations, loading: conversationsLoading } = useUserConversations(authUser?.id);
  const navigate = useNavigate();

  const [currentConversationId, setCurrentConversationId] = useState(null);
  const { messages, setSelectedConversation } = useConversation(); 
  const { handleSendMessage } = useSendMessage();
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (currentConversationId) {
      socket.emit('joinConversation', currentConversationId);
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

      setSelectedConversation(selectedConversation);
      setCurrentConversationId(selectedConversation._id);
    }
  }, [conversations, username, setSelectedConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  const handleLeaveChat = async() => {
    resetUnreadNotifications(selectedUser._id); 
    if(senderId) {
      await clearNotifications(senderId)
    }
    navigate("/feed");
  };

  return (
    <>
      <div className="conversation-container">
        <img src="/friends.png" alt="logo" className="logo"/>
        <h1>
          <img src={`${process.env.REACT_APP_API_BASE_URL}/images/${selectedUser.profilePhotoImagePath}`} alt={selectedUser.username} className="profile-photo" />
          Chat with {selectedUser.username}
          <button onClick={handleLeaveChat} className="leave-chat-icon">
            <IoClose />
          </button>
        </h1>
        <div className="chat-window">
          <div className="messages">
            {Array.isArray(messages) && messages.length > 0 ? (
              messages.map((msg) => {
                const isSentByAuthUser = msg.sender === authUser.id;
                const senderUser = users.find(user => user._id === msg.sender);

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
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmitMessage} className="message-form">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
            />
            <button type="submit"><IoSend /></button>
          </form>
        </div>
      </div>
    </>
  );
};
