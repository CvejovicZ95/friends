import React, { useState } from "react";
import { NavBar } from "../feedPage/nav/NavBar";
import { RegisteredUsers } from "../feedPage/registeredUsers/RegisteredUsers";
import { useChatRequests } from "../../hooks/useChatRequest";
import { useAuthContext } from "../../context/authContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./ChatRequest.scss";

export const ChatRequest = () => {
    const { authUser } = useAuthContext();
    const [receiverUsername, setReceiverUsername] = useState("");

    const { chatRequests, handleSendChatRequest, handleManageChatRequest } = useChatRequests(authUser ? authUser.id : null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (authUser) {
            handleSendChatRequest(authUser.id, receiverUsername);
            setReceiverUsername("");
        }
    };

    return (
        <div>
            <NavBar />
            <div className="chat-request-container">
                <div className="chat-requests">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Enter username to send request"
                            value={receiverUsername}
                            onChange={(e) => setReceiverUsername(e.target.value)}
                            required
                        />
                        <button type="submit">Send</button>
                    </form>

                    <ul>
                        {chatRequests.filter(request => request.receiverId === authUser.id).length === 0 ? (
                            <p className="no-requests">No chat requests at the moment.</p>
                        ) : (
                            chatRequests.filter(request => request.receiverId === authUser.id).map(request => (
                                <li key={request._id} className="request-item">
                                    <p>Chat request from {request.senderId.username}</p>
                                    <div className="actions">
                                        <button onClick={() => handleManageChatRequest(request._id, 'accept')}>Accept</button>
                                        <button onClick={() => handleManageChatRequest(request._id, 'decline')}>Decline</button>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
                <RegisteredUsers />
            </div>
            <ToastContainer/>
        </div>
    );
};
