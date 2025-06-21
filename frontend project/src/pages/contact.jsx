import React, { useState } from "react";
import Navbar from "/Users/kasulalalithendra/Desktop/react project/frontend project/src/components/navbar.jsx";
import "/Users/kasulalalithendra/Desktop/react project/frontend project/src/css/contact.css";

const contactNodes = [
  {
    id: "email",
    label: "Email",
    icon: "✉️",
    description: "kasulalalithendra@gmail.com",
    action: () => window.location.href = "mailto:kasulalalithendra@gmail.com",
  },
  {
    id: "phone",
    label: "Phone",
    icon: "📞",
    description: "+1 (234) 567-890",
    action: () => window.location.href = "tel:+1234567890",
  },
];

// Social cube faces with icons & links
const socials = [
  {
    id: "twitter",
    icon: "🐦",
    label: "Twitter",
    url: "https://twitter.com/yourprofile",
  },
  {
    id: "linkedin",
    icon: "💼",
    label: "LinkedIn",
    url: "https://linkedin.com/in/yourprofile",
  },
  {
    id: "github",
    icon: "🐙",
    label: "GitHub",
    url: "https://github.com/yourprofile",
  },
  {
    id: "facebook",
    icon: "📘",
    label: "Facebook",
    url: "https://facebook.com/yourprofile",
  },
];

export default function Contact() {
  const [modalOpen, setModalOpen] = useState(null);
  const [consentOpen, setConsentOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const openModal = (id) => setModalOpen(id);
  const closeModal = () => setModalOpen(null);

  // Form handlers
  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    )
      errs.email = "Invalid email format";
    if (!formData.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors({});
  };

  // When user clicks Send, open consent modal instead of directly sending mail
  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setConsentOpen(true);
  };

  // If user consents, open mailto and reset form
  const sendMail = () => {
    const mailtoLink = `mailto:kasulalalithendra@gmail.com?subject=Message from ${encodeURIComponent(
      formData.name
    )}&body=${encodeURIComponent(formData.message + "\n\nFrom: " + formData.email)}`;
    window.location.href = mailtoLink;
    setConsentOpen(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <>
      <Navbar />
      <main className="contact-page">
        <section className="contact-form-section">
          <h2>Get In Touch</h2>
          <p className="subtitle">
            Have questions or feedback? Send us a message below and we'll reply as soon as possible.
          </p>
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
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby="name-error"
                required
              />
            </label>
            {errors.name && (
              <div className="error-message" id="name-error">
                {errors.name}
              </div>
            )}

            <label>
              Email
              <input
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "input-error" : ""}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby="email-error"
                required
              />
            </label>
            {errors.email && (
              <div className="error-message" id="email-error">
                {errors.email}
              </div>
            )}

            <label>
              Message
              <textarea
                name="message"
                placeholder="Write your message here..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? "input-error" : ""}
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby="message-error"
                required
              />
            </label>
            {errors.message && (
              <div className="error-message" id="message-error">
                {errors.message}
              </div>
            )}

            <button type="submit" aria-live="polite">
              Send Message
            </button>

            {submitted && <p className="submit-success">Message sent! Check your email.</p>}
          </form>
        </section>

        <section className="contact-orbital-section" aria-label="Contact Methods">
          <h2 className="sr-only">Contact Methods</h2>
          <Orbital nodes={contactNodes} onNodeClick={openModal} />
          <SocialCube socials={socials} />
        </section>

        {modalOpen && (
          <ContactModal
            node={contactNodes.find((n) => n.id === modalOpen)}
            onClose={closeModal}
          />
        )}

        {consentOpen && (
          <ConsentModal
            onConfirm={sendMail}
            onCancel={() => setConsentOpen(false)}
          />
        )}
      </main>
    </>
  );
}

function Orbital({ nodes, onNodeClick }) {
  return (
    <div className="orbital-container" aria-hidden="true">
      <div className="orbital-sphere" aria-label="Contact options sphere">
        {nodes.map((node, i) => {
          const angle = (360 / nodes.length) * i;
          const style = {
            transform: `rotate(${angle}deg) translate(140px) rotate(-${angle}deg)`,
          };
          return (
            <button
              key={node.id}
              className="orbital-node"
              style={style}
              onClick={() => onNodeClick(node.id)}
              aria-label={`Contact via ${node.label}`}
              type="button"
            >
              <span className="node-icon" aria-hidden="true">
                {node.icon}
              </span>
              <span className="node-label">{node.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// New: Social Cube — rotating cube with social icons & flipping faces
function SocialCube({ socials }) {
  return (
    <div className="social-cube-container" aria-label="Social media links">
      <div className="social-cube">
        {socials.map((social) => (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`cube-face face-${social.id}`}
            aria-label={`Visit ${social.label}`}
            tabIndex={0}
          >
            <span className="social-icon">{social.icon}</span>
            <span className="social-label">{social.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function ContactModal({ node, onClose }) {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div
      className="contact-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div
        className="contact-modal"
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        <button
          className="modal-close-btn"
          aria-label="Close contact modal"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 id="modal-title">{node.label}</h2>

        <div className="contact-info-modal">
          <p className="contact-desc">{node.description}</p>
          <div className="modal-buttons">
            {node.action && (
              <button
                onClick={node.action}
                className="modal-action-btn"
                aria-label={`Open ${node.label} link`}
              >
                Open {node.label}
              </button>
            )}
            <button
              onClick={() => copyToClipboard(node.description)}
              className="modal-copy-btn"
              aria-label={`Copy ${node.label} to clipboard`}
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Consent modal before opening mail client
function ConsentModal({ onConfirm, onCancel }) {
  return (
    <div
      className="contact-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-modal-title"
      tabIndex={-1}
      onClick={onCancel}
      onKeyDown={(e) => e.key === "Escape" && onCancel()}
    >
      <div
        className="contact-modal"
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        <h2 id="consent-modal-title" style={{ color: "#ff6f00" }}>
          Confirm Sending Email
        </h2>
        <p>
          Your message is ready to send. This will open your email client. Do you
          want to proceed?
        </p>
        <div className="modal-buttons">
          <button
            onClick={onConfirm}
            className="modal-action-btn"
            aria-label="Confirm sending email"
          >
            Yes, open email client
          </button>
          <button
            onClick={onCancel}
            className="modal-copy-btn"
            aria-label="Cancel sending email"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
