import { NextRequest, NextResponse } from 'next/server'
import { API_URL } from '../../../../constants/Global'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const token = authHeader?.replace('Bearer ', '')

  if (!token) {
    return NextResponse.json({ code: 401 }, { status: 401 })
  }

  try {
    const res = await fetch(`${API_URL}/auth/home`, {
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`,
         },
         })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
    } catch (error) {
    return NextResponse.json({ code: 500 }, { status: 500 })
    }
}
