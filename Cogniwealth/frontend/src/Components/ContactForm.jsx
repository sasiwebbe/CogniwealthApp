import React, { useRef, useState } from 'react';
import '../css/ContactForm.css'; // Import your CSS file
import contact from "../assets/Contact.png"
function ContactForm() {
   
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [message, setMessage] = useState('');
      const [isSubmitted , setIsSubmitted]=useState(false)
      const handleSubmit = (e) => {
        e.preventDefault();
    
        // Implement form submission logic here (e.g., send email using a service like EmailJS)
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Message:', message);
    
        setIsSubmitted(true);
    
        // Reset form fields after successful submission (optional)
        setName('');
        setEmail('');
        setMessage('');
    
       
      };
    
      return (
        <div className="contact-us" id='contact'>
          <div className="contact-us-image">
              <img src={contact} />
          </div>
          <div className="contact-us-container ">
            
            <form className="contact-us-form" onSubmit={handleSubmit}>
              <h1 className="contact-us-title">Get in Touch</h1>
              <p className="contact-us-intro">Have a question or suggestion? We'd love to hear from you!</p>
              <div className="form-group">
                
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder='Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
              
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
               
                <textarea
                  id="message"
                  name="message"
                  placeholder='Message'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="contact-us-button">
                {isSubmitted ? 'Sent!' : 'Send Message'}
              </button>
            </form>
            {isSubmitted && (
              <div className="submission-message">
                <p>Thank you for your message! We'll get back to you soon.</p>
              </div>
            )}
          </div>
        </div>
      );
    }
    
    
    
export default ContactForm;