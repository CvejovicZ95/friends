import React from "react";
import "./FeedPage.scss";
import { NavBar } from "./nav/NavBar";
import { PostStatus } from "./postStatus/PostStatus";
import { PostsPage } from "./postsPage/PostsPage";
import { RegisteredUsers } from "./registeredUsers/RegisteredUsers";

export const FeedPage = () => {
    return (
        <>
            <NavBar />
            <div className="feed-container">
                <div className="feed-main">
                    <PostStatus />
                    <PostsPage />
                </div>
                <RegisteredUsers />
            </div>
        </>
    );
}
