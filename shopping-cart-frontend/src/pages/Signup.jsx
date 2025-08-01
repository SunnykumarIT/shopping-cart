import React, { useState } from "react";
import { registerUser } from "../api/api";
import "../styles/login.css";

const Signup = ({ onSignupSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ username, password });
      alert("Signup successful! Now login.");
      onSignupSuccess();
    } catch (err) {
      alert("Username already exists or invalid input.");
        console.error("Signup error:", err);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSignup}>
        <h2>🚀 Create Account</h2>
        <input
          placeholder="Choose username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          placeholder="Choose password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">✅ Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
