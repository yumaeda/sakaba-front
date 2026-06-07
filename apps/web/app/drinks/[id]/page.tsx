import { Restaurant } from '@yumaeda/sakaba-interface'
import Drink from '@/interfaces/Drink'
import Link from 'next/link'
import { API_URL, BASE_LATITUDE, BASE_LONGITUDE } from '@/constants/Global'
import RestaurantList from '@/components/RestaurantList'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function DrinksPage({ params }: PageProps) {
  const resolvedParams = await params
  const id = resolvedParams?.id || ''
  const drinkId = Number(id)

  let restaurants: Restaurant[] = []
  let drink: Drink = { id: 0, name: '' }
  let error: Error | undefined

  try {
    const restaurantsRes = await fetch(`${API_URL}/restaurants/drinks/${drinkId}/${BASE_LATITUDE}/${BASE_LONGITUDE}`, {
      headers: {},
         })
    const data = await restaurantsRes.json()
    restaurants = JSON.parse(JSON.stringify(data.body))

    const drinkRes = await fetch(`${API_URL}/drinks/${id}`, {
      headers: {}
         })
    const drinkData = await drinkRes.json()
    drink = JSON.parse(JSON.stringify(drinkData.body))
        } catch (e) {
    error = e as Error
       }

  if (error) {
    return (
            <>
              <header className="header">
                  <p className="header-label">{drink.name}</p>
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
                   <p className="header-label">{drink.name}</p>
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
