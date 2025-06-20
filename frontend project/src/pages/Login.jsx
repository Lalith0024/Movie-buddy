// Login.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
// import jwt_decode from "jwt-decode";
import "../css/login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [error, setError] = useState("");
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

    if (username === storedUser && password === storedPass) {
      alert("Login successful!");
      navigate("/home");
    } else {
      setError("Invalid credentials. Try registering first.");
    }
  };

  const handleGuestLogin = () => {
    alert("Logged in as Guest!");
    navigate("/home");
  };

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwt_decode(credentialResponse.credential);
      console.log("Google User:", decoded);
      localStorage.setItem("googleUser", JSON.stringify(decoded));
      alert("Google Login Success!");
      navigate("/home");
    } catch (err) {
      console.error("Google login decode failed", err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left" />
      <div className="login-right">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Welcome Back</h2>
          {error && <p className="error-text">{error}</p>}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={error ? "error-border" : ""}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={error ? "error-border" : ""}
            required
          />
          <label className="terms">
            <input
              type="checkbox"
              checked={termsChecked}
              onChange={() => setTermsChecked(!termsChecked)}
            />
            I accept the Terms and Conditions
          </label>

          <button type="submit">Login</button>

          <div className="social-login">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => alert("Google login failed")}
            />
          </div>

          <p className="guest-text">
            or continue as{" "}
            <span className="guest-link" onClick={handleGuestLogin}>
              Guest
            </span>
          </p>

          <p className="register-text">
            Don’t have an account?{" "}
            <Link to="/register" className="register-link">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
