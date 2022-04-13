import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header>
      <div className="container">
        <h1><i className="fa-solid fa-compact-disc"></i>3sound</h1>
        <nav className='navbar'>
          <ul>
            <li><Link to={'/login'}><i className="fa-solid fa-user"></i> Login</Link></li>
            <li><Link to={'/signup'}><i className="fa-solid fa-user-group"></i> Signup</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
