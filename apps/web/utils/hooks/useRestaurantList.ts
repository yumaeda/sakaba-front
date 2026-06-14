/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import { useState, useEffect } from 'react'
import Restaurant from '@/interfaces/Restaurant'
import camelcaseKeys from 'camelcase-keys'
import { API_URL } from '@/constants/Global'

interface UseRestaurantListOptions {
  latitude: string
  longitude: string
}

interface UseRestaurantListResult {
  restaurants: Restaurant[]
  error: Error | undefined
  loading: boolean
}

export const useRestaurantList = (
  endpoint: string,
  options: UseRestaurantListOptions,
): UseRestaurantListResult => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [error, setError] = useState<Error | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch(
            `${API_URL}/restaurants/${endpoint}/${options.latitude}/${options.longitude}`,
            { headers: {} },
           )
        const data = await res.json()
        setRestaurants(camelcaseKeys(JSON.parse(JSON.stringify(data.body))))
        setError(undefined)
        } catch (e) {
        setError(e as Error)
        setRestaurants([])
        } finally {
        setLoading(false)
        }
      }

    fetchRestaurants()
    }, [endpoint, options.latitude, options.longitude])

  return { restaurants, error, loading }
}

export default useRestaurantList
