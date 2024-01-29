import React from 'react'
import data from './data.json'
import './navbar.css'
function Navbar() {
  return (
    <>
    <nav className='navbar'>
      
         <div className="navbar__container">
           <span>InvestRE</span>
         <ul>{
          data.values.map((data)=><li key={data.id}>{data.name}</li>)
         }
         </ul>
         <div className='close'>
             <span>❌</span>
             <span>❌</span>
             <span>❌</span>
         </div>
         </div>
         
    </nav>
    </>
  )
}

export default Navbar