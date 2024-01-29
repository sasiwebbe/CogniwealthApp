import React from 'react'
import './hero.css'
import hero from '../../assets/hero.svg';
function Herosection() {
  return (
    <div className='hero'> 
        <div className='hero--img'>
        <img src={hero} alt='finance' />
        </div>
        <div className='hero-content'>
            <div>
            <h2>READY TO INVEST</h2>
            <h2>FOR <span className='pink--mark'>FUTURE</span></h2>
            </div>
            <p>
            Start Your Investment Using<br></br> Advanced AI Tool
            </p>
            <button>
                START NOW
            </button>
            
        </div>
    </div>
  )
}

export default Herosection