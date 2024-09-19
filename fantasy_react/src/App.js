import logo from './logo.svg';
import './App.css';
import './index.js';
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

function App() {

  return (
      
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log("test1")
          const credentialResponseDecoded = jwtDecode(
            credentialResponse.credential
          );
          console.log("test2")

          console.log(credentialResponseDecoded);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    );
}
export default App;
