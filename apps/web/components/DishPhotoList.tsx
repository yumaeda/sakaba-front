/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
'use client'

import { useState, useEffect } from 'react'
import { usePhotoCache } from './PhotoCacheContext'
import { IMG_URL } from '@/constants/Global'
import WebPImage from './UI/WebPImage'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

interface Props {
  restaurantId: string
}

export default function DishPhotoList({ restaurantId }: Props) {
  const { getPhotos } = usePhotoCache()
  const [photos, setPhotos] = useState<any[]>([])
  const [thumbnails, setThumbnails] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [selectedSlideIndex, setSelectedSlideIndex] = useState<number>(0)

  useEffect(() => {
    getPhotos(restaurantId).then(data => {
      setThumbnails(data?.slice(0, 10) ?? [])
      setPhotos(data ?? [])
      setLoading(false)
       }).catch(err => {
      console.error('Failed to fetch photos:', err)
      setLoading(false)
       })
      }, [restaurantId, getPhotos])

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

  const restaurantImageDir = `${IMG_URL}/images/restaurants/${restaurantId}`
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
