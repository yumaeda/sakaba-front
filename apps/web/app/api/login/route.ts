import { NextRequest, NextResponse } from 'next/server'
import { API_URL, DOMAIN } from '@/constants/Global'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await res.json()

    if (data.code === 200 && data.token) {
      const maxAge = 3600
      // Set HTTP-only cookie so server components can read it via cookies()
      const response = NextResponse.json(data, { status: res.status })
      response.headers.set(
        'Set-Cookie',
        `jwt=${data.token}; Max-Age=${maxAge}; Path=/; Http; Secure; SameSite=Lax; Domain=${DOMAIN}`,
      )
      return response
    }

    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ code: 500 }, { status: 500 })
  }
}
