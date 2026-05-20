/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Restaurant } from '@yumaeda/sakaba-interface'
import camelcaseKeys = require('camelcase-keys')
import { API_URL } from '../../constants/Global'
import { getLatitude, getLongitude } from '../../utils/GeoLocationUtility'
import Dish from '../../interfaces/Dish'
import BaseRestaurantPage from './BaseRestaurantPage'

const DishRestaurantPage: React.FC = () => {
    const params = useParams()
    const [error, setError] = React.useState<Error>()
    const [dish, setDish] = React.useState<Dish>({name: '', id: 0})
    const [restaurants, setRestaurants] = React.useState<Restaurant[]>([])

    React.useEffect(() => {
        fetch(`${API_URL}/restaurants/dishes/${params.id}/${getLatitude()}/${getLongitude()}`, {
            headers: {}
        })
        .then(res => res.json())
        .then(
            (data) => {
                setRestaurants(camelcaseKeys(JSON.parse(JSON.stringify(data.body))))
            },
            (error: Error) => {
                setError(error)
            }
        )

        fetch(`${API_URL}/dishes/${params.id}`, { headers: {} })
            .then(res => res.json())
            .then((data) => {
                setDish(JSON.parse(JSON.stringify(data.body)))
            },
            (error: Error) => {
                setError(error)
            }
        )
    }, [])

    return (
        <BaseRestaurantPage
            title={`${dish.id}:${dish.name}`}
            error={error}
            restaurants={restaurants} />
    )
}

export default DishRestaurantPage
