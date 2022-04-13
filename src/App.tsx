import './assets/css/App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
// import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
