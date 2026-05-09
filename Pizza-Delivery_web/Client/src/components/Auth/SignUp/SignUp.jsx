import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import API_BASE_URL from '../../../config/api.js';

const SignUp = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", address: "" });
    let navigate = useNavigate();

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const response = await fetch(`${API_BASE_URL}/api/user/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                address: credentials.address
            }),
        });
        if(response.status===400){
            setError("Sign up failed. Please check your details and try again.");
        }else{
            const json = await response.json();
            if (json.success) {
                alert("Signed Up successfully!")
    
                navigate("/login");
            }
        }

        setCredentials({ name: "", email: "", password: "", address: "" });
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const [isShown, setIsSHown] = useState(false);

    // This function is called when the checkbox is checked or unchecked
    const togglePassword = () => {
        setIsSHown((isShown) => !isShown);
    };
    return (
        <>
            <div className="main-div">
                <h1 className="section-title poppins-semibold">Sign Up</h1>
                {error && <p role="alert" style={{ color: "#c0392b", fontWeight: 600 }}>{error}</p>}
                <form
                    onSubmit={handleSubmit}
                    className="login-signup-form"
                >

                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        value={credentials.name}
                        onChange={onChange}
                        id="name"
                        name="name"
                        placeholder="Enter your name…"
                        autoComplete="name"
                        required
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        value={credentials.email}
                        onChange={onChange}
                        id="email"
                        name="email"
                        placeholder="Enter your email…"
                        autoComplete="email"
                        spellCheck={false}
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type={isShown ? "text" : "password"}
                        className="form-control"
                        value={credentials.password}
                        onChange={onChange}
                        name="password"
                        id="password"
                        placeholder="Minimum 8 characters…"
                        autoComplete="new-password"
                        minLength={8}
                        required
                    />

                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="passcheck"
                            checked={isShown}
                            onChange={togglePassword}
                        />
                        &nbsp;
                        <label className="form-check-label" htmlFor="passcheck">
                            Show Password
                        </label>
                    </div>

                    <label htmlFor="address">Delivery Address</label>
                    <textarea name="address" id="address" value={credentials.address} placeholder='Enter your delivery address…' autoComplete="street-address" onChange={onChange} required></textarea>
                    <hr />

                    <p>
                        Already have an account ? <Link to="/login">LogIn</Link>
                    </p>

                    <button type="submit" id="signup-btn">
                        Sign Up
                    </button>
                </form>
            </div>
        </>
    )
}

export default SignUp