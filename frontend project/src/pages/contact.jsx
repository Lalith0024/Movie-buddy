import React, { useState } from "react";
import "../css/App.css"; // using App.css directly as requested

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000); // Reset after 3s

    const name = e.target[0].value;
    const email = e.target[1].value;
    const message = e.target[2].value;

    // Open default email app
    window.location.href = `mailto:kasulalalithendra@gmail.com?subject=Feedback from ${name}&body=${message}%0A%0AFrom: ${email}`;
  };

  return (
    <div className="contact-page">
      <h2>Contact Us</h2>
      <p>If you have any questions or feedback, feel free to reach out!</p>

      {submitted && (
        <div className="thank-you-message">🎉 Thank you! We'll get back soon.</div>
      )}

      <form className="contact-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" required></textarea>
        <button type="submit">Send Message</button>
      </form>

      <div className="contact-info">
        <h3>Contact Information</h3>
        <p>Email: kasulalalithendra@gmail.com</p>
      </div>
    </div>
  );
}

export default Contact;
