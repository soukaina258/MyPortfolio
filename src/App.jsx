import { useState, useContext } from 'react'
import './index.css'
import Portfolio from './components/Portfolio'
import { DarkModeContext } from './components/DarkModeProvider'
function App() {
  const { darkMode } = useContext(DarkModeContext);
  return (  
    <div className={`app ${darkMode && 'dark-theme'}`}>
        <Portfolio />
    </div>
  )
}

export default App
