import React from 'react'

import "../css/Footer.css"



import { faFacebook, faGithub, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function Footer() {
  return (
    <div className='box-1 '>

      
       <h3>Developed With ❤️ by <a href='#' className='icon'>Webbe</a></h3>
      <div className='social-handles'>
      <FontAwesomeIcon icon={faXTwitter} className='icon'/>
      <FontAwesomeIcon icon={faInstagram} className='icon'/>
      <FontAwesomeIcon icon={faFacebook} className='icon'/>
      <FontAwesomeIcon icon={faGithub} className='icon'/>
      </div>
    </div>
  )
}

export default Footer
