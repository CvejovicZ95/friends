import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getPostsByUser } from '../api/postsApi';

export const useGetUserPosts = (userId) => {  
    const [posts, setPosts] = useState([]);  
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserPosts = async () => {
            if (!userId) return; 
            setLoading(true);
            try {
                const data = await getPostsByUser(userId);
                setPosts(Array.isArray(data) ? data : []);
            } catch (error) {
                toast.error(`Failed to load user's posts: ${error.message}`);
                console.error(error);
                setPosts([]); 
            } finally {
                setLoading(false);
            }
        };

        fetchUserPosts();

    }, [userId]);

    return { posts, loading };
};
