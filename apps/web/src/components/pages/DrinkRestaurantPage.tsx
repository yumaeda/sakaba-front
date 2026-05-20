/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Restaurant } from '@yumaeda/sakaba-interface'
import camelcaseKeys = require('camelcase-keys')
import { API_URL } from '../../constants/Global'
import { getLatitude, getLongitude } from '../../utils/GeoLocationUtility'
import Drink from '../../interfaces/Drink'
import BaseRestaurantPage from './BaseRestaurantPage'

const DrinkRestaurantPage: React.FC = () => {
    const params = useParams()
    const [error, setError] = React.useState<Error>()
    const [drink, setDrink] = React.useState<Drink>({name: '', id: 0})
    const [restaurants, setRestaurants] = React.useState<Restaurant[]>([])

    React.useEffect(() => {
        fetch(`${API_URL}/restaurants/drinks/${params.id}/${getLatitude()}/${getLongitude()}`, {
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

        fetch(`${API_URL}/drinks/${params.id}`, { headers: {} })
            .then(res => res.json())
            .then((data) => {
                setDrink(JSON.parse(JSON.stringify(data.body)))
            },
            (error: Error) => {
                setError(error)
            }
        )
    }, [])

    return (
        <BaseRestaurantPage
            title={drink.name}
            error={error}
            restaurants={restaurants} />
    )
}

export default DrinkRestaurantPage
