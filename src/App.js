import React, { useEffect, useState } from 'react';
import './App.css';
import Routes from './Routes';
import Navbar from './Navbar';
import { BrowserRouter } from 'react-router-dom';
import FrienderApi from './api';
import UserContext from "./UserContext";
import jwt from "jsonwebtoken";

function App() {

  const initialToken = localStorage.getItem("token") || null;
  const [token, setToken] = useState(initialToken);
  const [currUser, setCurrUser] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);


  /**
   * Updates currUser whenever token changes or when token found in
   * localStorage
   */
  useEffect(
    function updateCurrUserOnTokenChange() {
      async function updateCurrUser() {
        if (token) {
          const { username } = jwt.decode(token);
          const user = await FrienderApi.getUserInfo(username);
          setCurrUser(user);
          setInfoLoaded(true);
        } else {
          checkForRememberedUser();
        }
      }
      updateCurrUser();

    },
    [token]
  );

  /** If there are user credentials in local storage, use those to log in
   * that user. This is meant to be called on page load, just once.
   */
  function checkForRememberedUser() {
    console.log("checkForRememberedUser");
    const t = localStorage.getItem("token");
    if (t) {
      setToken(t);
      FrienderApi.token = t;
    } else {
      setInfoLoaded(true);
    }
  }

  async function handleUpdate(data) {

    const user = await FrienderApi.updateUser(data, currUser.username);
    setCurrUser(user);

  }

  /** Handles site-wide signUp.
   *
   * Automatically logs them in (set token) upon signUp.
   *
   * Make sure you await this function to see if any error happens.
   */
  async function signUp(signupData) {
    let token = await FrienderApi.signUp(signupData);
    setToken(token);
    return localStorage.setItem("token", token);
  }

  /** Handles site-wide logIn.
   *
   * Make sure you await this function to see if any error happens.
   */
  async function logIn(logInData) {
    let token = await FrienderApi.logIn(logInData);
    setToken(token);
    return localStorage.setItem("token", token);
  }

  return (
    <UserContext.Provider value={currUser}>
      <BrowserRouter>
        <Navbar />
        <Routes logIn={logIn} signUp={signUp} handleUpdate={handleUpdate} />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
