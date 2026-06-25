/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import Photo from '@/interfaces/Photo'
import WebPImage from './UI/WebPImage'

interface Props {
  photos: Photo[] | null
}

const LatestPhotoList: React.FC<Props> = (props) => {
  const { photos } = props

  return (
            <div className="dish-photo-list-link">
                <div className="latest-photo-list-grid">
                {photos?.map((photo: Photo, index: number) => (
                <div className="dish-image-wrapper" key={index}>
                    <WebPImage
                    restaurantId={photo.restaurant_id}
                    thumbnail={photo.thumbnail}
                    thumbnailWebp={photo.thumbnail_webp}
                    alt={`店舗写真${index}`}
                    className="tile-image dish-image"
                    />
                </div>
                ))}
                </div>
            </div>
        )
}

export default LatestPhotoList
