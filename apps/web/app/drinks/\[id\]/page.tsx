import { notFound } from 'next/navigation'
import { API_URL } from '../../constants/Global'
import BaseRestaurantPage from '../../components/pages/BaseRestaurantPage'
import { Restaurant } from '@yumaeda/sakaba-interface'
import camelcaseKeys from 'camelcase-keys'
import { getLatitude, getLongitude } from '../../utils/GeoLocationUtility'
import Drink from '../../interfaces/Drink'

interface DrinkRestaurantPageProps {
  params: { id: string }
}

export default async function DrinkRestaurantPage({ params }: DrinkRestaurantPageProps) {
  const latitude = getLatitude()
  const longitude = getLongitude()

  let drink: Drink = { name: '', id: 0 }
  let restaurants: Restaurant[] = []

  try {
    const res = await fetch(`${API_URL}/restaurants/drinks/${params.id}/${latitude}/${longitude}`, {
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
    const drinkRes = await fetch(`${API_URL}/drinks/${params.id}`, { headers: {} })
    if (!drinkRes.ok) {
      notFound()
    }
    const drinkData = await drinkRes.json()
    drink = JSON.parse(JSON.stringify(drinkData.body))
   } catch {
    notFound()
   }

  return (
    <BaseRestaurantPage
      title={drink.name}
      error={undefined}
      restaurants={restaurants} />
   )
}
