/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { IMG_URL, WEB_URL } from '../../constants/Global'
import { LATITUDE_KEY, LONGITUDE_KEY } from '../../constants/LocalStorageKeys'
import { getCurrentPosition, handleGeolocationError } from '../../utils/GeoLocationUtility'
import Footer from '../Footer'

const GeolocationPage: React.FC = () => {
    const title = 'Geolocation'
    const imageDir = `${IMG_URL}/images`

React.useEffect(() => {
      getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
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
            <a href={`${WEB_URL}/`}>
                <picture className="back-image-container">
                    <source type="image/webp" media="(min-width: 150px)" srcSet={`${imageDir}/back.webp`} />
                    <img src={`${imageDir}/back.png`} className="back-image" alt="Back" />
                </picture>
            </a>
            <p className="header-label">{title}</p>
        </header>
        <div className="contents">
            <p>現在地を更新します。</p>
        </div> 
        <Footer />
    </>
  )
}

export default GeolocationPage
