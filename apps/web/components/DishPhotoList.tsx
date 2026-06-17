/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
'use client'

import { useState, useEffect } from 'react'
import { usePhotoCache } from './PhotoCacheContext'
import WebPImage from './UI/WebPImage'

interface Props {
  restaurantId: string
  area: string
}

export default function DishPhotoList({ restaurantId, area }: Props) {
  const { getPhotos } = usePhotoCache()
  const [photos, setPhotos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPhotos(restaurantId).then(data => {
      setPhotos(data?.slice(0, 10) ?? [])
      setLoading(false)
    }).catch(err => {
      console.error('Failed to fetch photos:', err)
      setLoading(false)
    })
   }, [restaurantId, getPhotos])

  if (loading) {
    return (
       <a href={`/${area}/${restaurantId}/photo-album`} className="dish-photo-list-link" target="_blank" rel="noopener noreferrer">
         <div className="dish-image-list">
           <div className="loading">写真を読み込んでいます...</div>
         </div>
       </a>
     )
   }

  return (
     <a href={`/${area}/${restaurantId}/photo-album`} className="dish-photo-list-link" target="_blank" rel="noopener noreferrer">
       <div className="dish-image-list">
         {photos.map((photo: any, index: number) => {
           return (
              <div key={index} className="dish-image-wrapper">
                <WebPImage
                  restaurantId={restaurantId}
                  thumbnail={photo.thumbnail}
                  thumbnailWebp={photo.thumbnail_webp}
                  alt={`店舗写真${index}`}
                  target="_blank"
                  className="tile-image dish-image"
                />
              </div>
           )
         })}
       </div>
     </a>
   )
}
