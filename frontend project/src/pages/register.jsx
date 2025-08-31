import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "../css/Register.css";

const Register = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  // Validation display states
  const [showEmailValidation, setShowEmailValidation] = useState(false);
  const [showUsernameValidation, setShowUsernameValidation] = useState(false);
  const [showPasswordValidation, setShowPasswordValidation] = useState(false);
  const [showConfirmValidation, setShowConfirmValidation] = useState(false);

  const navigate = useNavigate();
  
  // Refs for debouncing
  const emailTimeoutRef = useRef(null);
  const usernameTimeoutRef = useRef(null);
  const passwordTimeoutRef = useRef(null);
  const confirmTimeoutRef = useRef(null);

  const isEmailValid = email.includes("@") && email.includes(".");
  const isUsernameValid = username.length >= 4;
  const isPasswordStrong =
    password.length >= 6 && /[A-Z]/.test(password) && /[!@#$%^&*]/.test(password);
  const doPasswordsMatch = password === confirmPass;

  const getPasswordStrength = () => {
    if (isPasswordStrong) return "strong";
    else if (password.length >= 4) return "medium";
    return "weak";
  };

  // Debounced validation functions
  const debounceValidation = (value, validationFunc, setShowValidation, timeoutRef) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (value.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setShowValidation(true);
      }, 800); // Show validation after 800ms of no typing
    } else {
      setShowValidation(false);
    }
  };

  // Handle input changes with debouncing
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    debounceValidation(value, isEmailValid, setShowEmailValidation, emailTimeoutRef);
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    debounceValidation(value, isUsernameValid, setShowUsernameValidation, usernameTimeoutRef);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    debounceValidation(value, isPasswordStrong, setShowPasswordValidation, passwordTimeoutRef);
  };

  const handleConfirmChange = (e) => {
    const value = e.target.value;
    setConfirmPass(value);
    debounceValidation(value, doPasswordsMatch, setShowConfirmValidation, confirmTimeoutRef);
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (emailTimeoutRef.current) clearTimeout(emailTimeoutRef.current);
      if (usernameTimeoutRef.current) clearTimeout(usernameTimeoutRef.current);
      if (passwordTimeoutRef.current) clearTimeout(passwordTimeoutRef.current);
      if (confirmTimeoutRef.current) clearTimeout(confirmTimeoutRef.current);
    };
  }, []);

  const handleNext = () => {
    if (step === 1 && isEmailValid) {
      setStep(2);
    }
    else if (step === 2 && isUsernameValid) {
      setStep(3);
    }
    else if (step === 3 && isPasswordStrong) {
      setStep(4);
    }
    else if (step === 4 && doPasswordsMatch && acceptedTerms) {
      localStorage.setItem("registeredUser", username);
      localStorage.setItem("registeredPass", password);
      setTimeout(() => {
        navigate("/home");
      }, 1000);
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

  const handleGuest = () => {
    localStorage.setItem("registeredUser", "guest@123");
    localStorage.setItem("registeredPass", "123");
    navigate("/home");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className={`input-group ${showEmailValidation && email && !isEmailValid ? "error" : ""}`}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={handleEmailChange}
              className="form-input"
            />
            <div className="input-icon">📧</div>
            <span className={`tooltip ${showEmailValidation && email ? 'show' : ''}`}>
              {isEmailValid ? "✅ Valid" : "❌ Invalid email"}
            </span>
          </div>
        );
      case 2:
        return (
          <div className={`input-group ${showUsernameValidation && username && !isUsernameValid ? "error" : ""}`}>
            <input
              type="text"
              placeholder="Username (min 4 characters)"
              value={username}
              onChange={handleUsernameChange}
              className="form-input"
            />
            <div className="input-icon">👤</div>
            <span className={`tooltip ${showUsernameValidation && username ? 'show' : ''}`}>
              {isUsernameValid ? "✅ Valid" : "❌ Too short"}
            </span>
          </div>
        );
      case 3:
        return (
          <div className={`input-group ${showPasswordValidation && password && !isPasswordStrong ? "error" : ""}`}>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Strong password"
                value={password}
                onChange={handlePasswordChange}
                className={`form-input ${getPasswordStrength()}`}
              />
              <div className="input-icon">🔒</div>
              <button 
                type="button"
                className="toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <span className={`tooltip ${getPasswordStrength()} ${showPasswordValidation && password ? 'show' : ''}`}>
              {isPasswordStrong
                ? "✅ Strong password"
                : "❌ Use 6+ chars, 1 uppercase, 1 special"}
            </span>
          </div>
        );
      case 4:
        return (
          <>
            <div className={`input-group ${showConfirmValidation && confirmPass && !doPasswordsMatch ? "error" : ""}`}>
              <div className="password-wrapper">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPass}
                  onChange={handleConfirmChange}
                  className="form-input"
                />
                <div className="input-icon">🔐</div>
                <button 
                  type="button"
                  className="toggle-btn"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? "Hide" : "Show"}
                </button>
              </div>
              <span className={`tooltip ${showConfirmValidation && confirmPass ? 'show' : ''}`}>
                {doPasswordsMatch ? "✅ Match" : "❌ Does not match"}
              </span>
            </div>
            <div className="terms-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={() => setAcceptedTerms(!acceptedTerms)}
                  className="checkbox-input"
                />
                <span className="checkmark"></span>
                I accept Terms & Conditions
              </label>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="register-page">
      {/* Left Side - Hero Section */}
      <div className="register-hero">
        <div className="hero-content">
          <div className="hero-icon">🌟</div>
          <h1>Join Movie Buddy</h1>
          <p>Start your cinematic adventure today</p>
          <div className="hero-features">
            <div className="feature">
              <span className="feature-icon">🎬</span>
              <span>Access to millions of movies</span>
            </div>
            <div className="feature">
              <span className="feature-icon">💫</span>
              <span>Personalized recommendations</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🚀</span>
              <span>Create your watchlist</span>
            </div>
          </div>
        </div>
        <div className="hero-background">
          <div className="gradient-overlay"></div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="register-section">
        <div className="register-container">
          <div className="register-header">
            <h2>{step < 4 ? "Create Account" : "Confirm Details"}</h2>
            <p>Step {step} of 4</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(step / 4) * 100}%` }}></div>
            </div>
          </div>

          <form className="register-form" onSubmit={(e) => e.preventDefault()} data-step={step}>
            <div className="form-content">
              {renderStep()}
            </div>
            
            <div className="form-bottom">
              <button
                type="button"
                onClick={handleNext}
                disabled={
                  (step === 1 && !isEmailValid) ||
                  (step === 2 && !isUsernameValid) ||
                  (step === 3 && !isPasswordStrong) ||
                  (step === 4 && (!doPasswordsMatch || !acceptedTerms))
                }
                className="next-btn"
              >
                {step < 4 ? "Next Step →" : "Create Account"}
              </button>

              <div className="divider">
                <span>or continue with</span>
              </div>

              <div className="auth-options">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => alert("Google Login Failed")}
                  className="google-btn"
                />
                <button 
                  type="button" 
                  className="guest-btn"
                  onClick={handleGuest}
                >
                  Continue as Guest
                </button>
              </div>

              <div className="login-link">
                <p>Already have an account? <Link to="/">Sign in</Link></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;