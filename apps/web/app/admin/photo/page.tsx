'use client'

import { useState } from 'react'
import Link from 'next/link'
import AdminRestaurantSelector from '../components/AdminRestaurantSelector'

const PhotoAdminPage: React.FC = () => {
  const [files, setFiles] = useState<FileList>()
  const [restaurantId, setRestaurantId] = useState<string>('')
  const [disable, setDisable] = useState<boolean>(false)

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

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    if (disable) return

    if (files == null || files.length === 0) {
      alert('Please choose files to upload!')
      setDisable(false)
      return
    }

    setDisable(true)
    Array.from(files).forEach((file: File) => {
      getBase64(file).then(base64 => {
        const restaurant_photo = {
          restaurant_id: restaurantId,
          file_content: String(base64),
        }
        fetch('/api/auth/photo/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(restaurant_photo),
        })
          .then(res => res.json())
          .then(data => {
            console.dir(data)
          })
          .catch(error => {
            alert(`Error: ${JSON.stringify(error)}`)
          })
          .finally(() => {
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
        />
        <br />
        <div>
          <input className="admin-input" type="file" onChange={handleChange} multiple />
        </div>
      </div>
    </>
  )
}

export default PhotoAdminPage
