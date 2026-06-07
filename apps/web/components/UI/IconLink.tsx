/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { IMG_URL } from '@/constants/Global'

interface IconLinkProps {
  href: string
  imagePath: string
  alt: string
  className?: string
  title?: string
  target?: '_blank'
}

const IconLink: React.FC<IconLinkProps> = (props) => {
  const { href, imagePath, alt, className, title, target } = props

  return (
    <a href={href} title={title} target={target} className={className}>
       <picture>
         <source type="image/webp" media="(min-width: 150px)" srcSet={`${IMG_URL}/images/${imagePath}.webp`} />
         <img src={`${IMG_URL}/images/${imagePath}.png`} alt={alt} className="tel-image" />
       </picture>
     </a>
   )
}

export default IconLink
