import Link from 'next/link'
import { API_URL } from '@/constants/Global'
import Genre from '@/interfaces/Genre'
import RestaurantList from '@/components/RestaurantList'

export default async function GenresPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const genreId = Number(id)

  let genre: Genre | null = null
  let restaurants: any[] = []
  let error: Error | undefined

  try {
    const genreRes = await fetch(`${API_URL}/genres/${genreId}/`, { headers: {} })
    const genreData = await genreRes.json()
    genre = JSON.parse(JSON.stringify(genreData.body))

    const restaurantsRes = await fetch(`${API_URL}/genres/${genreId}/restaurants/`, { headers: {} })
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
         <p className="header-label">{genre?.name} 一覧</p>
        </header>
        <div className="contents">
          <RestaurantList restaurants={restaurants} />
          <ul className="navigation-list">
            <li className="navigation-item">
              <span>
                <Link className="list-item" href="/genres/">
                  戻る
                </Link>
              </span>
            </li>
          </ul>
        </div>
      </>
    )
}
