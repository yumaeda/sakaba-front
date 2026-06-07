/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import { useState, useEffect } from 'react'
import { getCookie } from '@/utils/CookieUtility'
import { JWT_KEY } from '@/constants/CookieKeys'

export const useAuth = () => {
  const [token, setToken] = useState<string>('')

  useEffect(() => {
    setToken(getCookie(JWT_KEY))
  }, [])

  return { token }
}

export default useAuth
