import { NextRequest, NextResponse } from 'next/server'
import { API_URL, DOMAIN } from '@/constants/Global'

const isSecure = (req: NextRequest): boolean => {
  const origin = req.headers.get('origin') || ''
  return origin.startsWith('https://')
}

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
      const attributes: string[] = [
        `Max-Age=${maxAge}`,
        'Path=/',
        'Http',
        'SameSite=Lax',
      ]
      if (isSecure(request)) {
        attributes.push('Secure')
        attributes.push(`Domain=${DOMAIN}`)
      }

      const response = NextResponse.json(data, { status: res.status })
      response.headers.set(
        'Set-Cookie',
        `jwt=${data.token}; ${attributes.join('; ')}`,
      )
      return response
    }

    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ code: 500 }, { status: 500 })
  }
}
