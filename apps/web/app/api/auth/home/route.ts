import { NextResponse } from 'next/server'
import { API_URL } from '@/constants/Global'
import { getAuthToken } from '@/utils/HttpAuth'

export async function GET() {
  const authHeader = await getAuthToken()

  if (!authHeader) {
    return NextResponse.json({ code: 401 }, { status: 401 })
  }

  try {
    const res = await fetch(`${API_URL}/auth/home`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ code: 500 }, { status: 500 })
  }
}
