/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import Photo from '@/interfaces/Photo'
import { API_URL } from '@/constants/Global'

interface PhotoCacheContextType {
  getPhotos: (restaurantId: string) => Promise<Photo[]>
  clearCache: () => void
}

interface PhotoCache {
  [restaurantId: string]: {
    photos: Photo[]
    timestamp: number
  }
}

const PHOTO_CACHE_TTL = 5 * 60 * 1000 // 5 minutes cache TTL

const PhotoCacheContext = createContext<PhotoCacheContextType | undefined>(undefined)

interface PhotoCacheProviderProps {
  children: ReactNode
}

export function PhotoCacheProvider({ children }: PhotoCacheProviderProps) {
  const [cache] = useState<PhotoCache>({})

  const getPhotos = useCallback(async (restaurantId: string): Promise<Photo[]> => {
    // Check if we have cached photos for this restaurant
    const cached = cache[restaurantId]
    const now = Date.now()
    
    if (cached && (now - cached.timestamp < PHOTO_CACHE_TTL)) {
      return cached.photos
    }

    // Fetch from API
    const res = await fetch(`${API_URL}/photos/${restaurantId}`, {
      headers: {}
    })
    const data = await res.json()
    const photos: Photo[] = JSON.parse(JSON.stringify(data.body))

    // Update cache
    cache[restaurantId] = {
      photos,
      timestamp: now
    }

    return photos
  }, [cache])

  const clearCache = useCallback(() => {
    // Clear all cached photos
    Object.keys(cache).forEach(key => {
      delete cache[key]
    })
  }, [cache])

  return (
    <PhotoCacheContext.Provider value={{ getPhotos, clearCache }}>
      {children}
    </PhotoCacheContext.Provider>
  )
}

export function usePhotoCache() {
  const context = useContext(PhotoCacheContext)
  if (context === undefined) {
    throw new Error('usePhotoCache must be used within a PhotoCacheProvider')
  }
  return context
}
