/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
'use client'

import { useState, useEffect } from 'react'
import { usePhotoCache } from '@/components/PhotoCacheContext'
import Photo from '@/interfaces/Photo'
import { IMG_URL } from '@/constants/Global'
import WebPImage from '@/components/UI/WebPImage'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

interface Props {
  params: Promise<{ restaurant: string }>
}

export default function PhotoAlbumPage({ params }: Props) {
  const { getPhotos } = usePhotoCache()
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [restaurantId, setRestaurantId] = useState('')

  useEffect(() => {
    params.then(async resolvedParams => {
      const restaurantId = resolvedParams.restaurant
      setRestaurantId(restaurantId)
      const photos = await getPhotos(restaurantId)
      setPhotos(photos)
      setLoading(false)
     }).catch(err => {
      console.error('Failed to fetch photos:', err)
      setLoading(false)
     })
     }, [])

  if (loading) {
    return (
      <div className="photo-album-page">
        <div className="photo-album-page-header">
            <h1>店舗写真</h1>
            <p>写真を読み込んでいます...</p>
         </div>
       </div>
       )
     }

  return (
     <PhotoAlbumPageContent restaurantId={restaurantId} photos={photos} />
     )
}

interface PhotoAlbumPageContentProps {
  restaurantId: string
  photos: Photo[]
}

function PhotoAlbumPageContent({ restaurantId, photos }: PhotoAlbumPageContentProps) {
  const [open, setOpen] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)

  const handlePhotoClick = (index: number) => {
    setSlideIndex(index)
    setOpen(true)
     }

  if (photos.length === 0) {
    return (
       <div className="photo-album-page photo-album-page-empty">
         <div className="photo-album-page-header">
           <h1>店舗写真 (0 枚)</h1>
           <p>この店舗の写真はまだありません。</p>
         </div>
       </div>
       )
     }

  const restaurantImageDir = `${IMG_URL}/images/restaurants/${restaurantId}`
  const slides = photos.map((photo: Photo) => ({
    src: `${restaurantImageDir}/${photo.image}`,
    alt: photo.name,
    thumbs: [
         `${restaurantImageDir}/${photo.thumbnail}`,
         `${restaurantImageDir}/${photo.thumbnail_webp}`,
       ],
     }))

  return (
      <div className="photo-album-page">
         <div className="photo-album-page-header">
           <h1>店舗写真 ({photos.length}枚)</h1>
         </div>

         {/* Photo grid */}
         <div className="photo-album-grid">
           {photos.map((photo: Photo, index: number) => (
             <div key={index} className="photo-album-item">
               <button
                onClick={() => handlePhotoClick(index)}
                className="photo-button"
                aria-label={`View photo ${index + 1}`}
               >
                 <WebPImage
                  restaurantId={restaurantId}
                  thumbnail={photo.thumbnail}
                  thumbnailWebp={photo.thumbnail_webp}
                  alt={`店舗写真${index + 1}`}
                  className="tile-image dish-image"
                 />
               </button>
             </div>
           ))}
         </div>

         {/* Lightbox for viewing photos */}
         <Lightbox
          slides={slides}
          open={open}
          close={() => setOpen(false)}
          index={slideIndex}
          on={{
            view: ({ index }) => setSlideIndex(index),
             }}
         />
       </div>
      )
}
