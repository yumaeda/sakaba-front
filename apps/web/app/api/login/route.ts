import { NextResponse } from 'next/server'
import { API_URL } from '../../../../constants/Global'

export async function POST(request: Request) {
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
    return NextResponse.json(data, { status: res.status })
    } catch (error) {
    return NextResponse.json({ code: 500 }, { status: 500 })
    }
}
