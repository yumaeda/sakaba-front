/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Restaurant } from '@yumaeda/sakaba-interface'
import camelcaseKeys = require('camelcase-keys')
import { API_URL, IMG_URL, SERVICE_NAME, WEB_URL } from '../../constants/Global'
import { getLatitude, getLongitude } from '../../utils/GeoLocationUtility'
import RestaurantList from '../RestaurantList'
import Footer from '../Footer'

const AreaPage: React.FC = () => {
    const params = useParams()
    const [error, setError] = React.useState<Error>()
    const [restaurants, setRestaurants] = React.useState<Restaurant[]>([])
    const area = params.area || ''
    const imageDir = `${IMG_URL}/images`

    React.useEffect(() => {
        document.title = `${area}｜${SERVICE_NAME}`

        fetch(`${API_URL}/restaurants/areas/${area}/${getLatitude()}/${getLongitude()}`, {
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
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (
            <>
                <header className="header">
                    <a href={`${WEB_URL}/`}>
                        <picture className="back-image-container">
                            <source type="image/webp" media="(min-width: 150px)" srcSet={`${imageDir}/back.webp`} />
                            <img src={`${imageDir}/back.png`} className="back-image" alt="Back" />
                        </picture>
                    </a>
                    <p className="header-label">{area}</p>
                </header>
                <div className="contents">
                    <RestaurantList restaurants={restaurants} />
                </div> 
                <Footer />
            </>
        )
    }
}

export default AreaPage
