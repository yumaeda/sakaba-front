'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Restaurant } from '@yumaeda/sakaba-interface'
import camelcaseKeys from 'camelcase-keys'
import { API_URL } from '@/constants/Global'
import { getCookie } from '@/utils/CookieUtility'
import { JWT_KEY } from '@/constants/CookieKeys'
import RestaurantDropDown from '@/components/RestaurantDropdown'

const RestaurantGenreAdminPage: React.FC = () => {
  const [token, setToken] = useState<string>('')
  const [disable, setDisable] = useState(false)
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [restaurantId, setRestaurantId] = useState<string>('')

  useEffect(() => {
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

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRestaurantId(event.currentTarget.value)
     }

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()

    if (token == '') {
      alert('Token is expired or invalid!')
      return
       }

    setDisable(true)

    const postOptions: RequestInit = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          },
      body: JSON.stringify({ restaurant_id: restaurantId }),
         }
    fetch(`${API_URL}/auth/restaurant-genre/`, postOptions)
       .then(res => res.json())
       .then(() => {
         setDisable(false)
         })
       .catch(error => {
         alert(`Error: ${JSON.stringify(error)}`)
         setDisable(false)
         })
     }

  return (
     <>
        <header className="admin-header">
          <h1 className="admin-header-title">{`管理者ページ`}</h1>
          <Link href="/admin/index">Home</Link>
        </header>
        <div className="admin-contents">
           <RestaurantDropDown onSelect={handleSelect} restaurantId={restaurantId} restaurants={restaurants} /><br />
           <button className="admin-button" type="submit" onClick={handleSubmit} disabled={disable}>登録</button>
         </div>
       </>
     )
}

export default RestaurantGenreAdminPage
