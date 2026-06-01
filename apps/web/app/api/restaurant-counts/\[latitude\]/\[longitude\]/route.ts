import { NextResponse } from 'next/server'
import { API_URL } from '../../../../constants/Global'

export async function GET(
  request: Request,
  { params }: { params: { latitude: string; longitude: string } }
) {
  try {
    const res = await fetch(`${API_URL}/restaurant-counts/${params.latitude}/${params.longitude}`, {
      headers: {},
        })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
    } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch restaurant counts' }, { status: 500 })
    }
}
