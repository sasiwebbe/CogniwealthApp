import React from 'react'
import {imageLinks} from '../data'
import FinanceImages from './FinanceImages'
import "../css/Financepage.css"


function Financepage() {
  return (
   
    <div className='finance' id='finance'>
      <h2><span style={{color:"#CC76A1"}}>FINANCE</span> DATA AVAILABLE</h2>
      <div className='data_card_container'>
        
       {imageLinks.map((item)=>{
         return   <div className='data_card'>

        <FinanceImages image={item.src}  />
        <div className='data_overlay'>
          <span style={{fontWeight:"800",color:"black"}}>{item.name}</span>
         
        </div>
        </div>
        })}
      </div>
    </div>
  )
}

export default Financepage
