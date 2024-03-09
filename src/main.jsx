import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import GlobalState from './context/DataText.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <React.StrictMode>
    <GlobalState>
    <App />
    </GlobalState>
  </React.StrictMode>
  </BrowserRouter>,
)
