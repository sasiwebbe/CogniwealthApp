import React, { useState } from 'react'
import { nav } from '../data'
import '../css/Navbar.css'
import { Link } from 'react-scroll'

function Navbar() {
  const [color,setColor]=useState(false)
  const Changecolor=()=>{
    if(window.scrollY>=180){
      setColor(true)
    }
    else{
      setColor(false)
    }
  }
  window.addEventListener("scroll",Changecolor)
  return (
   <nav className={color ? "navbar header-bg":"navbar"}>
    
    <div className='logo'>
    <h3>COgni</h3>
    <h3 style={{color:"#87E093"}}>Wealth</h3>
    </div>
<ul className='menu'>
    {nav.map((item)=><Link to={item.href} spy={true} 
      smooth={true} 
      offset={-38} 
      duration={500} className='menu-item'><li key={item.id}>{item.item}</li></Link>)}
</ul>
   </nav>
  )
}

export default Navbar
