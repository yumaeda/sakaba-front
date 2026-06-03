import { Restaurant } from '@yumaeda/sakaba-interface' 
import { API_URL, IMG_URL, WEB_URL } from '@/constants/Global'
import RestaurantList from '@/components/RestaurantList'

const DEFAULT_LATITUDE = '35.761921'
const DEFAULT_LONGITUDE = '139.7054278'

interface PageProps {
  params: Promise<{ area?: string }>
}

export default async function AreaPage({ params }: PageProps) {
  const resolvedParams = await params
  const area = resolvedParams?.area || ''
  const latitude = DEFAULT_LATITUDE
  const longitude = DEFAULT_LONGITUDE
  const imageDir = `${IMG_URL}/images`

  let restaurants: Restaurant[] = []
  let error: Error | undefined

  try {
    const res = await fetch(`${API_URL}/restaurants/areas/${area}/${latitude}/${longitude}`, {
      headers: {},
    })
    const data = await res.json()
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
        <a href={`${WEB_URL}/`}>
          <picture className="back-image-container">
            <source type="image/webp" media="(min-width: 150px)" srcSet={`${imageDir}/back.webp`} />
            <img src={`${imageDir}/back.png`} className="back-image" alt="Back" />
          </picture>
        </a>
        <p className="header-label">{area}</p>
      </header>
      <div className="contents">
        <RestaurantList restaurants={restaurants} />
      </div>
    </>
  )
}
