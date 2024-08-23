import { useState, useEffect } from "react";
import { getUserProfile } from "../api/userApi";

export const useUserProfile = (username) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUserProfile(username);
                if (data && data.username) {
                    setUser(data);
                } else {
                    setUser(null);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchUser();
        }
    }, [username]);

    return { user, loading, error };
};