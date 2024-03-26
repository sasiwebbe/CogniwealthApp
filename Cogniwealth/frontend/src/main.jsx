import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ContextProvider from './Components/Context.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
  <ContextProvider>
		<App />
	</ContextProvider>
    
</BrowserRouter>
)
