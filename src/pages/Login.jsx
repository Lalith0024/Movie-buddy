import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "../css/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (!termsChecked) {
      setError("Please accept the terms and conditions");
      return;
    }

    // Check if user exists in localStorage
    const registeredUser = localStorage.getItem("registeredUser");
    const registeredPass = localStorage.getItem("registeredPass");

    if (username === registeredUser && password === registeredPass) {
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } else {
      setError("Invalid username or password");
    }
  };

  const handleGoogleSuccess = (response) => {
    try {
      const decoded = jwtDecode(response.credential);
      console.log("Google User:", decoded);
      localStorage.setItem("googleUser", JSON.stringify(decoded));
      navigate("/home");
    } catch (err) {
      console.error("Google login decode failed", err);
    }
  };

  const handleGuestLogin = () => {
    localStorage.setItem("registeredUser", "guest@123");
    localStorage.setItem("registeredPass", "123");
    navigate("/home");
  };

  return (
    <div className="login-page">
      {/* Left Side - Hero Section */}
      <div className="login-hero">
        <div className="hero-content">
          <div className="hero-icon">🎬</div>
          <h1>Movie Buddy</h1>
          <p>Your personal movie companion</p>
          <div className="hero-features">
            <div className="feature">
              <span className="feature-icon">🎭</span>
              <span>Discover new movies</span>
            </div>
            <div className="feature">
              <span className="feature-icon">❤️</span>
              <span>Save favorites</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🔍</span>
              <span>Smart search</span>
            </div>
          </div>
        </div>
        <div className="hero-background">
          <div className="gradient-overlay"></div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="login-section">
        <div className="login-container">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Sign in to continue your movie journey</p>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-content">
              {error && <div className="error-message">{error}</div>}
              
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-input"
                />
                <div className="input-icon">👤</div>
              </div>

              <div className="input-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                />
                <div className="input-icon">🔒</div>
              </div>

              <div className="terms-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={termsChecked}
                    onChange={() => setTermsChecked(!termsChecked)}
                    className="checkbox-input"
                  />
                  <span className="checkmark"></span>
                  I accept Terms & Conditions
                </label>
              </div>
            </div>

            <div className="form-bottom">
              <button type="submit" className="login-btn">Sign In</button>
              
              <div className="divider">
                <span>or continue with</span>
              </div>

              <div className="auth-options">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => alert("Google login failed")}
                  className="google-btn"
                />
                <button type="button" className="guest-btn" onClick={handleGuestLogin}>
                  Continue as Guest
                </button>
              </div>

              <div className="register-link">
                <p>Don't have an account? <Link to="/register">Sign up</Link></p>
              </div>
            </div>
          </form>
        </div>

        {showSuccess && (
          <div className="success-popup">
            <div className="popup-content">
              <div className="popup-icon">🎉</div>
              <h3>Login Successful!</h3>
              <p>Welcome back to Movie Buddy!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
