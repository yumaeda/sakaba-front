import Link from 'next/link'
import { API_URL } from '@/constants/Global'
import Drink from '@/interfaces/Drink'
import RestaurantList from '@/components/RestaurantList'

export default async function DrinksPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const drinkId = Number(id)

  let drink: Drink | null = null
  let restaurants: any[] = []
  let error: Error | undefined

  try {
    const drinkRes = await fetch(`${API_URL}/drinks/${drinkId}/`, { headers: {} })
    const drinkData = await drinkRes.json()
    drink = JSON.parse(JSON.stringify(drinkData.body))

    const restaurantsRes = await fetch(`${API_URL}/drinks/${drinkId}/restaurants/`, { headers: {} })
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
         <p className="header-label">{drink?.name} 一覧</p>
       </header>
       <div className="contents">
         <RestaurantList restaurants={restaurants} />
         <ul className="navigation-list">
           <li className="navigation-item">
             <span>
               <Link className="list-item" href="/drinks/">
                 戻る
               </Link>
             </span>
           </li>
         </ul>
       </div>
     </>
   )
}
