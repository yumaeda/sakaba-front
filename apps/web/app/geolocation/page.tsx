'use client'

import Link from 'next/link'
import { LATITUDE_KEY, LONGITUDE_KEY } from '@/constants/StorageKeys'
import { getCurrentPosition, handleGeolocationError } from '@/utils/GeoLocationUtility'
import { useEffect } from 'react'
import Image from 'next/image'

const GeolocationPage: React.FC = () => {
  const title = 'Geolocation'

  useEffect(() => {
    getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
     })
       .then((position: GeolocationPosition) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem(LATITUDE_KEY, position.coords.latitude.toString())
          localStorage.setItem(LONGITUDE_KEY, position.coords.longitude.toString())
          const maxAge = 3600
          document.cookie = `${LATITUDE_KEY}=${position.coords.latitude.toString()}; max-age=${maxAge}; path=/`
          document.cookie = `${LONGITUDE_KEY}=${position.coords.longitude.toString()}; max-age=${maxAge}; path=/`
         }
        })
       .catch((error: GeolocationPositionError) => {
        handleGeolocationError(error)
        })
   }, [])

  return (
     <>
       <header className="header">
         <p className="header-label">{title}</p>
         <Link href="/">
           <span className="list-item">Back</span>
         </Link>
       </header>
       <div className="contents">
         <div className="footer">
           <Image
            src="/images/geolocation.png"
            alt="Geolocation"
            width={1000}
            height={800}
            style={{ width: '100%', height: 'auto' }}
           />
         </div>
       </div>
     </>
   )
}

export default GeolocationPage
