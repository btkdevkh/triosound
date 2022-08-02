import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase/db'
import { signOut } from 'firebase/auth'
import { useAuthContext } from '../hooks/useAuthContext'
import '../assets/css/Navbar.css'

export default function Navbar() {
  const { user, dispatch } = useAuthContext()

  const logOut = () => {
    signOut(auth)
      .then(() => dispatch({ type: 'LOGOUT' }))
      .catch(err => console.log(err.message))
  }

  return (
    <header>
      <div className="container">
        {
          user && 
          <Link to={'/'}>
            <h1><i className="fa-solid fa-compact-disc"></i>Trio</h1>
          </Link>
        }
        <nav className='navbar'>
          <ul>
            {
              user &&
              <>
                <li>
                  <Link to={'/admin'}>
                    <i className="fa-solid fa-hammer"></i>
                  </Link>
                </li>
                <li><i className="fa-solid fa-user"></i> {user.email}</li>
                <li>
                  <Link to={'/signup'}>
                    <i className="fa-solid fa-user-group"></i>
                  </Link>
                </li>
                <li>
                  <Link 
                    to={'#'} 
                    onClick={logOut}
                  >
                    <i className="fa-solid fa-right-from-bracket"></i>
                  </Link>
                </li>
              </>
            }
          </ul>
        </nav>
      </div>
    </header>
  )
}
