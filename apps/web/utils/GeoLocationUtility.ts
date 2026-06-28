const getCurrentPosition = (options?: PositionOptions): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => 
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
    )
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

export { getCurrentPosition, handleGeolocationError }
