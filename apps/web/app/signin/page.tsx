'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { API_URL } from '../../constants/Global'
import { USER_NAME_KEY } from '../../constants/StorageKeys'
import { jwtDecode } from 'jwt-decode'
import JwtPayload from '../../interfaces/JwtPayload'

export default function SignInPage() {
  const router = useRouter()
  const [redirectToReferrer, setRedirectToReferrer] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    const token = document.cookie
      .split(';')
      .find(row => row.includes('jwt'))
      ?.split('=')[1]

    if (token) {
      fetch(`${API_URL}/auth/home`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
         },
         })
         .then(response => {
          if (response.status == 200) {
            setRedirectToReferrer(true)
           }
         })
       }
     }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const postOptions: RequestInit = {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
       },
      body: JSON.stringify({ email, password }),
       }
    const res = await fetch(`${API_URL}/login`, postOptions)
    const data = await res.json()

    if (data.code == 200) {
      const domain = 'sakabas.com'
      const maxAge = 3600
      document.cookie = `jwt=${data.token}; max-Age=${maxAge}; domain=${domain}; secure`

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

  if (redirectToReferrer === true) {
    router.push('/admin/index')
    return null
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
