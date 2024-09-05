import React, { useState } from "react";
import { NavBar } from "../feedPage/nav/NavBar";
import { useGetUsers } from "../../hooks/useUsers";
import { useAuthContext } from "../../context/authContext";
import { useParams } from "react-router-dom";
import "./Conversation.scss";

export const Conversation = () => {
    const { username } = useParams();
    const { users, loading } = useGetUsers();
    const { authUser } = useAuthContext();

    // Statičke poruke
    const [messages, setMessages] = useState([
        { from: authUser?.username, text: "Hey, how's it going?" },
        { from: username, text: "I'm good! What about you?" },
        { from: authUser?.username, text: "I'm doing well. Just catching up with work." }
    ]);
    const [newMessage, setNewMessage] = useState("");

    if (loading) {
        return <p>Loading...</p>;
    }

    const selectedUser = users.find(user => user.username === username);

    if (!selectedUser) {
        return <p>User not found.</p>;
    }

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() === "") return;

        setMessages([...messages, { from: authUser.username, text: newMessage }]);
        setNewMessage("");
    };

    return (
        <>
            <NavBar />
            <div className="conversation-container">
                <h1>Conversation between {authUser.username} and {selectedUser.username}</h1>
                <div className="chat-window">
                    <div className="messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.from === authUser.username ? "sent" : "received"}`}>
                                <img
                                    src={msg.from === authUser.username ? `${process.env.REACT_APP_API_BASE_URL}/images/${authUser.profilePhotoImagePath}` : `${process.env.REACT_APP_API_BASE_URL}/images/${selectedUser.profilePhotoImagePath}`}
                                    alt={msg.from}
                                    className="message-avatar"
                                />
                                <p>{msg.text}</p>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSendMessage} className="message-form">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message here..."
                        />
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
        </>
    );
};
