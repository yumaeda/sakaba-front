'use client'

import { useState } from 'react'
import Link from 'next/link'
import { API_URL } from '@/constants/Global'
import AdminRestaurantSelector from '../components/AdminRestaurantSelector'

const API_ENDPOINT = `${API_URL}/auth/restaurant-drink/`

const RestaurantDrinkAdminPage: React.FC = () => {
  const [restaurantId, setRestaurantId] = useState<string>('')
  const [disable, setDisable] = useState(false)

  const handleSubmit = () => {
    if (disable) return

    setDisable(true)

    const token = ''
    const postOptions: RequestInit = {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`,
         },
      body: JSON.stringify({ restaurant_id: restaurantId }),
         }
    fetch(API_ENDPOINT, postOptions)
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
           <AdminRestaurantSelector
             onRestaurantSelect={setRestaurantId}
             />
           <div style={{ marginTop: '16px' }}>
             <button
               className="admin-button"
               onClick={handleSubmit}
               disabled={disable}
             >
               登録
             </button>
           </div>
          </div>
        </>
        )
}

export default RestaurantDrinkAdminPage
