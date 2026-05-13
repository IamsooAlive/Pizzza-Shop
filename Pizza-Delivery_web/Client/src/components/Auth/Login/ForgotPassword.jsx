import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import API_BASE_URL from '../../../config/api.js';
import { parseApiResponse } from '../../../utils/api.js';

const token = localStorage.getItem("token");

const ForgotPassword = () => {
    const [searchParams] = useSearchParams();
    const resetToken = searchParams.get("token");
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isShown, setIsShown] = useState(false);
    const [resetError, setResetError] = useState("");

    useEffect(() => {
        if (token) navigate("/");
    }, []);

    const handleRequestReset = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch(`${API_BASE_URL}/api/user/request_password_reset`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            await parseApiResponse(response, "Something went wrong. Please try again.");
            setSent(true);
        } catch (requestError) {
            setError(requestError.message);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setResetError("");
        if (password !== confirmPassword) {
            setResetError("Passwords do not match.");
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/api/user/forgot_password`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ resetToken, password }),
            });
            await parseApiResponse(response, "Reset link is invalid or has expired. Please request a new one.");
            navigate("/login");
        } catch (requestError) {
            setResetError(requestError.message);
        }
    };

    // Step 3: token in URL — show new password form
    if (resetToken) {
        return (
            <div className="main-div">
                <h1 className="section-title poppins-semibold">Set New Password</h1>
                {resetError && <p role="alert" style={{ color: "#c0392b", fontWeight: 600, textAlign: "center" }}>{resetError}</p>}
                <form onSubmit={handleResetPassword} className="login-signup-form">
                    <label htmlFor="password">New Password</label>
                    <input
                        type={isShown ? "text" : "password"}
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Minimum 8 characters…"
                        autoComplete="new-password"
                        minLength={8}
                        required
                    />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type={isShown ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repeat your new password…"
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
                            onChange={() => setIsShown(v => !v)}
                        />
                        &nbsp;
                        <label className="form-check-label" htmlFor="passcheck">Show Password</label>
                    </div>
                    <button type="submit" id="edit-details-btn">Set New Password</button>
                </form>
            </div>
        );
    }

    // Step 2: email sent — confirmation message
    if (sent) {
        return (
            <div className="main-div">
                <h1 className="section-title poppins-semibold">Check Your Email</h1>
                <p style={{ textAlign: "center" }}>
                    A password reset link has been sent to <strong>{email}</strong>. It expires in 15&nbsp;minutes.
                </p>
            </div>
        );
    }

    // Step 1: enter email
    return (
        <div className="main-div">
            <h1 className="section-title poppins-semibold">Forgot Password</h1>
            {error && <p role="alert" style={{ color: "#c0392b", fontWeight: 600, textAlign: "center" }}>{error}</p>}
            <form onSubmit={handleRequestReset} className="login-signup-form">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email…"
                    autoComplete="email"
                    spellCheck={false}
                    required
                />
                <button type="submit" id="verify-email-btn">Send Reset Link</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
