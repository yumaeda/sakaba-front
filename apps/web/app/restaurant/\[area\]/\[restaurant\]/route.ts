import { NextResponse } from 'next/server'
import { API_URL } from '../../../../constants/Global'
import { Category, Menu } from '@yumaeda/sakaba-interface'
import camelcaseKeys from 'camelcase-keys'

export async function GET(
  request: Request,
  { params }: { params: { area: string; restaurant: string } }
) {
  const restaurantId = params.restaurant

  try {
    const categoriesRes = await fetch(`${API_URL}/categories/${restaurantId}`, {
      headers: {},
        })
    const categoriesData = await categoriesRes.json()
    const categories = camelcaseKeys(JSON.parse(JSON.stringify(categoriesData.body)))

    const menusRes = await fetch(`${API_URL}/menus/${restaurantId}`, {
      headers: {},
        })
    const menusData = await menusRes.json()
    const menus = camelcaseKeys(JSON.parse(JSON.stringify(menusData.body)))

    return NextResponse.json({ categories, menus }, { status: 200 })
    } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch restaurant data' }, { status: 500 })
    }
}
