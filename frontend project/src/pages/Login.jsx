import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import * as jwt_decode from "jwt-decode";
import "../css/Register.css"; // Reuse Register styles

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [error, setError] = useState("");
  const [showGuestPopup, setShowGuestPopup] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!termsChecked) {
      setError("You must accept the Terms and Conditions.");
      return;
    }

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    const storedUser = localStorage.getItem("registeredUser");
    const storedPass = localStorage.getItem("registeredPass");

    if (
      (username === storedUser && password === storedPass) ||
      (username === "guest@123" && password === "123")
    ) {
      navigate("/home");
    } else {
      setError("Invalid credentials. Try registering first.");
    }
  };

  const handleGuestLogin = () => {
    setUsername("guest@123");
    setPassword("123");
    setTermsChecked(true);
    setShowGuestPopup(true);
    setTimeout(() => {
      setShowGuestPopup(false);
      document.querySelector("form").requestSubmit();
    }, 1500);
  };

  const handleGoogleSuccess = (response) => {
    try {
      const decoded = jwt_decode.default(response.credential);
      localStorage.setItem("googleUser", JSON.stringify(decoded));
      navigate("/home");
    } catch (err) {
      console.error("Google login decode failed", err);
    }
  };

  return (
    <div className="register-page">
      <div className="bg-img" />
      <form className="register-form" onSubmit={handleLogin}>
        <h2>Welcome back!</h2>

        {error && <p className="error-text">{error}</p>}

        <div className="input-box">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-box">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="terms-box">
          <input
            type="checkbox"
            checked={termsChecked}
            onChange={() => setTermsChecked(!termsChecked)}
          />
          <label>I accept Terms & Conditions</label>
        </div>

        <button type="submit">Login</button>

        <div className="separator">or</div>

        <div className="auth-buttons">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert("Google login failed")}
          />
          <div className="guest-button" onClick={handleGuestLogin}>
            Continue as Guest
          </div>
        </div>

        <p className="login-link">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </form>

      {showGuestPopup && (
        <div className="popup-message">🎉 Guest Login Activated! Redirecting...</div>
      )}
    </div>
  );
}

export default Login;
