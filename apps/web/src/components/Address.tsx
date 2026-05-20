/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { IMG_URL } from '../constants/Global'

interface Props {
    text: string
    latitude: string
    longitude: string
}

const Address: React.FC<Props> = (props) => {
    const { text, latitude, longitude } = props

    return (
        <>
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`} target="_blank" title={text}>
                <picture>
                    <source type="image/webp" media="(min-width: 150px)" srcSet={`${IMG_URL}/images/map.webp`} />
                    <img src={`${IMG_URL}/images/map.png`} className="map-image" alt="Google Map" />
                </picture>
            </a>
        </>
    )
}

export default Address
