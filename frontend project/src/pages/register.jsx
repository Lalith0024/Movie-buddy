import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
// import {jwt_decode} from "jwt-decode";
// import jwt_decode from "jwt-decode";
import * as jwt_decode from "jwt-decode";

import "/Users/kasulalalithendra/Desktop/react project/frontend project/src/css/Register.css";

const Register = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

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

  const handleNext = () => {
    if (step === 1 && isEmailValid) setStep(2);
    else if (step === 2 && isUsernameValid) setStep(3);
    else if (step === 3 && isPasswordStrong) setStep(4);
    else if (step === 4 && doPasswordsMatch && acceptedTerms) {
      localStorage.setItem("registeredUser", username);
      localStorage.setItem("registeredPass", password);
      navigate("/home");
    }
  };

  const handleGoogleSuccess = (response) => {
    try {
      // const decoded = jwt_decode(response.credential);
      const decoded = jwt_decode.default(response.credential);
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
          <div className={`input-box ${email && !isEmailValid ? "error" : ""}`}>
            <label>Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {email && <span className="tooltip">{isEmailValid ? "✅ Valid" : "❌ Invalid email"}</span>}
          </div>
        );
      case 2:
        return (
          <div className={`input-box ${username && !isUsernameValid ? "error" : ""}`}>
            <label>Username</label>
            <input
              type="text"
              placeholder="Minimum 4 characters"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {username && <span className="tooltip">{isUsernameValid ? "✅ Valid" : "❌ Too short"}</span>}
          </div>
        );
      case 3:
        return (
          <div className={`input-box ${password && !isPasswordStrong ? "error" : ""}`}>
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={getPasswordStrength()}
              />
              <span className="toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            {password && (
              <span className={`tooltip ${getPasswordStrength()}`}>
                {isPasswordStrong
                  ? "✅ Strong password"
                  : "❌ Use 6+ chars, 1 uppercase, 1 special"}
              </span>
            )}
          </div>
        );
      case 4:
        return (
          <>
            <div className={`input-box ${confirmPass && !doPasswordsMatch ? "error" : ""}`}>
              <label>Confirm Password</label>
              <div className="password-wrapper">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                />
                <span className="toggle" onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? "Hide" : "Show"}
                </span>
              </div>
              {confirmPass && (
                <span className="tooltip">
                  {doPasswordsMatch ? "✅ Match" : "❌ Does not match"}
                </span>
              )}
            </div>
            <div className="terms-box">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={() => setAcceptedTerms(!acceptedTerms)}
              />
              <label>I accept Terms & Conditions</label>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="register-page">
      <div className="bg-img" />
      <form className="register-form" onSubmit={(e) => e.preventDefault()} data-step={step}>
        <h2>{step < 4 ? "Register Now" : "Confirm Details"}</h2>
        {renderStep()}
        <button
          type="button"
          onClick={handleNext}
          disabled={
            (step === 1 && !isEmailValid) ||
            (step === 2 && !isUsernameValid) ||
            (step === 3 && !isPasswordStrong) ||
            (step === 4 && (!doPasswordsMatch || !acceptedTerms))
          }
        >
          {step < 4 ? "Next →" : "Register"}
        </button>

        <div className="separator">or</div>

        <div className="auth-buttons">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert("Google Login Failed")}
          />
          <div className="guest-button" onClick={handleGuest}>
            Continue as Guest
          </div>
        </div>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
