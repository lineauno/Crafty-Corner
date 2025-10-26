import React, { useState } from "react";
import "../styles/login.css";

    function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // 💾 Temporary hardcoded accounts
    const accounts = {
        admin: { username: "admin", password: "admin123" },
        user: { username: "user", password: "user123" },
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(""); // clear old error

        // 🧠 Check admin login
        if (username === accounts.admin.username && password === accounts.admin.password) {
        onLogin("admin");
        return;
        }

        // 🧠 Check user login
        if (username === accounts.user.username && password === accounts.user.password) {
        onLogin("user");
        return;
        }

        // ❌ Invalid credentials
        setError("Invalid username or password");
    };

    return (
        <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Welcome Back</h2>

            <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />

            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />

            {error && <p className="error-message">{error}</p>}

            <button type="submit">Login</button>
        </form>
        </div>
    );
    }

    export default Login;
