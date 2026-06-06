'use client'

import { useState } from 'react'
import Link from 'next/link'
import { API_URL } from '@/constants/Global'
import AdminRestaurantSelector from '../components/AdminRestaurantSelector'

const PhotoAdminPage: React.FC = () => {
  const [restaurantId, setRestaurantId] = useState<string>('')
  const [files, setFiles] = useState<FileList>()
  const setDisable = (_: boolean) => {}

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

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()

    const token = ''

    if (token === '') {
      alert('Token is expired or invalid!')
      return
     }

    if (files == null || files.length === 0) {
      alert('Please choose files to upload!')
      return
        }

    setDisable(true)
    Array.from(files).forEach((file: File) => {
      getBase64(file).then(base64 => {
        const restaurant_photo = {
          restaurant_id: restaurantId,
          file_content: String(base64),
            }
        const postOptions: RequestInit = {
          method: 'POST',
          headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`,
                 },
          body: JSON.stringify(restaurant_photo),
               }
        fetch(`${API_URL}/auth/photo/`, postOptions)
                 .then(res => res.json())
                 .then(() => {
                   setDisable(false)
                 })
                 .catch(error => {
                   alert(`Error: ${JSON.stringify(error)}`)
                   setDisable(false)
                 })
             })
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
             onFormSubmit={handleSubmit}
             submitButtonText="Upload"
             apiEndpoint={`${API_URL}/auth/photo/`}
                />
                <div>
                  <input className="admin-input" type="file" onChange={handleChange} multiple />
                </div>
              </div>
            </>
          )
}

export default PhotoAdminPage
