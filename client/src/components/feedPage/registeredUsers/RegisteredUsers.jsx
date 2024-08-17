import React from "react";
import "./RegisteredUsers.scss";
import { FaUserCircle } from "react-icons/fa";

const staticUsers = [
    { id: 1, username: "JaneDoe", profilePhotoImagePath: "" },
    { id: 2, username: "JohnSmith", profilePhotoImagePath: "" },
    { id: 3, username: "EmilyJohnson", profilePhotoImagePath: "" },
    { id: 4, username: "MichaelBrown", profilePhotoImagePath: "" },
    { id: 5, username: "SarahDavis", profilePhotoImagePath: "" },
    { id: 6, username: "RobertMiller", profilePhotoImagePath: "" },
    { id: 7, username: "LindaWilson", profilePhotoImagePath: "" },
    { id: 8, username: "JamesMoore", profilePhotoImagePath: "" },
    { id: 9, username: "PatriciaTaylor", profilePhotoImagePath: "" },
    { id: 10, username: "DavidAnderson", profilePhotoImagePath: "" },
    { id: 11, username: "JessicaThomas", profilePhotoImagePath: "" },
    { id: 12, username: "WilliamJackson", profilePhotoImagePath: "" },
    { id: 13, username: "KarenWhite", profilePhotoImagePath: "" },
    { id: 14, username: "DanielHarris", profilePhotoImagePath: "" },
    { id: 15, username: "NancyClark", profilePhotoImagePath: "" },
];

export const RegisteredUsers = () => {
    return (
        <div className="registered-users">
            <h2>Users</h2>
            <ul>
                {staticUsers.map(user => (
                    <li key={user.id} className="user-item">
                        {user.profilePhotoImagePath ? (
                            <img
                                src={`${process.env.REACT_APP_API_BASE_URL}/images/${user.profilePhotoImagePath}`}
                                alt={user.username}
                                className="user-photo"
                            />
                        ) : (
                            <FaUserCircle className="user-icon" />
                        )}
                        <p>{user.username}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
