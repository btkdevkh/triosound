import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase/db'
import { signOut } from 'firebase/auth'
import { useAuthContext } from '../hooks/useAuthContext'

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
        <nav className='navbar'>
          <ul>
            {
              !user ?
              <>
                <li>
                  <Link to={'/login'}>
                    <i className="fa-solid fa-user"></i> Login
                  </Link>
                </li>
                <li>
                  <Link to={'/signup'}>
                    <i className="fa-solid fa-user-group"></i> Signup
                  </Link>
                </li>
              </> :
              <li>
                <Link 
                  to={'#'} 
                  onClick={logOut}
                >
                  <i className="fa-solid fa-right-from-bracket"></i> Logout
                </Link>
              </li>
            }
          </ul>
        </nav>
      </div>
    </header>
  )
}
