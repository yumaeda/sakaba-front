import { NextResponse } from 'next/server'
import { API_URL } from '../../../../constants/Global'

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/restaurants/`, {
      headers: {},
        })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
    } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch restaurants' }, { status: 500 })
    }
}
