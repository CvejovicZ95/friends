import React, { useState, useContext } from "react";
import { FaThumbsUp, FaComment, FaEllipsisV } from "react-icons/fa";
import { AuthContext } from "../../../context/authContext";
import { useGetAllPosts } from "../../../hooks/usePosts";
import { CommentsList } from "../comments/Comments";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import "./PostItem.scss";

export const PostItem = ({ post, onEdit, onDelete }) => {
  const { authUser } = useContext(AuthContext);
  const { handleLikePost } = useGetAllPosts();
  const [commentsVisible, setCommentsVisible] = useState(false);
  const location = useLocation();

  const handleLikeClick = async () => {
    try {
      if (authUser) {
        await handleLikePost(post._id, authUser.username);
      }
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  const toggleComments = () => {
    setCommentsVisible((prevState) => !prevState);
  };

  const isProfilePage = location.pathname === "/profile";

  return (
    <div key={post._id} className="post-item">
      <div className="post-header">
        <div className="post-user-info">
          <img
            src={
              isProfilePage
                ? `${process.env.REACT_APP_API_BASE_URL}/images/${authUser.profilePhotoImagePath}`
                : `${process.env.REACT_APP_API_BASE_URL}/images/${post.user.profilePhotoImagePath}`
            }
            alt={post.user.username}
            className="post-user-photo"
          />
          <span className="post-username">{post.user.username}</span>
        </div>
        {authUser && authUser.username === post.user.username && (
          <div className="post-menu">
            <FaEllipsisV className="menu-icon" />
            <div className="dropdown-menu">
              <span onClick={() => onEdit(post)}>Edit</span>
              <span onClick={() => onDelete(post._id)}>Delete</span>
            </div>
          </div>
        )}
      </div>
      <div className="post-content">
        <p>{post.content.text}</p>
        {post.content.imageUrl && (
          <img
            src={`${process.env.REACT_APP_API_BASE_URL}/images/${post.content.imageUrl}`}
            alt="Post"
            className="post-image"
          />
        )}
      </div>
      <div className="post-footer">
        <div className="post-actions">
          <div className="like-action" onClick={handleLikeClick}>
            <FaThumbsUp className="action-icon" />
            <span className="like-count">{post.actions.likes.count}</span>
          </div>
          <div className="comment-action" onClick={toggleComments}>
            <FaComment className="action-icon" />
            <span className="comment-count">{post.actions.comments.count}</span>
          </div>
        </div>
        <span className="post-timestamp">
          {new Date(post.timestamp).toLocaleString()}
        </span>
      </div>
      {commentsVisible && <CommentsList postId={post._id} />}
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      profilePhotoImagePath: PropTypes.string.isRequired,
    }).isRequired,
    content: PropTypes.shape({
      text: PropTypes.string.isRequired,
      imageUrl: PropTypes.string,
    }).isRequired,
    actions: PropTypes.shape({
      likes: PropTypes.shape({
        count: PropTypes.number.isRequired,
      }).isRequired,
      comments: PropTypes.shape({
        count: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
    timestamp: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
