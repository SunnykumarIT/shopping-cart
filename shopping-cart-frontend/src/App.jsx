import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Items from "./pages/Items";
import "./styles/login.css"; // ✅ Use same CSS for page centering

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [showSignup, setShowSignup] = useState(false);

  if (token) return <Items token={token} />;

  return (
    <div className="login-container">
      <div className="login-box">
        {showSignup ? (
          <>
            <Signup onSignupSuccess={() => setShowSignup(false)} />
            <button
              onClick={() => setShowSignup(false)}
              className="switch-btn"
            >
              🔙 Back to Login
            </button>
          </>
        ) : (
          <>
            <Login onLogin={(t) => setToken(t)} />
            <button
              onClick={() => setShowSignup(true)}
              className="switch-btn"
            >
              🆕 Create an Account
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;


