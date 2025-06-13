
import React from "react";
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
                <p>Email:</p>
            </div>
        </div>

        
        </>
    )

}

export default contact;