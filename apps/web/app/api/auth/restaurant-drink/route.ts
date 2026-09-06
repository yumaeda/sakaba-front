import { NextRequest, NextResponse } from 'next/server'
import { API_URL } from '@/constants/Global'
import { getAuthToken } from '@/utils/HttpAuth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const authHeader = await getAuthToken()
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    if (authHeader) {
      headers['Authorization'] = authHeader
    }
    const res = await fetch(`${API_URL}/auth/restaurant-drink/`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ error: 'Failed to create restaurant drink' }, { status: 500 })
  }
}
