import React, { useEffect, useState } from 'react'
import { auth } from '../firebase/db'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { user, dispatch } = useAuthContext()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const login = (e: any) => {
    e.preventDefault()

    setError(null)
    signInWithEmailAndPassword(auth, email, password)
      .then(res => {
        dispatch({ type: 'LOGIN', payload: res.user })

        setEmail('')
        setPassword('')
      })
      .catch(err => setError(err.message))
  }

  useEffect(() => {
    user && navigate('/admin')
  }, [user])

  return (
    <div className='login'>
      <h2>Login</h2>

      <form onSubmit={login}>
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
        <button type="submit">Login</button>
        <div className="error">{error && error}</div>
      </form>
    </div>
  )
}
