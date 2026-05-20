/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import Photo from '../interfaces/Photo'

interface Props {
    basePath: string
    photos: Photo[] | null
}

const LatestPhotoList: React.FC<Props> = (props) => {
    const { basePath, photos } = props

    return (
        <div className="latest-image-container">
        {
            photos?.map((photo: Photo, index: number) => (
                <div className="latest-image-wrapper">
                    <picture>
                        <source type="image/webp" media="(min-width: 150px)" srcSet={`${basePath}/images/restaurants/${photo.restaurant_id}/${photo.thumbnail_webp}`} />
                        <img src={`${basePath}/images/restaurants/${photo.restaurant_id}/${photo.thumbnail}`} className="tile-image latest-image" alt={`店舗写真${index}`} />
                    </picture>
                </div>
            ))
        }
        </div>
    )
}

export default LatestPhotoList
