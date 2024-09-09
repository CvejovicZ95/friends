import React, { useState, useEffect } from "react";
import { NavBar } from "../feedPage/nav/NavBar";
import { useGetUsers } from "../../hooks/useUsers";
import { useAuthContext } from "../../context/authContext";
import { useParams } from "react-router-dom";
import { useMessages } from "../../hooks/useMessages";
import { useUserConversations } from "../../hooks/useConversations";
import { IoSend } from "react-icons/io5";
import "./Conversation.scss";

export const Conversation = () => {
    const { username } = useParams(); 
    const { users, loading: usersLoading } = useGetUsers();  
    const { authUser } = useAuthContext();
    const { conversations, loading: conversationsLoading } = useUserConversations(authUser?.id);

    const [currentConversationId, setCurrentConversationId] = useState(null);
    const { messages, loading: messagesLoading, error: messagesError } = useMessages(currentConversationId);

    useEffect(() => {
        if (conversations.length > 0) {
            const selectedConversation = conversations.find(convo => 
                convo.participants.some(participant => participant.username === username)
            );

            if (selectedConversation) {
                setCurrentConversationId(selectedConversation._id);
            }
        }
    }, [conversations, username]);

    const [newMessage, setNewMessage] = useState("");

    if (usersLoading || conversationsLoading || messagesLoading) {
        return <p>Loading...</p>;
    }

    if (messagesError) {
        return <p>Error loading messages: {messagesError}</p>;
    }

    const selectedUser = users.find(user => user.username === username);
    console.log(selectedUser)

    if (!selectedUser) {
        return <p>User not found.</p>;
    }

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() === "") return;

        // TODO: Implement message sending functionality
        setNewMessage("");
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
                                // eslint-disable-next-line 
                                const receiverUser = users.find(user => user._id === msg.receiver);  

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
                    <form onSubmit={handleSendMessage} className="message-form">
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
