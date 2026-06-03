import { NextRequest, NextResponse } from 'next/server'
import { API_URL } from '@/constants/Global'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const res = await fetch(`${API_URL}/auth/photo/`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${request.headers.get('Authorization')?.replace('Bearer ', '')}`,
         },
      body: JSON.stringify(body),
          })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
    } catch (error) {
    return NextResponse.json({ error: 'Failed to upload photo' }, { status: 500 })
    }
}
