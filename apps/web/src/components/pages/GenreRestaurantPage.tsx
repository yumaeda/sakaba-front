/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Restaurant } from '@yumaeda/sakaba-interface'
import camelcaseKeys = require('camelcase-keys')
import { API_URL } from '../../constants/Global'
import { getLatitude, getLongitude } from '../../utils/GeoLocationUtility'
import Genre from '../../interfaces/Genre'
import BaseRestaurantPage from './BaseRestaurantPage'

const GenreRestaurantPage: React.FC = () => {
    const params = useParams()
    const [error, setError] = React.useState<Error>()
    const [genre, setGenre] = React.useState<Genre>({name: '', id: 0})
    const [restaurants, setRestaurants] = React.useState<Restaurant[]>([])

    React.useEffect(() => {
        fetch(`${API_URL}/restaurants/genres/${params.id}/${getLatitude()}/${getLongitude()}`, {
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

        fetch(`${API_URL}/genres/${params.id}`, { headers: {} })
            .then(res => res.json())
            .then((data) => {
                setGenre(JSON.parse(JSON.stringify(data.body)))
            },
            (error: Error) => {
                setError(error)
            }
        )
    }, [])

    return (
        <BaseRestaurantPage
            title={genre.name}
            error={error}
            restaurants={restaurants} />
    )
}

export default GenreRestaurantPage
