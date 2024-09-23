import React from "react";
import { NavBar } from "../feedPage/nav/NavBar";
import { RegisteredUsers } from "../feedPage/registeredUsers/RegisteredUsers";
import { useFriendRequests } from "../../hooks/useFriendRequest";
import { useAuthContext } from "../../context/authContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./FriendRequest.scss";

export const FriendRequest = () => {
    const { authUser } = useAuthContext();
    const { friendRequests, handleManageFriendRequest } = useFriendRequests(authUser ? authUser.id : null);

    return (
        <div>
            <NavBar />
            <div className="friend-request-container">
                <div className="friend-requests">
                    <ul>
                        {friendRequests.filter(request => request.receiverId === authUser.id).length === 0 ? (
                            <p className="no-requests">No friend requests at the moment.</p>
                        ) : (
                            friendRequests.filter(request => request.receiverId === authUser.id).map(request => (
                                <li key={request._id} className="request-item">
                                    <p>Friend request from {request.senderId.username}</p>
                                    <div className="actions">
                                        <button onClick={() => handleManageFriendRequest(request._id, 'accept')}>Accept</button>
                                        <button onClick={() => handleManageFriendRequest(request._id, 'decline')}>Decline</button>
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

