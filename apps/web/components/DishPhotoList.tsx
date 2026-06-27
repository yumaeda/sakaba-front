/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
'use client'

import { useState, useEffect } from 'react'
import { API_URL, IMG_URL } from '@/constants/Global'
import WebPImage from './UI/WebPImage'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

// Preload all full-size images so clicking any thumbnail shows instantly
const preloadAllPhotos = (restaurantImageDir: string, photos: any[]) => {
  photos.forEach((photo) => {
    const img = new Image()
    img.src = `${restaurantImageDir}/${photo.image}`
  })
}

interface Props {
  restaurantId: string
}

export default function DishPhotoList({ restaurantId }: Props) {
  const [photos, setPhotos] = useState<any[]>([])
  const [thumbnails, setThumbnails] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [selectedSlideIndex, setSelectedSlideIndex] = useState<number>(0)

  const restaurantImageDir = `${IMG_URL}/images/restaurants/${restaurantId}`

  useEffect(() => {
    fetch(`${API_URL}/photos/${restaurantId}`, {
      headers: {}
     })
       .then(res => res.json())
       .then(data => {
        const photos = JSON.parse(JSON.stringify(data.body))
        setThumbnails(photos?.slice(0, 10) ?? [])
        setPhotos(photos ?? [])
        preloadAllPhotos(restaurantImageDir, photos ?? [])
        setLoading(false)
       }).catch(err => {
      console.error('Failed to fetch photos:', err)
      setLoading(false)
       })
      }, [restaurantId, restaurantImageDir])

  const handleClick = (index: number) => {
    setSelectedSlideIndex(index)
    if (photos.length > 0) {
      setOpen(true)
     }
   }

  if (loading) {
    return (
         <div className="dish-photo-list-link">
           <div className="dish-image-list">
             <div className="loading">写真を読み込んでいます...</div>
           </div>
         </div>
        )
      }

  const slides = photos.map((photo: any) => ({
    src: `${restaurantImageDir}/${photo.image}`,
    alt: photo.name || '店舗写真',
    }))

  return (
        <>
          <div className="dish-photo-list-link">
            <div className="dish-image-list">
              {thumbnails.map((photo: any, index: number) => {
             return (
                   <div key={index} className="dish-image-wrapper" onClick={() => handleClick(index)}>
                     <WebPImage
                    restaurantId={restaurantId}
                    thumbnail={photo.thumbnail}
                    thumbnailWebp={photo.thumbnail_webp}
                    alt={`店舗写真${index}`}
                    className="tile-image dish-image"
                     />
                   </div>
                )
              })}
            </div>
          </div>
          <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={slides}
          index={selectedSlideIndex}
           />
        </>
      )
}
