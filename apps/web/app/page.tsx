import Link from 'next/link'
import { cookies } from 'next/headers'
import { API_URL } from '@/constants/Global'
import { LATITUDE_KEY, LONGITUDE_KEY } from '@/constants/StorageKeys'
import Dish from '@/interfaces/Dish'
import Drink from '@/interfaces/Drink'
import Genre from '@/interfaces/Genre'
import Photo from '@/interfaces/Photo'
import RestaurantInfo from '@/interfaces/RestaurantInfo'
import LatestPhotoList from '@/components/LatestPhotoList'

const DEFAULT_LATITUDE = '35.761921'
const DEFAULT_LONGITUDE = '139.7054278'

export default async function HomePage() {
  const cookieStore = await cookies()
  const latitude = cookieStore.get(LATITUDE_KEY)?.value || DEFAULT_LATITUDE
  const longitude = cookieStore.get(LONGITUDE_KEY)?.value || DEFAULT_LONGITUDE

  let dishes: Dish[] = []
  let drinks: Drink[] = []
  let genres: Genre[] = []
  let photos: Photo[] = []
  let restaurantInfos: RestaurantInfo[] = []
  let error: Error | undefined

  try {
    const countsRes = await fetch(`${API_URL}/restaurant-counts/${latitude}/${longitude}`, { headers: {}, })
    const countsData = await countsRes.json()
    restaurantInfos = JSON.parse(JSON.stringify(countsData.body))
      } catch (e) {
    error = e as Error
      }

  try {
    const dishesRes = await fetch(`${API_URL}/dishes/`, { headers: {} })
    const dishesData = await dishesRes.json()
    dishes = JSON.parse(JSON.stringify(dishesData.body))
       } catch (e) {
    error = e as Error
       }

  try {
    const drinksRes = await fetch(`${API_URL}/drinks/`, { headers: {} })
    const drinksData = await drinksRes.json()
    drinks = JSON.parse(JSON.stringify(drinksData.body))
       } catch (e) {
    error = e as Error
       }

  try {
    const genresRes = await fetch(`${API_URL}/genres/`, { headers: {} })
    const genresData = await genresRes.json()
    genres = JSON.parse(JSON.stringify(genresData.body))
       } catch (e) {
    error = e as Error
       }

  try {
    const photosRes = await fetch(`${API_URL}/latest-photos/`, { headers: {} })
    const photosData = await photosRes.json()
    photos = JSON.parse(JSON.stringify(photosData.body))
       } catch (e) {
    error = e as Error
       }

  if (error) {
    return <div>Error: {error.message}</div>
      }

  return (
        <>
          <header className="header">
              <p className="header-label">酒場 s</p>
              <Link className="list-item" href="/geolocation">現在地を更新</Link>
            </header>
            <div className="contents">
              <LatestPhotoList photos={photos} />
               <h4 className="navigation-label">Area</h4>
               <ul className="navigation-list">
                 {restaurantInfos
                    .map((info: RestaurantInfo) => (
                      <li className="navigation-item" key={info.area}>
                        <span>
                          <Link className="list-item" href={`/${info.area}/`}>{info.name}</Link>
                        </span>
                       </li>
                      ))}
               </ul>
               <h4 className="navigation-label">Drink</h4>
               <ul className="navigation-list">
                 {drinks.map((drink: Drink) => (
                     <li className="navigation-item" key={`drink-${drink.id}`}>
                       <span>
                         <Link className="list-item" href={`/drinks/${drink.id}/`}>{drink.name}</Link>
                        </span>
                      </li>
                    ))}
                </ul>
               <h4 className="navigation-label">Genre</h4>
                <ul className="navigation-list">
                  {genres.map((genre: Genre) => (
                       <li className="navigation-item" key={`genre-${genre.id}`}>
                         <span>
                           <Link className="list-item" href={`/genres/${genre.id}/`}>{genre.name}</Link>
                         </span>
                        </li>
                       ))}
                </ul>
               <h4 className="navigation-label">Dish</h4>
                <ul className="navigation-list">
                  {dishes.map((dish: Dish) => (
                        <li className="navigation-item" key={`dish-${dish.id}`}>
                          <span>
                            <Link className="list-item" href={`/dishes/${dish.id}/`}>{dish.name}</Link>
                          </span>
                         </li>
                         ))}
                </ul>
                <p className="second-paragraph">
                   <Link className="list-item" href="/ranking">フードランキング</Link>
                 </p>
               </div>
             </>
           )
        }
