/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { Navigate } from 'react-router-dom'

const MemberPage: React.FC = () => {

  React.useEffect(() => {
    localStorage.setItem('hideClosedRestaurants', '1')
  }, [])

  return <Navigate to={'/'} />
}

export default MemberPage
