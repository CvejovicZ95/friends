import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllUsers } from "../api/userApi";

export const useGetUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const data = await getAllUsers();
                setUsers(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return { users, loading };
};