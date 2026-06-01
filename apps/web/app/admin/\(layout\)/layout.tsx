import { redirect } from 'next/navigation'
import { getCookie } from '../../../utils/CookieUtility'
import { JWT_KEY } from '../../../constants/CookieKeys'
import { jwtDecode } from 'jwt-decode'
import JwtPayload from '../../../interfaces/JwtPayload'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const token = getCookie(JWT_KEY)

  if (!token) {
    redirect('/signin')
  }

  try {
    const decoded: JwtPayload = jwtDecode(token)
    const currentTime = Math.floor(Date.now() / 1000)

    if (!decoded.exp || decoded.exp < currentTime) {
      redirect('/signin')
    }
  } catch {
    redirect('/signin')
  }

  return <>{children}</>
}
