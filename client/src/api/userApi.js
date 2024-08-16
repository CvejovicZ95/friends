const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const registerUser = async (formData) => {
    try {
        const res = await fetch(`${apiUrl}/api/registerUser`, {
            method: "POST",
            body: formData,
        })

        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            const errorData = await res.json()
            throw new Error(errorData.error || "Error while creating account")
        }
    } catch (error) {
        throw new Error(error.message || 'Error while creating account')
    }
}

export const loginUser = async (username, password) => {
    try {
        const res = await fetch(`${apiUrl}/api/loginUser`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
            credentials: "include",
        })

        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            const errorData = await res.json()
            throw new Error(errorData.error || "Error while logging in")
        }
    } catch (error){
        throw new Error(error.message || 'Error while logging in')
    }
}

export const logoutUser = async () => {
    try {
        const res = await fetch(`${apiUrl}/api/logoutUser`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}