import { NextResponse } from 'next/server'
import { API_URL } from '../../../../constants/Global'

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/drinks/`, { headers: {} })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
    } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch drinks' }, { status: 500 })
    }
}

export async function GET request(NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
      }

  try {
    const res = await fetch(`${API_URL}/drinks/${id}`, { headers: {} })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
    } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch drink' }, { status: 500 })
    }
}
