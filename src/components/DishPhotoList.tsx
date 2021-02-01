/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { FixedSizeList } from 'react-window'
import Photo from '../interfaces/Photo'

interface Props {
    basePath: string
    restaurantId: string
    photos?: Photo[]
}

interface ColumnStyle {
    index: number
    style: React.CSSProperties
    data: Props
}

const Column: React.FC<ColumnStyle> = (props) => {
    const { data, index, style } = props
    const restaurantImageDir = `${data.basePath}/images/restaurants/${data.restaurantId}`
    const photo = data.photos ? data.photos.filter((photo: Photo) => atob(photo.restaurant_id) == data.restaurantId)[index] : null

    return photo ? (
        <div className="dish-image-container" style={style} key={index}>
            <div className="dish-image-wrapper">
                <a href={`${restaurantImageDir}/${photo.image}`} target="_blank" key={`${data.restaurantId}_${index}`}>
                    <picture>
                        <source type="image/webp" media="(min-width: 150px)" srcSet={`${restaurantImageDir}/${photo.thumbnail_webp}`} />
                        <img src={`${restaurantImageDir}/${photo.thumbnail}`} className="dish-image" alt={`店舗写真${index}`} />
                    </picture>
                </a>
            </div>
        </div>
    ) : <div></div> 
}

const DishPhotoList: React.FC<Props> = (props) => {
    const { basePath, restaurantId, photos } = props

    return (
        <FixedSizeList
            height={170}
            itemCount={photos ? photos.length : 0}
            itemSize={200}
            layout="horizontal"
            width={810}
            itemData={{ photos, restaurantId, basePath }}>
            {Column}
        </FixedSizeList>
    )
}

export default DishPhotoList
