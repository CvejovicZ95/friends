const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const getAllPosts = async () => {
    try {
        const res = await fetch(`${apiUrl}/api/posts`)
        const data = await res.json()
        if (data.error) {
            throw new Error(data.error)
        }
        return data
    } catch (error) {
        throw new Error(error.message)
    }
}