import { Restaurant } from '@yumaeda/sakaba-interface'
import Dish from '@/interfaces/Dish'
import Link from 'next/link'
import { API_URL, BASE_LATITUDE, BASE_LONGITUDE } from '@/constants/Global'
import RestaurantList from '@/components/RestaurantList'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function DishesPage({ params }: PageProps) {
  const resolvedParams = await params
  const id = resolvedParams?.id || ''
  const dishId = Number(id)

  let restaurants: Restaurant[] = []
  let dish: Dish = { id: 0, name: '' }
  let error: Error | undefined

  try {
    const restaurantsRes = await fetch(`${API_URL}/restaurants/dishes/${dishId}/${BASE_LATITUDE}/${BASE_LONGITUDE}`, {
      headers: {},
        })
    const data = await restaurantsRes.json()
    restaurants = JSON.parse(JSON.stringify(data.body))

    const dishRes = await fetch(`${API_URL}/dishes/${id}`, {
      headers: {}
        })
    const dishData = await dishRes.json()
    dish = JSON.parse(JSON.stringify(dishData.body))
       } catch (e) {
    error = e as Error
       }

  if (error) {
    return (
           <>
             <header className="header">
                 <p className="header-label">{dish.name}</p>
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
                <p className="header-label">{dish.name}</p>
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
