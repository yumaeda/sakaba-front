import Link from 'next/link'
import { API_URL, IMG_URL } from '../constants/Global'
import Dish from '../interfaces/Dish'
import Drink from '../interfaces/Drink'
import Genre from '../interfaces/Genre'
import Photo from '../interfaces/Photo'
import RestaurantInfo from '../interfaces/RestaurantInfo'
import { getLatitude, getLongitude } from '../utils/GeoLocationUtility'
import Footer from '../components/Footer'
import LatestPhotoList from '../components/LatestPhotoList'

export default async function HomePage() {
  const latitude = getLatitude()
  const longitude = getLongitude()

  let dishes: Dish[] = []
  let drinks: Drink[] = []
  let genres: Genre[] = []
  let photos: Photo[] = []
  let restaurantInfos: RestaurantInfo[] = []
  let error: Error | undefined

  try {
    const countsRes = await fetch(`${API_URL}/restaurant-counts/${latitude}/${longitude}`, {
      headers: {},
    })
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

  const showAllRestaurants = localStorage.getItem('hideClosedRestaurants') !== '1'

  return (
    <>
      <header className="header">
        <p className="header-label">酒場 s</p>
        <Link className="list-item" href="/geolocation">現在地を更新</Link>
       </header>
       <div className="contents">
         <LatestPhotoList basePath={IMG_URL} photos={photos} />
         <h4 className="navigation-label">Area</h4>
         <ul className="navigation-list">
           {restaurantInfos
             .filter((restaurantInfo: RestaurantInfo) => showAllRestaurants || restaurantInfo.count > 0)
             .map((info: RestaurantInfo) => (
               <li className="navigation-item">
                 <span>
                   <Link className="list-item" href={`/${info.area}/`}>{info.name}</Link>
                 </span>
               </li>
             ))}
         </ul>
         <h4 className="navigation-label">Drink</h4>
         <ul className="navigation-list">
           {drinks.map((drink: Drink) => (
             <li className="navigation-item">
               <span>
                 <Link className="list-item" href={`/drinks/${drink.id}/`}>{drink.name}</Link>
               </span>
             </li>
           ))}
         </ul>
         <h4 className="navigation-label">Genre</h4>
         <ul className="navigation-list">
           {genres.map((genre: Genre) => (
             <li className="navigation-item">
               <span>
                 <Link className="list-item" href={`/genres/${genre.id}/`}>{genre.name}</Link>
               </span>
             </li>
           ))}
         </ul>
         <h4 className="navigation-label">Dish</h4>
         <ul className="navigation-list">
           {dishes.map((dish: Dish) => (
             <li className="navigation-item">
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
