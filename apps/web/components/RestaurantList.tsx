/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import Restaurant from '@/interfaces/Restaurant'
import { API_URL } from '@/constants/Global'
import Address from './Address'
import DishPhotoList from './DishPhotoList'
import OpenHours from './OpenHours'
import PhoneNumber from './PhoneNumber'
import RestaurantPageLink from './RestaurantPageLink'
import RestaurantVideoList from './RestaurantVideoList'

interface Props {
    restaurants: Restaurant[]
}

export default async function RestaurantList(props: Props) {
    const { restaurants } = props
    const showAllRestaurants = typeof window !== 'undefined' ? localStorage.getItem('hideClosedRestaurants') !== "1" : true

    const videosRes = await fetch(`${API_URL}/videos/`, { headers: {} })
    const videosData = await videosRes.json()
    const videos = JSON.parse(JSON.stringify(videosData.body))

    return (
        <ul className="shop-list">
            {restaurants ? restaurants
                .filter((restaurant: Restaurant) => (showAllRestaurants || (restaurant.isOpen == 1 && Number(restaurant.distance) < 5)))
                .map((openRestaurant: Restaurant) => {
                    const restaurantId = openRestaurant.id
                    return (
                        <li className="shop-item" key={restaurantId} id={restaurantId}>
                            <div className="shop-item-grid">
                                <span className="shop-genre">{openRestaurant.genre}</span>
                                <h4 className="shop-name-wrapper">
                                    <RestaurantPageLink id={restaurantId} area={openRestaurant.area} url={openRestaurant.url} name={openRestaurant.name} />
                                </h4>
                            </div>
                            <DishPhotoList restaurantId={restaurantId} area={openRestaurant.area} />
                            <div className="shop-info">
                                <OpenHours businessDayJson={openRestaurant.businessDayInfo} />
                                <span className="distance">{`${Number(openRestaurant.distance).toFixed(2)} km`}</span>
                                <Address text={openRestaurant.address} latitude={openRestaurant.latitude} longitude={openRestaurant.longitude} />
                                <PhoneNumber tel={openRestaurant.tel} />
                            </div>
                            <RestaurantVideoList
                                videos={videos ? videos.filter((video: { restaurant_id: string }) => video.restaurant_id == restaurantId) : null}
                            />
                        </li>
                    )
                }) : <div>Loading...</div>}
        </ul>
    )
}
