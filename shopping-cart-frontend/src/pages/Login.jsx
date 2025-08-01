import React, { useState } from "react";
import { loginUser } from "../api/api";
import "../styles/login.css"; // 👈 Add this

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ username, password });
      const token = res.data.token;
      localStorage.setItem("token", token);
      onLogin(token);
    } catch (err) {
      alert("Invalid username/password");
     console.error("Login error:", err);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>🛒 Shopping Cart Login</h2>
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
        <button type="submit">🔐 Login</button>
      </form>
    </div>
  );
};

export default Login;

