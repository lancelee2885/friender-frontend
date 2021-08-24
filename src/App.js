import './App.css';
import Routes from './Routes';
import Navbar from './Navbar';
import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
