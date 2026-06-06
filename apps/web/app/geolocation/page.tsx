'use client'

import Link from 'next/link'
import { LATITUDE_KEY, LONGITUDE_KEY } from '@/constants/LocalStorageKeys'
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
          localStorage.setItem(LATITUDE_KEY, position.coords.latitude.toString())
          localStorage.setItem(LONGITUDE_KEY, position.coords.longitude.toString())
         })
        .catch((error: GeolocationPositionError) => {
          handleGeolocationError(error)
         })
    }, [])

  return (
    <>
      <header className="header">
        <p className="header-label">{title}</p>
        <Link href="/"><span className="list-item">Back</span></Link>
      </header>
      <div className="contents">
        <div className="footer">
          <Image src="/images/geolocation.png" alt="Geolocation" width={1000} height={800}style={{ width: '100%', height: 'auto' }} />
        </div>
      </div>
    </>
  )
}

export default GeolocationPage
