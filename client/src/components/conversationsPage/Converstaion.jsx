import React, { useState, useEffect } from "react";
import { NavBar } from "../feedPage/nav/NavBar";
import { useGetUsers } from "../../hooks/useUsers";
import { useAuthContext } from "../../context/authContext";
import { useParams } from "react-router-dom";
import { useUserConversations } from "../../hooks/useConversations";
import { useMessages } from "../../hooks/useMessages";
import { useSendMessage } from "../../hooks/useSendMessages";
import { useConversation } from "../../zustand/useConversation";
import { IoSend } from "react-icons/io5";
import "./Conversation.scss";

export const Conversation = () => {
    const { username } = useParams(); 
    const { users, loading: usersLoading } = useGetUsers();  
    const { authUser } = useAuthContext();
    const { conversations, loading: conversationsLoading } = useUserConversations(authUser?.id);

    const [currentConversationId, setCurrentConversationId] = useState(null);
    const { loading: messagesLoading, error: messagesError, messages } = useMessages(currentConversationId);

    const { handleSendMessage } = useSendMessage();
    const { selectedConversation, setSelectedConversation } = useConversation();

    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        if (conversations.length > 0) {
            let selectedConversation = conversations.find(convo => 
                convo.participants.some(participant => participant.username === username)
            );
            console.log(selectedConversation)
            
            if (!selectedConversation) {
                // If no conversation found, you might want to create one or handle it accordingly
                selectedConversation = {
                    _id: null,
                    participants: [{ username: username }],
                    messages: []
                };
            }

            setSelectedConversation(selectedConversation);
            setCurrentConversationId(selectedConversation._id);
        } else {
            console.log('No conversations available');
        }
    }, [conversations, username, setSelectedConversation]);

    useEffect(() => { 
        // Handle scroll to bottom or any other updates when messages change
        /*const chatWindow = document.querySelector('.chat-window');
        chatWindow.scrollTop = chatWindow.scrollHeight;*/
    }, [messages]);

    if (usersLoading || conversationsLoading) {
        return <p>Loading...</p>;
    }

    const selectedUser = users.find(user => user.username === username);

    if (!selectedUser) {
        return <p>User not found.</p>;
    }

    const handleSubmitMessage = async (e) => {
        e.preventDefault();
      
        if (newMessage.trim() === "") return;
      
        try {
            await handleSendMessage(newMessage, authUser.id);
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
