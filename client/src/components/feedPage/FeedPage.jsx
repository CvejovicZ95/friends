import React from "react";
import "./FeedPage.scss"
import { useLogoutUser } from "../../hooks/useUserRegisterLoginLogout";

export const FeedPage = () => {
    const { logoutHandler } = useLogoutUser()
    return (
        <div>
            FEED PAGE
            <button onClick={logoutHandler}>Logout</button>
        </div>
    )
}