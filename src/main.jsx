import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Hero from "./components/Hero/Hero.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
      {/* <Hero/> */}
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StrictMode>,
)
