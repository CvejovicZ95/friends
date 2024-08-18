import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getAllPosts } from '../api/postsApi'

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

    return { posts, loading}
}