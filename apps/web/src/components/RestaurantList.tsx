/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import ImageViewer from 'react-simple-image-viewer'
import { Restaurant } from '@yumaeda/sakaba-interface'
import { API_URL, IMG_URL } from '../constants/Global'
import Video from '../interfaces/Video'
import Address from './Address'
import PhoneNumber from './PhoneNumber'
import RestaurantPageLink from './RestaurantPageLink'
import DishPhotoList from './DishPhotoList'
import RestaurantVideoList from './RestaurantVideoList'
import OpenHours from './OpenHours'

interface Props {
    restaurants: Restaurant[]
}

const RestaurantList: React.FC<Props> = (props) => {
    const { restaurants } = props
    const [videos, setVideos] = React.useState<Video[]>()
    const [ isViewerOpen, setIsViewerOpen ] = React.useState<boolean>(false)
    const [ imageUrls, setImageUrls ] = React.useState<string[]>([])
    const [ imageIndex, setImageIndex ] = React.useState<number>(0)
    const [ showAllRestaurants, setShowAllRestaurants ] = React.useState<boolean>(false)

    React.useEffect(() => {
        fetch(`${API_URL}/videos/`, {
            headers: {}
        })
        .then(res => res.json())
        .then(
            (data) => {
                setVideos(JSON.parse(JSON.stringify(data.body)))
            },
            (error: Error) => {
                console.error(error)
            }
        )

        setShowAllRestaurants(localStorage.getItem('hideClosedRestaurants') != "1" ?? false)
    }, [])

    const closeImageViewer = () => {
        setImageUrls([])
        setImageIndex(0)
        setIsViewerOpen(false)
    }

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
                <DishPhotoList
                    basePath={IMG_URL}
                    restaurantId={restaurantId}
                    setImageUrls={setImageUrls}
                    setImageIndex={setImageIndex}
                    setIsViewerOpen={setIsViewerOpen}
                />
                <div className="shop-info">
                    <OpenHours businessDayJson={openRestaurant.businessDayInfo} />
                    <span className="distance">{ `${Number(openRestaurant.distance).toFixed(2)} km` }</span>
                    <Address text={openRestaurant.address} latitude={openRestaurant.latitude} longitude={openRestaurant.longitude} />
                    <PhoneNumber tel={openRestaurant.tel} />
                </div>
                <RestaurantVideoList
                    videos={ videos ? videos.filter((video: Video) => video.restaurant_id == restaurantId) : null }
                />
            </li>
            )}) : <div>Loading...</div>}
            { isViewerOpen &&
                <ImageViewer
                    src={ imageUrls }
                    currentIndex={ imageIndex }
                    disableScroll={ false }
                    closeOnClickOutside={ true }
                    onClose={ closeImageViewer } />
            }
        </ul>
    )
}

export default RestaurantList
