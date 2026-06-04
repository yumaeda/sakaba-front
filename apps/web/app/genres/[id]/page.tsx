import { Restaurant } from '@yumaeda/sakaba-interface' 
import Link from 'next/link'
import { API_URL, IMG_URL, BASE_LATITUDE, BASE_LONGITUDE } from '@/constants/Global'
import RestaurantList from '@/components/RestaurantList'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function GenresPage({ params }: PageProps) {
  const resolvedParams = await params
  const id = resolvedParams?.id || ''
  const imageDir = `${IMG_URL}/images`

  let restaurants: Restaurant[] = []
  let error: Error | undefined

  try {
    const restaurantsRes = await fetch(`${API_URL}/restaurants/genres/${id}/${BASE_LATITUDE}/${BASE_LONGITUDE}`, {
      headers: {},
    })
    const data = await restaurantsRes.json()
    restaurants = JSON.parse(JSON.stringify(data.body))
    } catch (e) {
      error = e as Error
    }

  if (error) {
    return <div>Error: {error.message}</div>
    }

  return (
     <>
       <header className="header">
        <Link href="/">
          <picture className="back-image-container">
            <source type="image/webp" media="(min-width: 150px)" srcSet={`${imageDir}/back.webp`} />
            <img src={`${imageDir}/back.png`} className="back-image" alt="Back" />
          </picture>
        </Link>
         <p className="header-label">{id} 一覧</p>
        </header>
        <div className="contents">
          <RestaurantList restaurants={restaurants} />
        </div>
      </>
    )
}
