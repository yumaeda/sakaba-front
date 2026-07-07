import Restaurant from '@/interfaces/Restaurant'
import { API_URL, BASE_LATITUDE, BASE_LONGITUDE } from '@/constants/Global'
import { LATITUDE_KEY, LONGITUDE_KEY } from '@/constants/StorageKeys'
import RestaurantList from '@/components/RestaurantList'
import Link from 'next/link'
import { cookies } from 'next/headers'

interface PageProps {
  params: Promise<{ area?: string }>
}

export default async function AreaPage({ params }: PageProps) {
  const cookieStore = await cookies()
  const latitude = cookieStore.get(LATITUDE_KEY)?.value || BASE_LATITUDE
  const longitude = cookieStore.get(LONGITUDE_KEY)?.value || BASE_LONGITUDE
  const resolvedParams = await params
  const area = resolvedParams?.area || ''

  const areaStyle = area === 'motohasunuma' ? {
    backgroundImage: `url(/images/motohasunuma.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
   } : area === 'nakaitabashi' ? {
    backgroundImage: `url(/images/nakaitabashi.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
   } : area === 'itabashi-honcho' ? {
    backgroundImage: `url(/images/itabashi-honcho.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
   } : undefined

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
                 <header className="header" style={areaStyle}>
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
                <header className="header" style={areaStyle}>
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
