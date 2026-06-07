import { Restaurant } from '@yumaeda/sakaba-interface'
import { API_URL, BASE_LATITUDE, BASE_LONGITUDE } from '@/constants/Global'
import RestaurantList from '@/components/RestaurantList'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ area?: string }>
}

export default async function AreaPage({ params }: PageProps) {
  const resolvedParams = await params
  const area = resolvedParams?.area || ''
  const latitude = BASE_LATITUDE
  const longitude = BASE_LONGITUDE

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
    return (
              <>
                <header className="header">
                    <p className="header-label">{area}</p>
                    <Link href="/">
                      <span className="list-item">Back</span>
                    </Link>
                  </header>
                  <div className="contents">
                    <div>Error: {error.message}</div>
                  </div>
                </>
              )
            }

  return (
             <>
               <header className="header">
                   <p className="header-label">{area}</p>
                   <Link href="/">
                     <span className="list-item">Back</span>
                   </Link>
                 </header>
                 <div className="contents">
                   <RestaurantList restaurants={restaurants} />
                 </div>
               </>
             )
           }
