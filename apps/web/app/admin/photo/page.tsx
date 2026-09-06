'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import AdminRestaurantSelector from '../components/AdminRestaurantSelector'
import PhotoUploadZone from '../components/PhotoUploadZone'
import usePhotoUpload, { UploadResult } from '@/utils/usePhotoUpload'

const PhotoAdminPage: React.FC = () => {
  const [restaurantId, setRestaurantId] = useState<string>('')
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const {
    progressList,
    isUploading,
    startUpload,
    resetProgress,
  } = usePhotoUpload({
    onUploadComplete: (results: UploadResult[]) => {
      const errors = results.filter(r => !r.success)
      if (errors.length > 0) {
        alert(`Completed with ${errors.length} error(s). Check details below.`)
      } else {
        alert('All photos uploaded successfully!')
      }
    },
    onUploadError: error => {
      console.error('Upload error:', error)
    },
  })

  const handleUpload = useCallback(() => {
    if (selectedFiles && !isUploading && restaurantId) {
      startUpload(selectedFiles, restaurantId)
    }
  }, [selectedFiles, isUploading, restaurantId, startUpload])

  return (
    <>
      <header className="admin-header">
        <h1 className="admin-header-title">{`Photo Upload`}</h1>
        <Link href="/admin/index">Home</Link>
      </header>
      <div className="admin-contents">
        <AdminRestaurantSelector
          onRestaurantSelect={setRestaurantId}
        />
        <PhotoUploadZone
          progressList={progressList}
          isUploading={isUploading}
          onFilesSelected={files => setSelectedFiles(files)}
          onReset={resetProgress}
          accept="image/jpeg,image/png,image/webp"
        />
        <div style={{ marginTop: '16px' }}>
          <button
            className="admin-button"
            onClick={handleUpload}
            disabled={isUploading}
          >
            Upload
          </button>
        </div>
      </div>
    </>
  )
}

export default PhotoAdminPage
