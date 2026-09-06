import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { JWT_KEY } from '@/constants/StorageKeys'
import { jwtDecode } from 'jwt-decode'

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get(JWT_KEY)?.value

  if (!token) {
    return NextResponse.json({ code: 401 }, { status: 401 })
  }

  try {
    const decoded: { exp?: number } = jwtDecode(token)
    const currentTime = Math.floor(Date.now() / 1000)

    if (!decoded.exp || decoded.exp < currentTime) {
      return NextResponse.json({ code: 401 }, { status: 401 })
    }

    return NextResponse.json({ code: 200 }, { status: 200 })
  } catch {
    return NextResponse.json({ code: 401 }, { status: 401 })
  }
}
