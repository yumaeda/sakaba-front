/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import { useState, useEffect } from 'react'

export const useAsyncData = <T>(fetcher: () => Promise<T>, dependencies: any[] = []): { data: T | null; error: Error | null; loading: boolean } => {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetcher()
        setData(result)
        setError(null)
      } catch (e) {
        setError(e as Error)
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, dependencies)

  return { data, error, loading }
}

export default useAsyncData
