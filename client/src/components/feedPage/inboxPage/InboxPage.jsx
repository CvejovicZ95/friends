import React, {useContext} from "react";
import "./InboxPage.scss";
import { NavBar } from "../nav/NavBar";
import { AuthContext } from "../../../context/authContext";

export const InboxPage = () => {

    const { authUser } = useContext(AuthContext);

    const messages = [
        { id: 1, sender: 'Zoki', body: 'Don\'t forget about our meeting tomorrow at 10 AM.' },
        { id: 2, sender: 'Kizo', body: 'The project deadline has been extended to next week.' },
        { id: 3, sender: 'Zoran', body: 'Click the link below to reset your password.' },
      ];
    
    return (
        <>
        <NavBar/>
        <div className="inbox-page">
        <div className="message-list">
          {messages.length > 0 ? (
            <ul>
              {messages.map(message => (
                <li key={message.id} className="message-item">
                  <div className="message-user-info">
                    <img
                      src={`${process.env.REACT_APP_API_BASE_URL}/images/${authUser.profilePhotoImagePath}`}
                      alt={authUser.username}
                      className="message-user-photo"
                    />
                    <div className="message-content">
                      <div className="message-text">
                        <p className="message-sender">
                          <strong>{message.sender}</strong>:
                          <span>{message.body}</span>
                        </p>
                     
                      </div>
                      <span className="message-timestamp">
                        {new Date().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No messages yet</p>
          )}
        </div>
      </div>
      </>
    );
  };
  
  