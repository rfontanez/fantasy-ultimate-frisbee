import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";


createRoot(document.getElementById('root')).render(

  <StrictMode>
    <GoogleOAuthProvider clientId='156978108819-o14p3j07vqtpcka3us2saq8pd93io2no.apps.googleusercontent.com'>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
