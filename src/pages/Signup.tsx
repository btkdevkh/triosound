import React, { useState } from 'react'
import { auth } from '../firebase/db'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Signup() {
  const { dispatch } = useAuthContext()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const signup = (e: any) => {
    e.preventDefault()

    setError(null)
    createUserWithEmailAndPassword(auth, email, password)
      .then(res => {
        dispatch({ type: 'LOGIN', payload: res.user })

        setEmail('')
        setPassword('')
      })
      .catch(err => setError(err.message))
  }

  return (
    <div className='signup'>
      <h2>Sign Up</h2>

      <form onSubmit={signup}>
        <input 
          type="text" 
          placeholder='Email'
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder='Password'
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
        <div className="error">{error && error}</div>
      </form>
    </div>
  )
}
