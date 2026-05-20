/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { Restaurant } from '@yumaeda/sakaba-interface'
import { IMG_URL, WEB_URL } from '../../constants/Global'
import Footer from '../Footer'
import RestaurantList from '../RestaurantList'

interface IProps {
    title: string
    error?: Error
    restaurants: Restaurant[]
}

const BaseRestaurantPage: React.FC<IProps> = (props) => {
    const { title, error, restaurants } = props
    const imageDir = `${IMG_URL}/images`

    React.useEffect(() => {
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
                    <p className="header-label">{title}</p>
                </header>
                <div className="contents">
                    <RestaurantList restaurants={restaurants} />
                </div> 
                <Footer />
            </>
        )
    }
}

export default BaseRestaurantPage
