import React, { useState } from "react";
import Navbar from "../components/navbar.jsx";
import "../css/contact.css";
import { FaLinkedin, FaTwitter, FaPhone, FaEnvelope, FaGithub, FaFileAlt } from "react-icons/fa";
import { SiLeetcode, SiCodeforces } from "react-icons/si";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "Let's work together, Lalith!",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPhonePopup, setShowPhonePopup] = useState(false);
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) errs.email = "Invalid email";
    if (!formData.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    try {
      // Store contact message in localStorage instead of Firebase
      const existingMessages = JSON.parse(localStorage.getItem("contactMessages") || "[]");
      const newMessage = {
        ...formData,
        id: Date.now(),
        timestamp: new Date().toISOString()
      };
      existingMessages.push(newMessage);
      localStorage.setItem("contactMessages", JSON.stringify(existingMessages));
      
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "Let's work together, Lalith!" });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  const handleRedirect = (choice) => {
    if (choice === "yes") {
      window.location.href = `mailto:kasulalalithendra@gmail.com`;
    }
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("9966965379");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Navbar />
      <main className="contact-page">
        <section className="contact-form-section">
          <h2>Get In Touch</h2>
          <p className="subtitle">Have questions or feedback? Send a message below.</p>
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <label>
              Name
              <input
                name="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "input-error" : ""}
              />
            </label>
            {errors.name && <div className="error-message">{errors.name}</div>}

            <label>
              Email
              <input
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "input-error" : ""}
              />
            </label>
            {errors.email && <div className="error-message">{errors.email}</div>}

            <label>
              Message
              <textarea
                name="message"
                placeholder="Write your message here..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? "input-error" : ""}
              />
            </label>
            {errors.message && <div className="error-message">{errors.message}</div>}

            <button type="submit">Send Message</button>
            {submitted && (
              <div className="success-popup">
                ✅ Thank you! Appreciate your feedback.<br />
                <p>Would you like to contact Lalith directly?</p>
                <div className="redirect-options">
                  <button type="button" onClick={() => handleRedirect("yes")}>Contact Lalith</button>
                  <button type="button" onClick={() => handleRedirect("no")}>No Thanks</button>
                </div>
              </div>
            )}
          </form>
        </section>

        <section className="contact-orbital-section">
          <div className="orbital-container animated-orbit">
            <div className="orbital-center-tex">Let's Connect & Collaborate</div>

            <div className="orbital-node" title="Phone" onClick={() => setShowPhonePopup(true)}><FaPhone /></div>
            <div className="orbital-node" title="Email" onClick={() => window.location.href = "mailto:kasulalalithendra@gmail.com"}><FaEnvelope /></div>
            <div className="orbital-node" title="LinkedIn" onClick={() => window.open("https://www.linkedin.com/in/lalithendra-kasula-1b90b7323/", "_blank")}><FaLinkedin /></div>
            <div className="orbital-node" title="Twitter" onClick={() => window.open("https://x.com", "_blank")}><FaTwitter /></div>

            {showPhonePopup && (
              <div className="phone-popup">
                <p><strong>📞 Contact Number</strong><br />9966965379</p>
                <div className="popup-buttons">
                  <button onClick={handleCopyPhone}>{copied ? "Copied!" : "Copy"}</button>
                  <button onClick={() => setShowPhonePopup(false)}>Close</button>
                </div>
              </div>
            )}
          </div>

          <div className="rotating-cube-container">
            <div className="rotating-cube">
              <a href="https://github.com/Lalith0024" target="_blank" rel="noreferrer" className="rotating-face" title="GitHub">
                <FaGithub size={36} /> GitHub
              </a>
              <a href="https://leetcode.com/u/Kasula_0024/" target="_blank" rel="noreferrer" className="rotating-face" title="LeetCode">
                <SiLeetcode size={36} /> LeetCode
              </a>
              <a href="https://example.com/resume.pdf" target="_blank" rel="noreferrer" className="rotating-face" title="Resume">
                <FaFileAlt size={36} /> Resume
              </a>
              <a href="https://codeforces.com/profile/lalith123000" target="_blank" rel="noreferrer" className="rotating-face" title="Codeforces">
                <SiCodeforces size={36} /> Codeforces
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
