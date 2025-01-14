import logo from './logo.svg';
import './App.css';
import './main.jsx';
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

export function Login() {

  async function loginUser(userCredentials) {
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        credentials: userCredentials
      });
      console.log("Backend response: ", response.data);
    }
    catch (error) {
      console.error("Error logging in: ", error);
    }
  }


  return (
      <GoogleLogin
        onSuccess={credentialResponse => {

          console.log("RAW credential: ", credentialResponse.credential)

          loginUser(credentialResponse.credential)


          const credentialResponseDecoded = jwtDecode(
            credentialResponse.credential
          );

          console.log("credential response decoded: ", credentialResponseDecoded)
        }}

        onError={() => {
          console.log('Login Failed');
        }}
      />
    );
}