import React from 'react'
import '../css/Herosection.css'
import hero from '../assets/Hero.png'
function Herosection() {
  return (
    <div className='hero' id='home'>
      
     <img src={hero} alt='hero' className='hero-img'/>
     <div className='hero-content'>
        <div className='hero-tagline'>
            <h1>Ready To Invest</h1>
            <h1>For <span style={{color:"#E4AC6B"}}>Future</span></h1>
        </div>
        <p style={{fontWeight:"300",maxWidth:"200px"}}>start your invvestment using advanced ai tool</p>
        <a href='#wealthtool' style={{fontWeight:"800"}} className='btn'>Launch Now </a>
     </div>
    </div>
  )
}

export default Herosection
