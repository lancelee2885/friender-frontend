import React, {useEffect} from 'react';
import './App.css';
import Routes from './Routes';
import Navbar from './Navbar';
import {BrowserRouter} from 'react-router-dom';
import FrienderApi from './api'

function App() {

  async function signup(){

  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
