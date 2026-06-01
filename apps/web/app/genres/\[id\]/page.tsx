import { notFound } from 'next/navigation'
import { API_URL } from '../../constants/Global'
import BaseRestaurantPage from '../../components/pages/BaseRestaurantPage'
import { Restaurant } from '@yumaeda/sakaba-interface'
import camelcaseKeys from 'camelcase-keys'
import { getLatitude, getLongitude } from '../../utils/GeoLocationUtility'
import Genre from '../../interfaces/Genre'

interface GenreRestaurantPageProps {
  params: { id: string }
}

export default async function GenreRestaurantPage({ params }: GenreRestaurantPageProps) {
  const latitude = getLatitude()
  const longitude = getLongitude()

  let genre: Genre = { name: '', id: 0 }
  let restaurants: Restaurant[] = []

  try {
    const res = await fetch(`${API_URL}/restaurants/genres/${params.id}/${latitude}/${longitude}`, {
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
    const genreRes = await fetch(`${API_URL}/genres/${params.id}`, { headers: {} })
    if (!genreRes.ok) {
      notFound()
    }
    const genreData = await genreRes.json()
    genre = JSON.parse(JSON.stringify(genreData.body))
    } catch {
    notFound()
   }

  return (
    <BaseRestaurantPage
      title={genre.name}
      error={undefined}
      restaurants={restaurants} />
   )
}
