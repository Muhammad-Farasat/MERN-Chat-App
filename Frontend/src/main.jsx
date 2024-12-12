import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './Context/authContext.jsx'
import App from './App.jsx'
import './index.css'
import { SocketContextProvider } from './Context/socketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </AuthProvider>
  </StrictMode>,
)
