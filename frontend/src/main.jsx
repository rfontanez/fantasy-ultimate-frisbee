import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId ={clientID}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
);
