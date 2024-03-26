import React from 'react'
import '../css/ContactUs.css'
import Footer from './Footer'
import { faInbox } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ContactForm from './ContactForm'
function ContactUs() {
  return (
    <div className='footer-section'>
      <section className='contact'>
             <ContactForm/>
      </section>
       <footer className='footer'>
        <Footer/>
      </footer>
    </div>
   
  )
}

export default ContactUs
