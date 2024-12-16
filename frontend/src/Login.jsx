import logo from './logo.svg';
import './App.css';
import './main.jsx';
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

export function Login() {

  return (
      
      <GoogleLogin
        onSuccess={credentialResponse => {
          const credentialResponseDecoded = jwtDecode(
            credentialResponse.credential
          );


          // const validateUser = async () => {
          //   const response = await fetch("http://127.0.0.1:5000/")
          // } 


          console.log("test1: credential response decoded: ", credentialResponseDecoded)
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    );
}