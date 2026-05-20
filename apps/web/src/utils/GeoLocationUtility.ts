import { LATITUDE_KEY, LONGITUDE_KEY } from "../constants/LocalStorageKeys"

const DEFAULT_LATITUDE = '35.761921'
const DEFAULT_LONGITUDE = '139.7054278'

const getCurrentPosition = (options?: PositionOptions): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => 
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
    )
}

const getLatitude = (): string => {
    return localStorage.getItem(LATITUDE_KEY) || DEFAULT_LATITUDE
}

const getLongitude = (): string => {
    return localStorage.getItem(LONGITUDE_KEY) || DEFAULT_LONGITUDE
}

const handleGeolocationError = (error: GeolocationPositionError) => {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert(`PERMISSION_DENIED: ${error.message}`)
            break
        case error.POSITION_UNAVAILABLE:
            alert(`POSITION_UNAVAILABLE: ${error.message}`)
            break
        case error.TIMEOUT:
            alert(`TIMEOUT: ${error.message}`)
            break
        default:
            alert('Unknown Error')
    }
}


export { getCurrentPosition, getLatitude, getLongitude, handleGeolocationError }
