import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getPostsByUser } from '../api/postsApi';

export const useGetUserPosts = (userId) => {
    const [posts, setPosts] = useState([]);  // Initialize as empty array
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserPosts = async () => {
            if (!userId) return;  // Ensure userId is defined before making the request
            setLoading(true);
            try {
                const data = await getPostsByUser(userId);
                // Ensure that the data is always an array
                setPosts(Array.isArray(data) ? data : []);
            } catch (error) {
                toast.error(`Failed to load user's posts: ${error.message}`);
                console.error(error);
                setPosts([]);  // Set to empty array in case of an error
            } finally {
                setLoading(false);
            }
        };

        fetchUserPosts();  // Fetch posts when userId is available

    }, [userId]);

    return { posts, loading };
};
