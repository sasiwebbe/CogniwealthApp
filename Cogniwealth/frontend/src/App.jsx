import { ReactDOM, useContext, useEffect, useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'

import Herosection from './Components/Herosection'
import Financepage from './Components/Financepage'

import ContactUs from './Components/ContactUs'
import Footer from './Components/Footer'
import DataSelection from './Components/DataSelection'
import ChatPage from './Components/ChatPage'
import { Context } from './Components/Context'



function App() {
  const {
		isClicked, setIsClicked
	} = useContext(Context);
 
 return (
   <> 
    {
      isClicked ? <ChatPage/> :(
      <><Navbar/>
      <Herosection/>
      <Financepage/>
      
      <DataSelection/>
      <ContactUs/> 
      <Footer/>
      </>
     )
   
   
 
   
   
  
   
   
   
  }
    
</>
      
  )

 
}

export default App
