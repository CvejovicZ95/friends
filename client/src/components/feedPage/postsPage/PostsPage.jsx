import React from 'react';
import "./PostsPage.scss"
import { FaThumbsUp, FaComment, FaEllipsisV } from 'react-icons/fa';

export const PostsPage = () => {
    return (
        <div className="posts-page">
            <div className="posts-feed">
                {/* Početak jednog statičkog posta */}
                <div className="post-item">
                    <div className="post-header">
                        <div className="post-user-info">
                            <img src="/path/to/user/photo.jpg" alt="User Name" className="post-user-photo" />
                            <span className="post-username">User Name</span>
                        </div>
                        <div className="post-menu">
                            <FaEllipsisV />
                            <div className="dropdown-menu">
                                <span>Edit</span>
                                <span>Delete</span>
                            </div>
                        </div>
                    </div>
                    <div className="post-content">
                        <p>Ovo je sadržaj posta. Može da bude tekst, linkovi ili bilo koji drugi tip sadržaja.</p>
                        <img src="../../../../assets/images/background.png" alt="Post" className="post-image" />
                    </div>
                    <div className="post-footer">
                        <div className="post-actions">
                            <div className="like-action">
                                <FaThumbsUp className="action-icon" />
                                <span className="like-count">42</span>
                            </div>
                            <div className="comment-action">
                                <FaComment className="action-icon" />
                                <span className="comment-count">12</span>
                            </div>
                        </div>
                        <span className="post-timestamp">2 hours ago</span>
                    </div>
                </div>
                {/* Kraj jednog statičkog posta */}



                {/* Početak jednog statičkog posta */}
                <div className="post-item">
                    <div className="post-header">
                        <div className="post-user-info">
                            <img src="/path/to/user/photo.jpg" alt="User Name" className="post-user-photo" />
                            <span className="post-username">User Name</span>
                        </div>
                        <div className="post-menu">
                            <FaEllipsisV />
                            <div className="dropdown-menu">
                                <span>Edit</span>
                                <span>Delete</span>
                            </div>
                        </div>
                    </div>
                    <div className="post-content">
                        <p>Ovo je sadržaj posta. Može da bude tekst, linkovi ili bilo koji drugi tip sadržaja.</p>
                        <img src="../../../../assets/images/background.png" alt="Post" className="post-image" />
                    </div>
                    <div className="post-footer">
                        <div className="post-actions">
                            <div className="like-action">
                                <FaThumbsUp className="action-icon" />
                                <span className="like-count">42</span>
                            </div>
                            <div className="comment-action">
                                <FaComment className="action-icon" />
                                <span className="comment-count">12</span>
                            </div>
                        </div>
                        <span className="post-timestamp">2 hours ago</span>
                    </div>
                </div>
                {/* Kraj jednog statičkog posta */}
                {/* Početak jednog statičkog posta */}
                <div className="post-item">
                    <div className="post-header">
                        <div className="post-user-info">
                            <img src="/path/to/user/photo.jpg" alt="User Name" className="post-user-photo" />
                            <span className="post-username">User Name</span>
                        </div>
                        <div className="post-menu">
                            <FaEllipsisV />
                            <div className="dropdown-menu">
                                <span>Edit</span>
                                <span>Delete</span>
                            </div>
                        </div>
                    </div>
                    <div className="post-content">
                        <p>Ovo je sadržaj posta. Može da bude tekst, linkovi ili bilo koji drugi tip sadržaja.</p>
                        <img src="../../../../assets/images/background.png" alt="Post" className="post-image" />
                    </div>
                    <div className="post-footer">
                        <div className="post-actions">
                            <div className="like-action">
                                <FaThumbsUp className="action-icon" />
                                <span className="like-count">42</span>
                            </div>
                            <div className="comment-action">
                                <FaComment className="action-icon" />
                                <span className="comment-count">12</span>
                            </div>
                        </div>
                        <span className="post-timestamp">2 hours ago</span>
                    </div>
                </div>
                {/* Kraj jednog statičkog posta */}
                {/* Početak jednog statičkog posta */}
                <div className="post-item">
                    <div className="post-header">
                        <div className="post-user-info">
                            <img src="/path/to/user/photo.jpg" alt="User Name" className="post-user-photo" />
                            <span className="post-username">User Name</span>
                        </div>
                        <div className="post-menu">
                            <FaEllipsisV />
                            <div className="dropdown-menu">
                                <span>Edit</span>
                                <span>Delete</span>
                            </div>
                        </div>
                    </div>
                    <div className="post-content">
                        <p>Ovo je sadržaj posta. Može da bude tekst, linkovi ili bilo koji drugi tip sadržaja.</p>
                        <img src="../../../../assets/images/background.png" alt="Post" className="post-image" />
                    </div>
                    <div className="post-footer">
                        <div className="post-actions">
                            <div className="like-action">
                                <FaThumbsUp className="action-icon" />
                                <span className="like-count">42</span>
                            </div>
                            <div className="comment-action">
                                <FaComment className="action-icon" />
                                <span className="comment-count">12</span>
                            </div>
                        </div>
                        <span className="post-timestamp">2 hours ago</span>
                    </div>
                </div>
                {/* Kraj jednog statičkog posta */}
                {/* Početak jednog statičkog posta */}
                <div className="post-item">
                    <div className="post-header">
                        <div className="post-user-info">
                            <img src="/path/to/user/photo.jpg" alt="User Name" className="post-user-photo" />
                            <span className="post-username">User Name</span>
                        </div>
                        <div className="post-menu">
                            <FaEllipsisV />
                            <div className="dropdown-menu">
                                <span>Edit</span>
                                <span>Delete</span>
                            </div>
                        </div>
                    </div>
                    <div className="post-content">
                        <p>Ovo je sadržaj posta. Može da bude tekst, linkovi ili bilo koji drugi tip sadržaja.</p>
                        <img src="../../../../assets/images/background.png" alt="Post" className="post-image" />
                    </div>
                    <div className="post-footer">
                        <div className="post-actions">
                            <div className="like-action">
                                <FaThumbsUp className="action-icon" />
                                <span className="like-count">42</span>
                            </div>
                            <div className="comment-action">
                                <FaComment className="action-icon" />
                                <span className="comment-count">12</span>
                            </div>
                        </div>
                        <span className="post-timestamp">2 hours ago</span>
                    </div>
                </div>
                {/* Kraj jednog statičkog posta */}
                {/* Početak jednog statičkog posta */}
                <div className="post-item">
                    <div className="post-header">
                        <div className="post-user-info">
                            <img src="/path/to/user/photo.jpg" alt="User Name" className="post-user-photo" />
                            <span className="post-username">User Name</span>
                        </div>
                        <div className="post-menu">
                            <FaEllipsisV />
                            <div className="dropdown-menu">
                                <span>Edit</span>
                                <span>Delete</span>
                            </div>
                        </div>
                    </div>
                    <div className="post-content">
                        <p>Ovo je sadržaj posta. Može da bude tekst, linkovi ili bilo koji drugi tip sadržaja.</p>
                        <img src="../../../../assets/images/background.png" alt="Post" className="post-image" />
                    </div>
                    <div className="post-footer">
                        <div className="post-actions">
                            <div className="like-action">
                                <FaThumbsUp className="action-icon" />
                                <span className="like-count">42</span>
                            </div>
                            <div className="comment-action">
                                <FaComment className="action-icon" />
                                <span className="comment-count">12</span>
                            </div>
                        </div>
                        <span className="post-timestamp">2 hours ago</span>
                    </div>
                </div>
                {/* Kraj jednog statičkog posta */}

                
            </div>
        </div>
    );
};

