import { redirect } from 'next/navigation'
import { getCookie } from '../utils/CookieUtility'
import { JWT_KEY } from '../constants/CookieKeys'
import { jwtDecode } from 'jwt-decode'
import JwtPayload from '../interfaces/JwtPayload'

const JWT_KEY_KEY = 'token'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const token = getCookie(JWT_KEY_KEY)

  if (!token) {
    redirect('/signin')
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token)
    const currentTime = Math.floor(Date.now() / 1000)

    if (!decoded.exp || decoded.exp < currentTime) {
      redirect('/signin')
    }
  } catch {
    redirect('/signin')
  }

  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
