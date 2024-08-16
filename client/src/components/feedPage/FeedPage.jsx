import React, { useContext } from "react";
import "./FeedPage.scss";
import { Logo } from "../logo/Logo";
import { MdFeed, MdLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { BiMessageSquareDetail } from "react-icons/bi";
import { useLogoutUser } from "../../hooks/useUserRegisterLoginLogout";
import { AuthContext } from "../../context/authContext";


export const FeedPage = () => {
    const { logoutHandler } = useLogoutUser();
    const { authUser } = useContext(AuthContext);
    
    return (
        <div className="feed-page">
            <nav className="nav-bar">
                <div className="nav-left">
                    <Logo />
                </div>
                <div className="nav-center">
                    <MdFeed className="nav-icon" title="Feed" />
                    <BiMessageSquareDetail className="nav-icon" title="Inbox" />
                    <CgProfile className="nav-icon" title="Profile" />
                    <div className="search-container">
                        <FaSearch className="nav-icon search-icon" title="Search" />
                        <input type="text" className="search-input" placeholder="Search..." />
                    </div>
                </div>
                <div className="nav-right">
                <div className="user-info">
                        {authUser?.profilePhotoImagePath ? (
                            <img
                                src={`${process.env.REACT_APP_API_BASE_URL}/images/${authUser.profilePhotoImagePath}`}
                                alt="Profile"
                                className="user-photo"
                            />
                        ) : (
                            <FaUserCircle className="user-icon" />
                        )}
                        <p>{authUser?.username}</p>
                    </div>
                    <MdLogout className="nav-icon logout-icon" onClick={logoutHandler} title="Logout" />
                </div>
            </nav>
        </div>
    );
};
