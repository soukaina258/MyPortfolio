import { Analytics } from "@vercel/analytics/react"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import DarkModeProvider from './components/DarkModeProvider.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DarkModeProvider>
      <Analytics />
      <App />
    </DarkModeProvider>
  </StrictMode>,
)
