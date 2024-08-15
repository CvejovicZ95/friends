import React, { useState } from "react";
import "./LoginPage.scss";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { useLoginUser } from "../../hooks/useUserRegisterLoginLogout"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const LoginPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const { loginHandler } = useLoginUser()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await loginHandler(username, password);
    }
    return (
        <div className="login-page-container">
            <div className="login-page">
                <p>Have an account?</p>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <FaUser className="icon" />
                        <input
                            placeholder="Username"
                            type="text"
                            name="Username"
                            className="input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <RiLockPasswordFill className="icon" />
                        <input
                            placeholder="Password"
                            type="password"
                            name="Password"
                            className="input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Login</button>
                    <p>Forgot password?</p>
                </form>
                <span className="register-link">
                    Don't have an account? <Link to="/register">Register here!</Link>
                </span>
            </div>
            <ToastContainer/>
        </div>
    );
};
