import './assets/css/App.css';
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Admin from './pages/Admin';

function App() {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    user && navigate('/admin')
  }, [user])

  return (
    <>
      { location.pathname !== '/' && <Navbar /> }
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
