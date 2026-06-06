/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import Photo from '@/interfaces/Photo'
import { API_URL } from '@/constants/Global'
import WebPImage from './UI/WebPImage'

interface Props {
  basePath: string
  restaurantId: string
}

export default async function DishPhotoList(props: Props) {
  const { basePath, restaurantId } = props
  const res = await fetch(`${API_URL}/photos/${restaurantId}`, {
    headers: {}
      })
  const data = await res.json()
  const photos: Photo[] = JSON.parse(JSON.stringify(data.body))

  return (
        <div className="dish-image-list">
          {photos ? (
            photos.map((photo: Photo, index: number) => {
              return (
                     <div key={index} className="dish-image-wrapper">
                       <WebPImage
                        restaurantId={restaurantId}
                        thumbnail={photo.thumbnail}
                        thumbnailWebp={photo.thumbnail_webp}
                        alt={`店舗写真${index}`}
                        linkHref={`${basePath}/images/restaurants/${restaurantId}/${photo.image}`}
                        target="_blank"
                        className="tile-image dish-image"
                          />
                      </div>
                  )
              })
           ) : (
             <div>Loading...</div>
           )}
        </div>
       )
}
