import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import API_BASE_URL from '../../../config/api.js';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const response = await fetch(`${API_BASE_URL}/api/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            }),
        });

        if(response.status === 400){
            setError("Invalid email or password. Please try again.");
        }else{
            const json = await response.json();
            if(json.success){
                localStorage.setItem("token", json.token);
                navigate("/");
                window.location.reload();
            }
        }
       
       
    
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const [isShown, setIsShown] = useState(false);

    // This function is called when the checkbox is checked or unchecked
    const togglePassword = () => {
        setIsShown((isShown) => !isShown);
    };
    return (
        <div className="main-div">
            <h1 className="section-title poppins-semibold">Log In to continue</h1>
            {error && <p role="alert" style={{ color: "#c0392b", fontWeight: 600 }}>{error}</p>}
            <form
                onSubmit={handleSubmit}
                className="login-signup-form"
            >

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
                    placeholder="Enter your password…"
                    autoComplete="current-password"
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
                <hr />
                <div className="form-flex">
                    <Link to="/forgot_password">Forgot Password?</Link>
                    <p>
                        Don't have an account ? <Link to="/signup"> Create here</Link>
                    </p>
                </div>
                <button type="submit" id="login-btn">
                    Log In
                </button>
            </form>
        </div>
    );
};

export default Login;