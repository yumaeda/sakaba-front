/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { IMG_URL } from '@/constants/Global'

interface WebPImageProps {
  restaurantId: string
  thumbnail: string
  thumbnailWebp: string
  alt: string
  className?: string
  linkHref?: string
  target?: '_blank'
}

const WebPImage: React.FC<WebPImageProps> = (props) => {
  const {
    restaurantId,
    thumbnail,
    thumbnailWebp,
    alt,
    className,
    linkHref,
    target,
    } = props

  const restaurantImageDir = `${IMG_URL}/images/restaurants/${restaurantId}`

  const imageElement = (
      <picture>
        <source type="image/webp" media="(min-width: 150px)" srcSet={`${restaurantImageDir}/${thumbnailWebp}`} />
        <img
           src={`${restaurantImageDir}/${thumbnail}`}
           className={className}
           alt={alt}
           />
       </picture>
      )

  if (linkHref) {
    return (
        <a href={linkHref} target={target} rel="noopener noreferrer">
          {imageElement}
        </a>
       )
    }

  return imageElement
}

export default WebPImage
