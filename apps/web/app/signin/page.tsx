'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { USER_NAME_KEY } from '../../constants/StorageKeys'
import { jwtDecode } from 'jwt-decode'
import JwtPayload from '../../interfaces/JwtPayload'

export default function SignInPage() {
  const router = useRouter()
  const [redirectToReferrer, setRedirectToReferrer] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  // Check if already logged in (HTTP-only cookie set by /api/login)
  useEffect(() => {
    fetch('/api/auth/verify')
      .then(response => {
        if (response.status === 200) {
          setRedirectToReferrer(true)
        }
      })
  }, [])

  // Redirect to admin once login is confirmed
  useEffect(() => {
    if (redirectToReferrer) {
      router.push('/admin/index')
    }
  }, [redirectToReferrer, router])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()

    if (data.code === 200) {
      // Decode token to save user name; the HTTP-only cookie is already set server-side
      try {
        const decoded = jwtDecode<JwtPayload>(data.token)
        if (typeof window !== 'undefined') {
          localStorage.setItem(USER_NAME_KEY, decoded.id.split('@')[0])
        }
      } catch (error) {
        console.error('Failed to decode token:', error)
      }

      setRedirectToReferrer(true)
    }
  }

  return (
    <>
      <header className="admin-header">
        <h1 className="admin-header-title">Sign In</h1>
      </header>
      <div className="admin-contents">
        <form onSubmit={handleSubmit}>
          <input className="admin-input" type="text" value={email} onChange={(e) => setEmail(e.currentTarget.value)} placeholder="ログイン ID" />
          <br />
          <input className="admin-input" type="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} placeholder="パスワード" />
          <br />
          <input className="admin-button" type="submit" value="サインイン" />
        </form>
      </div>
    </>
  )
}
