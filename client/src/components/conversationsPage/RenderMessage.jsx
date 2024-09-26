import React from "react";
import PropTypes from "prop-types";
import "./Conversation.scss";

export const RenderMessage = ({ msg, authUser, users }) => {
  const isSentByAuthUser = msg.sender === authUser.id;
  const senderUser = users.find((user) => user._id === msg.sender);

  return (
    <div
      key={msg._id}
      className={`message ${isSentByAuthUser ? "sent" : "received"}`}
    >
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

RenderMessage.propTypes = {
  msg: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    sender: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      profilePhotoImagePath: PropTypes.string,
    }),
  ).isRequired,
};
