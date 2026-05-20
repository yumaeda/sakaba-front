import * as React from 'react'
import { Link } from 'react-router-dom'
import { Restaurant } from '@yumaeda/sakaba-interface'
import RestaurantDropDown from '../../RestaurantDropdown'
import camelcaseKeys = require('camelcase-keys')
import { JWT_KEY } from '../../../constants/CookieKeys'
import { API_URL } from '../../../constants/Global'
import { getCookie } from '../../../utils/CookieUtility'
 
const PhotoAdminPage: React.FC = () => {
    const [token, setToken] = React.useState<string>('')
    const [disable, setDisable] = React.useState(false);
    const [files, setFiles] = React.useState<FileList>()
    const [restaurants, setRestaurants] = React.useState<Restaurant[]>([])
    const [restaurantId, setRestaurantId] = React.useState<string>('')

    React.useEffect(() => {
        setToken(getCookie(JWT_KEY))
        fetch(`${API_URL}/restaurants/`, { headers: {} })
            .then(res => res.json())
            .then(
                (data) => {
                    const tmpRestaurants = camelcaseKeys(JSON.parse(JSON.stringify(data.body)))
                    setRestaurantId(tmpRestaurants[0].id)
                    setRestaurants(tmpRestaurants)
                },
                (error: Error) => {
                    console.dir(error)
                }
            )
    }, [])

    const getBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => resolve(reader.result)
          reader.onerror = error => reject(error)
        })
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files != null) {
            setFiles(event.currentTarget.files)
        }
    }

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRestaurantId(event.currentTarget.value)
    }

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault()

        if (token == '') {
            alert('Token is expired or invalid!')
            return
        }

        if (files == null || files.length == 0) {
            alert('Please choose files to upload!')
            return
        }

        setDisable(true)
        Array.from(files).forEach((file: File) => {
            getBase64(file).then(base64 => {
                const restaurant_photo = {
                    restaurant_id: restaurantId,
                    file_content: String(base64) 
                }
                const postOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(restaurant_photo)
                }
                fetch(`${API_URL}/auth/photo/`, postOptions)
                    .then(res => res.json())
                    .then(data => {
                        console.dir(data)
                    })
                    .catch(error => {
                        alert(`Error: ${JSON.stringify(error)}`)
                    })
            })
        })
    }

    return (
        <>
            <header className="admin-header">
                <h1 className="admin-header-title">{`管理者ページ`}</h1>
                <Link to="/admin/index">Home</Link>
            </header>
            <div className="admin-contents">
                <RestaurantDropDown onSelect={handleSelect} restaurantId={restaurantId} restaurants={restaurants} /><br />
                <div>
                    <input className="admin-input" type="file" onChange={handleChange} multiple />
                    <button className="admin-button" type="submit" onClick={handleSubmit} disabled={disable}>Upload</button>
                </div>
            </div> 
        </>
    )
}

export default PhotoAdminPage
