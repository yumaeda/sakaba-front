import { NextResponse } from 'next/server'
import { API_URL } from '../../../../constants/Global'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const res = await fetch(`${API_URL}/drinks/${params.id}`, { headers: {} })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
    } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch drink' }, { status: 500 })
    }
}
