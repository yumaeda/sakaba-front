'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const MemberPage: React.FC = () => {
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('hideClosedRestaurants', '1')
      router.push('/')
    }
    }, [])

  return null
}

export default MemberPage
