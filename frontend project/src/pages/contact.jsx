
import React from "react";
// import '../css/App.css'; // or './App.css' if not in subfolder
import "../css/contact.css"; // Assuming you have a contact.css file for styling
function contact(){
    return (
        <>

        <div className="contact-page">
            <h2>Contact Us</h2>
            <p>If you have any questions or feedback, feel free to reach out!</p>
            <form className="contact-form">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <textarea placeholder="Your Message" required></textarea>
                <button type="submit">Send Message</button>
            </form>
            <div className="contact-info">
                <h3>Contact Information</h3>
                <p>Email:kasulalalithendra@gmail.com</p>
            </div>
        </div>

        
        </>
    )

}

export default contact;