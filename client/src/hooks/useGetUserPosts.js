import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getPostsByUser } from '../api/postsApi';

export const useGetUserPosts = (username) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserPosts = async () => {
            setLoading(true);
            try {
                const data = await getPostsByUser(username);
                setPosts(data);
            } catch (error) {
                toast.error(`Failed to load user's posts: ${error.message}`);
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchUserPosts();
        }
    }, [username]);

    return { posts, loading };
};
