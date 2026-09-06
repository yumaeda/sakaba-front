'use client'

import { useState, useEffect, useMemo } from 'react'
import Restaurant from '@/interfaces/Restaurant'
import camelcaseKeys from 'camelcase-keys'
import { API_URL } from '@/constants/Global'
import SelectDropdown from '@/components/UI/SelectDropdown'

interface AdminRestaurantSelectorProps {
  onRestaurantSelect: (restaurantId: string) => void
  onFormSubmit?: (event: React.SyntheticEvent) => void
  submitButtonText?: string
  apiEndpoint?: string
}

interface AreaOption {
  id: string
  name: string
}

const AdminRestaurantSelector: React.FC<AdminRestaurantSelectorProps> = (props) => {
  const {
    onRestaurantSelect,
    onFormSubmit,
    submitButtonText = '登録',
    apiEndpoint,
   } = props

  const [disable, setDisable] = useState(false)
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [restaurantId, setRestaurantId] = useState<string>('')
  const [selectedArea, setSelectedArea] = useState<string>('')

  // Extract unique areas from restaurants
  const areas: AreaOption[] = useMemo(() => {
    const areaSet = new Set<string>()
    return restaurants.reduce<AreaOption[]>((acc, restaurant) => {
      if (restaurant.area && !areaSet.has(restaurant.area)) {
        areaSet.add(restaurant.area)
        acc.push({ id: restaurant.area, name: restaurant.area })
      }
      return acc
    }, []).sort((a, b) => a.name.localeCompare(b.name, 'ja'))
  }, [restaurants])

  // Filter restaurants by selected area
  const filteredRestaurants = useMemo(() => {
    if (!selectedArea) return restaurants
    return restaurants.filter(r => r.area === selectedArea)
  }, [restaurants, selectedArea])

  useEffect(() => {
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

  const handleAreaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.currentTarget.value
    setSelectedArea(selected)
    // When area changes, try to select the first restaurant from the filtered list
    const newFilteredRestaurants = selected
      ? restaurants.filter(r => r.area === selected)
      : restaurants
    const firstId = newFilteredRestaurants.length > 0 ? newFilteredRestaurants[0].id : ''
    setRestaurantId(firstId)
    onRestaurantSelect(firstId)
  }

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.currentTarget.value
    setRestaurantId(selectedId)
    onRestaurantSelect(selectedId)
  }

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()

    if (apiEndpoint) {
      const postOptions: RequestInit = {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
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
        <p style={{ marginBottom: '4px', fontWeight: 'bold' }}>エリア</p>
        <SelectDropdown
          items={areas}
          value={selectedArea}
          onChange={handleAreaChange}
          prependDefaultOption={true}
          defaultOptionName='すべて'
         />
          <br />
        <p style={{ marginBottom: '4px', fontWeight: 'bold' }}>店舗</p>
        <SelectDropdown
          items={filteredRestaurants}
          value={restaurantId}
          onChange={handleSelect}
          prependDefaultOption={!selectedArea}
          defaultOptionName='未選択'
         />
          <br />
         <button className="admin-button" type="submit" onClick={handleSubmit} disabled={disable}>
           {submitButtonText}
         </button>
       </>
     )
  }

export default AdminRestaurantSelector
