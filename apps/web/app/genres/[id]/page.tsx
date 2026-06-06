import { Restaurant } from '@yumaeda/sakaba-interface' 
import Genre from '@/interfaces/Genre'
import Link from 'next/link'
import { API_URL, BASE_LATITUDE, BASE_LONGITUDE } from '@/constants/Global'
import RestaurantList from '@/components/RestaurantList'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function GenresPage({ params }: PageProps) {
  const resolvedParams = await params
  const id = resolvedParams?.id || ''

  let restaurants: Restaurant[] = []
  let genre: Genre = { id: 0, name: '' }
  let error: Error | undefined

  try {
    const restaurantsRes = await fetch(`${API_URL}/restaurants/genres/${id}/${BASE_LATITUDE}/${BASE_LONGITUDE}`, {
      headers: {},
    })
    const data = await restaurantsRes.json()
    restaurants = JSON.parse(JSON.stringify(data.body))

    const genreRes = await fetch(`${API_URL}/genres/${id}`, {
      headers: {}
    })
    const genreData = await genreRes.json()
    genre = JSON.parse(JSON.stringify(genreData.body))
  } catch (e) {
    error = e as Error
  }

  if (error) {
    return <div>Error: {error.message}</div>
    }

  return (
     <>
       <header className="header">
          <p className="header-label">{genre.name}</p>
          <Link href="/"><span className="list-item">Back</span></Link>
        </header>
        <div className="contents">
          <RestaurantList restaurants={restaurants} />
        </div>
      </>
    )
}
