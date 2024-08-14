import React from "react";
import "./RegisterPage.scss";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom'

export const RegisterPage = () => {
    return (
        <div className="register-page">
            <h1>Create an Account</h1>
            <form>
                <div className="input-container">
                    <FaEnvelope className="icon" />
                    <input
                        placeholder="Email"
                        type="email"
                        name="Email"
                        className="input"
                    />
                </div>
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
                    <FaLock className="icon" />
                    <input
                        placeholder="Password"
                        type="password"
                        name="Password"
                        className="input"
                    />
                </div>
                <div className="input-container">
                    <FaLock className="icon" />
                    <input
                        placeholder="Confirm Password"
                        type="password"
                        name="ConfirmPassword"
                        className="input"
                    />
                </div>
                <button>Create Account</button>
            </form>
            <p className="login-link">
                Already have an account? <Link to="/">Login here!</Link>
            </p>
        </div>
    );
};
