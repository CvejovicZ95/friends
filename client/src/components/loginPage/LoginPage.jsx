import React from "react";
import "./LoginPage.scss";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from 'react-router-dom';

export const LoginPage = () => {
    return (
        <div className="login-page-container">
            <div className="login-page">
                <p>Have an account?</p>
                <h1>Login</h1>
                <form>
                    <div className="input-container">
                        <FaUser className="icon" />
                        <input
                            placeholder="Username"
                            type="text"
                            name="Username"
                            className="input"
                        />
                    </div>
                    <div className="input-container">
                        <RiLockPasswordFill className="icon" />
                        <input
                            placeholder="Password"
                            type="password"
                            name="Password"
                            className="input"
                        />
                    </div>
                    <button>Login</button>
                    <p>Forgot password?</p>
                </form>
                <span className="register-link">
                    Don't have an account? <Link to="/register">Register here!</Link>
                </span>
            </div>
        </div>
    );
};
