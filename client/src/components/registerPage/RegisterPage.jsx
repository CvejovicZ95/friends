import React, { useState } from "react";
import "./RegisterPage.scss";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useRegisterUser } from "../../hooks/useUserRegisterLoginLogout";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const { registerHandler } = useRegisterUser();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        const success = await registerHandler(email, username, password); 
        if (success) {
            setTimeout(()=>{
                navigate("/");
            },3500)
            
        }  
    };

    return (
        <div className="register-page-container">
            <div className="register-page">
                <h1>Create an Account</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <FaEnvelope className="icon" />
                        <input
                            placeholder="Email"
                            type="email"
                            name="Email"
                            className="input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
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
                        <FaLock className="icon" />
                        <input
                            placeholder="Password"
                            type="password"
                            name="Password"
                            className="input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <FaLock className="icon" />
                        <input
                            placeholder="Confirm Password"
                            type="password"
                            name="ConfirmPassword"
                            className="input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Create Account</button>
                </form>
                <p className="login-link">
                    Already have an account? <Link to="/">Login here!</Link>
                </p>
            </div>
            <ToastContainer/>
        </div>
    );
};
