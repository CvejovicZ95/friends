import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getAllPosts, deletePost } from '../api/postsApi'

export const useGetAllPosts = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=> {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const data = await getAllPosts()
                setPosts(data)
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchPosts()
    },[])

    const handleDeletePost = async (id) => {
        try {
            await deletePost(id);
            setPosts((prevPosts) => {
                const updatedPosts = prevPosts.filter((post) => post._id !==id);
                return updatedPosts
            })
        } catch (error) {
            toast.error(error.message)
        }
    }

    return { posts, loading, handleDeletePost}
}