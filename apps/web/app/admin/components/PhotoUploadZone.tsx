'use client'

import { useState, useCallback, useRef } from 'react'
import { FileUploadProgress } from '@/utils/usePhotoUpload'

interface PhotoUploadZoneProps {
  progressList: FileUploadProgress[]
  isUploading: boolean
  onFilesSelected: (files: FileList) => void
  onReset: () => void
  accept?: string
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const size = parseFloat((bytes / Math.pow(k, i)).toFixed(2))
  return `${size} ${sizes[i]}`
}

const getFileStatusColor = (status: FileUploadProgress['status']): string => {
  switch (status) {
    case 'uploading':
      return '#3b82f6'
    case 'done':
      return '#10b981'
    case 'error':
      return '#ef4444'
    default:
      return '#6b7280'
  }
}

const PhotoUploadZone: React.FC<PhotoUploadZoneProps> = (props) => {
  const {
    progressList,
    isUploading,
    onFilesSelected,
    onReset,
    accept = 'image/jpeg,image/png,image/webp',
  } = props

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleFileInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.currentTarget.files != null && event.currentTarget.files.length > 0) {
        onFilesSelected(event.currentTarget.files)
      }
    },
    [onFilesSelected],
  )

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()
      setIsDragOver(false)
      if (event.dataTransfer.files != null && event.dataTransfer.files.length > 0) {
        onFilesSelected(event.dataTransfer.files)
      }
    },
    [onFilesSelected],
  )

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleButtonClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleReset = useCallback(() => {
    onReset()
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [onReset])

  // Calculate overall progress
  const uploadingCount = progressList.filter(p => p.status === 'uploading').length
  const doneCount = progressList.filter(p => p.status === 'done').length
  const errorCount = progressList.filter(p => p.status === 'error').length
  const totalCount = progressList.length

  const overallProgress =
    totalCount > 0
      ? Math.round(
          progressList.reduce((sum, p) => sum + p.progress, 0) / totalCount,
        )
      : 0

  return (
    <div className="photo-upload-zone">
      {/* Drag & Drop Zone */}
      <div
        className={`upload-zone ${isDragOver ? 'upload-zone--dragover' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="upload-zone__icon">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>
        <p className="upload-zone__title">
          {isUploading ? 'Upload in progress...' : 'Drop photos here or tap below'}
        </p>
        <p className="upload-zone__subtitle">
          Select images from your library
        </p>
        <input
          ref={fileInputRef}
          className="upload-zone__input"
          type="file"
          accept={accept}
          multiple
          onChange={handleFileInputChange}
          disabled={isUploading}
        />
        {!isUploading && (
          <button
            className="upload-zone__button"
            type="button"
            onClick={handleButtonClick}
          >
            Select Files
          </button>
        )}
      </div>

      {/* File List */}
      {progressList.length > 0 && (
        <div className="photo-upload-list">
          <div className="photo-upload-list__header">
            <span>
              {totalCount} file{totalCount !== 1 ? 's' : ''}
              {uploadingCount > 0 && ` · ${uploadingCount} uploading`}
              {doneCount > 0 && ` · ${doneCount} done`}
              {errorCount > 0 && ` · ${errorCount} errors`}
            </span>
            {!isUploading && (
              <button
                className="photo-upload-list__reset"
                type="button"
                onClick={handleReset}
              >
                Clear All
              </button>
            )}
          </div>

          {/* Overall Progress */}
          {isUploading && (
            <div className="photo-upload-progress">
              <div className="photo-upload-progress__bar">
                <div
                  className="photo-upload-progress__fill"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <span className="photo-upload-progress__label">
                Overall: {overallProgress}%
              </span>
            </div>
          )}

          {progressList.map((progress, index) => (
            <div
              key={`${progress.file.name}-${index}`}
              className={`photo-upload-item photo-upload-item--${progress.status}`}
            >
              <div className="photo-upload-item__info">
                <span className="photo-upload-item__name">
                  {progress.file.name}
                </span>
                <span className="photo-upload-item__size">
                  {formatFileSize(progress.file.size)}
                </span>
              </div>

              {/* Per-file progress */}
              {(progress.status === 'uploading' || progress.status === 'done' || progress.status === 'error') && (
                <>
                  <div className="photo-upload-item__bar">
                    <div
                      className="photo-upload-item__fill"
                      style={{
                        width: `${progress.progress}%`,
                        backgroundColor: getFileStatusColor(progress.status),
                      }}
                    />
                  </div>
                  <span
                    className="photo-upload-item__status"
                    style={{ color: getFileStatusColor(progress.status) }}
                  >
                    {progress.status === 'uploading' && `${progress.progress}%`}
                    {progress.status === 'done' && 'Complete'}
                    {progress.status === 'error' && 'Error'}
                  </span>
                </>
              )}

              {/* Error message */}
              {progress.status === 'error' && progress.error && (
                <span className="photo-upload-item__error">
                  {progress.error}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PhotoUploadZone
