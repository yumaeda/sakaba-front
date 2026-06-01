import { NextResponse } from 'next/server'
import { API_URL } from '../../../../constants/Global'
import { getLatitude, getLongitude } from '../../../../utils/GeoLocationUtility'
import { Restaurant } from '@yumaeda/sakaba-interface'
import camelcaseKeys from 'camelcase-keys'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const latitude = getLatitude()
  const longitude = getLongitude()

  try {
    const res = await fetch(`${API_URL}/restaurants/dishes/${params.id}/${latitude}/${longitude}`, {
      headers: {},
        })
    const data = await res.json()
    const restaurants = camelcaseKeys(JSON.parse(JSON.stringify(data.body)))
    return NextResponse.json(restaurants, { status: res.status })
    } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch restaurants' }, { status: 500 })
    }
}
