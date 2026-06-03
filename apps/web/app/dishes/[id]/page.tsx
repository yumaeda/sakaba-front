import Link from 'next/link'
import { API_URL } from '@/constants/Global'
import Dish from '@/interfaces/Dish'
import RestaurantList from '@/components/RestaurantList'

export default async function DishesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const dishId = Number(id)

  let dish: Dish | null = null
  let restaurants: any[] = []
  let error: Error | undefined

  try {
    const dishRes = await fetch(`${API_URL}/dishes/${dishId}/`, { headers: {} })
    const dishData = await dishRes.json()
    dish = JSON.parse(JSON.stringify(dishData.body))

    const restaurantsRes = await fetch(`${API_URL}/dishes/${dishId}/restaurants/`, { headers: {} })
    const restaurantsData = await restaurantsRes.json()
    restaurants = JSON.parse(JSON.stringify(restaurantsData.body))
  } catch (e) {
    error = e as Error
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <>
      <header className="header">
        <p className="header-label">{dish?.name} 一覧</p>
      </header>
      <div className="contents">
        <RestaurantList restaurants={restaurants} />
        <ul className="navigation-list">
          <li className="navigation-item">
            <span>
              <Link className="list-item" href="/dishes/">
                戻る
              </Link>
            </span>
          </li>
        </ul>
      </div>
    </>
  )
}
