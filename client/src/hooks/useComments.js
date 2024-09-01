import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getAllComments } from '../api/commentsApi';

export const useGetAllComments = (postId) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true);
            try {
                const data = await getAllComments(postId);
                setComments(data);
            } catch (error) {
                toast.error(`Failed to load comments: ${error.message}`);
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [postId]);

    return { comments, loading };
};
