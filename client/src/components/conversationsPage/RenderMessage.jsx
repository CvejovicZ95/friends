import React from "react";
import "./Conversation.scss";

export const RenderMessage = ({ msg, authUser, users }) => {
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
  };
  