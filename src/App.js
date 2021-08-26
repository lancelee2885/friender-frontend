import React, {useEffect, useState} from 'react';
import './App.css';
import Routes from './Routes';
import Navbar from './Navbar';
import {BrowserRouter} from 'react-router-dom';
import FrienderApi from './api'

function App() {

  const initialToken = JSON.parse(localStorage.getItem("token")) || null; 
  const [token, setToken] = useState(initialToken);

  /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   *
   * Make sure you await this function to see if any error happens.
   */
   async function signup(signupData) {
    let token = await FrienderApi.signup(signupData);
    setToken(token);
    return localStorage.setItem("token", JSON.stringify(token));
  }

  /** Handles site-wide logIn.
   *
   * Make sure you await this function to see if any error happens.
   */
   async function logIn(logInData) {
    let token = await FrienderApi.logIn(logInData);
    setToken(token);
    return localStorage.setItem("token", JSON.stringify(token));
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes logIn={logIn} signup={signup}/>
    </BrowserRouter>
  );
}

export default App;
