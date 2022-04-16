import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Admin() {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    !user && navigate('/')
  }, [user])

  return (
    <div className='admin'>
      <h1>Welcome to admin</h1>
    </div>
  )
}
