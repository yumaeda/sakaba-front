/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import { useState, useEffect } from 'react'
import Restaurant from '@/interfaces/Restaurant'
import camelcaseKeys from 'camelcase-keys'
import { API_URL } from '@/constants/Global'
import { getCookie } from '@/utils/CookieUtility'
import { JWT_KEY } from '@/constants/StorageKeys'
import SelectDropdown from '@/components/UI/SelectDropdown'

interface AdminRestaurantSelectorProps {
  onRestaurantSelect: (restaurantId: string) => void
  onFormSubmit?: (event: React.SyntheticEvent) => void
  submitButtonText?: string
  apiEndpoint?: string
}

const AdminRestaurantSelector: React.FC<AdminRestaurantSelectorProps> = (props) => {
  const {
    onRestaurantSelect,
    onFormSubmit,
    submitButtonText = '登録',
    apiEndpoint,
   } = props

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
    const selectedId = event.currentTarget.value
    setRestaurantId(selectedId)
    onRestaurantSelect(selectedId)
   }

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()

    if (token === '') {
      alert('Token is expired or invalid!')
      return
     }

    setDisable(true)

    if (apiEndpoint) {
      const postOptions: RequestInit = {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`,
           },
        body: JSON.stringify({ restaurant_id: restaurantId }),
         }
      fetch(apiEndpoint, postOptions)
          .then(res => res.json())
          .then(() => {
            setDisable(false)
           })
          .catch(error => {
            alert(`Error: ${JSON.stringify(error)}`)
            setDisable(false)
           })
     }

    onFormSubmit?.(event)
   }

  return (
     <>
        <SelectDropdown
         items={restaurants}
         value={restaurantId}
         onChange={handleSelect}
        />
         <br />
         <button className="admin-button" type="submit" onClick={handleSubmit} disabled={disable}>
           {submitButtonText}
         </button>
       </>
     )
}

export default AdminRestaurantSelector
