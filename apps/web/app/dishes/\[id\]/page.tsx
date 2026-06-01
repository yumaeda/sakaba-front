import { notFound } from 'next/navigation'
import { API_URL } from '../../constants/Global'
import BaseRestaurantPage from '../../components/pages/BaseRestaurantPage'
import { Restaurant } from '@yumaeda/sakaba-interface'
import camelcaseKeys from 'camelcase-keys'
import { getLatitude, getLongitude } from '../../utils/GeoLocationUtility'
import Dish from '../../interfaces/Dish'

interface DishRestaurantPageProps {
  params: { id: string }
}

export default async function DishRestaurantPage({ params }: DishRestaurantPageProps) {
  const latitude = getLatitude()
  const longitude = getLongitude()

  let dish: Dish = { name: '', id: 0 }
  let restaurants: Restaurant[] = []

  try {
    const res = await fetch(`${API_URL}/restaurants/dishes/${params.id}/${latitude}/${longitude}`, {
      headers: {},
     })
    if (!res.ok) {
      notFound()
    }
    const data = await res.json()
    restaurants = camelcaseKeys(JSON.parse(JSON.stringify(data.body)))
   } catch {
    notFound()
   }

  try {
    const dishRes = await fetch(`${API_URL}/dishes/${params.id}`, { headers: {} })
    if (!dishRes.ok) {
      notFound()
    }
    const dishData = await dishRes.json()
    dish = JSON.parse(JSON.stringify(dishData.body))
   } catch {
    notFound()
   }

  return (
    <BaseRestaurantPage
      title={`${dish.id}:${dish.name}`}
      error={undefined}
      restaurants={restaurants} />
   )
}
