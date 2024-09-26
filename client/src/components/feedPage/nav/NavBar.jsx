import React, { useContext } from "react";
import "./NavBar.scss";
import { Logo } from "../../logo/Logo";
import { MdFeed, MdLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLogoutUser } from "../../../hooks/useUserRegisterLoginLogout";
import { SendFriendRequestForm } from "../../friendRequest/SendFriendRequestForm";
import { AuthContext } from "../../../context/authContext";
import { useFriendRequests } from "../../../hooks/useFriendRequest";

export const NavBar = () => {
  const { logoutHandler } = useLogoutUser();
  const { authUser } = useContext(AuthContext);
  const { handleSendFriendRequest } = useFriendRequests(
    authUser?.id,
    authUser?.friends,
  );

  const pendingRequestsCount =
    authUser?.friendRequests?.filter(
      (request) =>
        request.receiverId === authUser.id && request.status === "pending",
    ).length || 0;

  return (
    <div className="nav">
      <div className="nav-bar">
        <div className="nav-left">
          <Logo />
        </div>
        <SendFriendRequestForm
          handleSendFriendRequest={handleSendFriendRequest}
        />
        <div className="nav-right">
          <Link to={"/profile"}>
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
          </Link>
          <MdLogout
            className="nav-icon logout-icon"
            onClick={logoutHandler}
            title="Logout"
          />
        </div>
      </div>
      <div className="nav-section-two">
        <Link to={"/feed"}>
          <MdFeed className="nav-icon" title="Feed" />
        </Link>
        <Link to={"/friendRequests"} className="nav-icon">
          <FaUserFriends />
          {pendingRequestsCount > 0 && (
            <span className="request-count">{pendingRequestsCount}</span>
          )}
        </Link>
        <Link to={"/profile"}>
          <CgProfile className="nav-icon" title="Profile" />
        </Link>
      </div>
    </div>
  );
};
