import React, { useState, useContext } from "react";
import { useGetAllComments } from "../../../hooks/useComments";
import { AuthContext } from "../../../context/authContext";
import { AddComment } from "./AddComment";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";
import "./Comments.scss";

export const CommentsList = ({ postId }) => {
  const { comments, loading, handleDeleteComment, handleUpdateComment } =
    useGetAllComments(postId);
  const { authUser } = useContext(AuthContext);
  const [editCommentId, setEditCommentId] = useState(null);
  const [newText, setNewText] = useState("");

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleEditComment = (commentId, currentText) => {
    setEditCommentId(commentId);
    setNewText(currentText);
  };

  const handleSaveEdit = async () => {
    try {
      await handleUpdateComment(editCommentId, newText);
      setEditCommentId(null);
      setNewText("");
    } catch (error) {
      console.error("Failed to update comment", error);
    }
  };

  return (
    <div className="comments-list">
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment._id} className="comment-item">
              <div className="comment-user-info">
                <img
                  src={`${process.env.REACT_APP_API_BASE_URL}/images/${comment.user.profilePhotoImagePath}`}
                  alt={comment.user.username}
                  className="comment-user-photo"
                />
                <div className="comment-content">
                  <div className="comment-text">
                    <p className="comment-username">
                      <strong>{comment.user.username}</strong>:
                    </p>
                    {editCommentId === comment._id ? (
                      <input
                        type="text"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        className="comment-edit-input"
                      />
                    ) : (
                      <span>{comment.content.text}</span>
                    )}
                    {authUser.username === comment.user.username && (
                      <div className="comment-actions">
                        {editCommentId === comment._id ? (
                          <>
                            <button
                              onClick={handleSaveEdit}
                              className="save-button"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => setEditCommentId(null)}
                              className="cancel-button"
                            >
                              <FaTimes />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() =>
                                handleEditComment(
                                  comment._id,
                                  comment.content.text,
                                )
                              }
                              className="edit-button"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteComment(comment._id)}
                              className="delete-button"
                            >
                              <FaTrash />
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <span className="comment-timestamp">
                    {new Date(comment.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet</p>
      )}
      <AddComment postId={postId} />
    </div>
  );
};

CommentsList.propTypes = {
  postId: PropTypes.string.isRequired,
};
