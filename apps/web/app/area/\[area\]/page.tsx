import { notFound } from 'next/navigation'
import { API_URL, IMG_URL, SERVICE_NAME, WEB_URL } from '../../constants/Global'
import RestaurantList from '../../components/RestaurantList'
import Footer from '../../components/Footer'
import { Restaurant } from '@yumaeda/sakaba-interface'
import camelcaseKeys from 'camelcase-keys'
import { getLatitude, getLongitude } from '../../utils/GeoLocationUtility'

interface AreaPageProps {
  params: { area: string }
}

export async function generateMetadata({ params }: AreaPageProps) {
  return {
    title: `${params.area} | ${SERVICE_NAME}`,
  }
}

export default async function AreaPage({ params }: AreaPageProps) {
  const area = params.area
  const latitude = getLatitude()
  const longitude = getLongitude()

  let restaurants: Restaurant[] = []

  try {
    const res = await fetch(`${API_URL}/restaurants/areas/${area}/${latitude}/${longitude}`, {
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

  const imageDir = `${IMG_URL}/images`

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
        <Footer />
      </>
    )
}
