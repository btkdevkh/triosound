import './assets/css/App.css';
import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import { useAuthContext } from './hooks/useAuthContext';
import { SongContextProvider } from './context/song/SongContext';
import Noel from './components/Noel';

function App() {
  const { user } = useAuthContext()

  return (
    <SongContextProvider>
      <BrowserRouter>
        <Noel />
        { user && <Navbar /> }
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={user ? <Signup /> : <Navigate to='/' />} />
            <Route path='/admin' element={user ? <Admin /> : <Navigate to='/' />} />
          </Routes>
        </div>
      </BrowserRouter>
    </SongContextProvider>
  );
}

export default App;
