import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getAllPosts,
  deletePost,
  addPost,
  updatePost,
  likePost,
} from "../api/postsApi";

export const useGetAllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(
    () => {
      const fetchPosts = async () => {
        setLoading(true);
        try {
          const data = await getAllPosts();
          setPosts(data);
        } catch (error) {
          toast.error(`Failed to load posts: ${error.message}`);
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchPosts();
    },
    [
      /*posts*/
    ],
  );
  //posts infinite loop

  const handleDeletePost = async (id) => {
    try {
      await deletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (error) {
      toast.error(`Failed to delete post: ${error.message}`);
      console.error(error);
    }
  };

  const handleAddPost = async (formData) => {
    try {
      const newPost = await addPost(formData);
      setPosts((prevPosts) => [...prevPosts, newPost]);
      return true;
    } catch (error) {
      toast.error(`Failed to add post: ${error.message}`);
      console.error(error);
      return false;
    }
  };

  const handleUpdatePost = async (postId, formData) => {
    try {
      const updatedPost = await updatePost(postId, formData);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post,
        ),
      );
      return true;
    } catch (error) {
      toast.error(`Failed to update post: ${error.message}`);
      console.error(error);
      return false;
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const updatedPost = await likePost(postId);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post,
        ),
      );
      return true;
    } catch (error) {
      toast.error(`Failed to like post: ${error.message}`);
      console.error(error);
      return false;
    }
  };

  return {
    posts,
    loading,
    handleDeletePost,
    handleAddPost,
    handleUpdatePost,
    handleLikePost,
  };
};
