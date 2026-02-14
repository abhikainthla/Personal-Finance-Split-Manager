import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SplitProvider } from './context/SplitContext.jsx'

createRoot(document.getElementById('root')).render(
  <SplitProvider>
    <App />
  </SplitProvider>,
)
