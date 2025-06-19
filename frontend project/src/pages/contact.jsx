import React, { useState } from "react";
import "../css/contact.css";

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Simulate email action
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;
    window.location.href = `mailto:kasulalalithendra@gmail.com?subject=Contact from ${name}&body=Name: ${name}%0DEmail: ${email}%0D%0DMessage:%0D${message}`;
  };

  return (
    <div className="contact-page">
      <h2>Contact Us</h2>
      <p>If you have any questions or feedback, feel free to reach out!</p>

      {!submitted ? (
        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      ) : (
        <div className="thank-you">
          <h3>🎉 Thank You!</h3>
          <p>Your message has been prepared for sending. Check your mail app!</p>
        </div>
      )}

      <div className="contact-info">
        <h3>Contact Information</h3>
        <p>Email: <a href="mailto:kasulalalithendra@gmail.com">kasulalalithendra@gmail.com</a></p>
      </div>
    </div>
  );
}

export default Contact;