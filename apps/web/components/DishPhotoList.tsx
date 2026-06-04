/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */

import Photo from '@/interfaces/Photo'
import { API_URL } from '@/constants/Global'

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
                     const restaurantImageDir = `${basePath}/images/restaurants/${restaurantId}`
                     return (
                          <div key={index} className="dish-image-wrapper">
                              <a href={`${restaurantImageDir}/${photo.image}`} target="_blank" rel="noopener noreferrer">
                                  <picture>
                                      <source type="image/webp" media="(min-width: 150px)" srcSet={`${restaurantImageDir}/${photo.thumbnail_webp}`} />
                                      <img src={`${restaurantImageDir}/${photo.thumbnail}`} className="tile-image dish-image" alt={`店舗写真${index}`} />
                                  </picture>
                              </a>
                          </div>
                      )
                  })
             ) : (
                 <div>Loading...</div>
             )}
         </div>
      )
}
