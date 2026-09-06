import { useState, useCallback, useRef, useEffect } from 'react'

export interface FileUploadProgress {
  file: File
  progress: number // 0 - 100
  status: 'pending' | 'uploading' | 'done' | 'error'
  error?: string
}

export interface UsePhotoUploadOptions {
  onUploadComplete?: (results: UploadResult[]) => void
  onUploadError?: (error: Error) => void
}

export interface UploadResult {
  file: File
  success: boolean
  error?: string
}

interface UsePhotoUploadReturn {
  progressList: FileUploadProgress[]
  isUploading: boolean
  startUpload: (files: FileList | File[], restaurantId: string) => void
  resetProgress: () => void
  updateStatus: (file: File, status: FileUploadProgress['status'], error?: string) => void
}

const usePhotoUpload = (options: UsePhotoUploadOptions): UsePhotoUploadReturn => {
  const { onUploadComplete, onUploadError } = options
  const [progressList, setProgressList] = useState<FileUploadProgress[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const abortRef = useRef<Map<File, AbortController>>(new Map())
  // Track which files have reached a terminal state, so polling reads live data
  const filesDoneRef = useRef<Set<File>>(new Set())

  const updateStatus = useCallback(
    (file: File, status: FileUploadProgress['status'], error?: string) => {
      const terminal = status === 'done' || status === 'error'
      if (terminal) {
        filesDoneRef.current.add(file)
      }
      setProgressList(prev =>
        prev.map(p =>
          p.file === file ? { ...p, status, error: error ?? p.error } : p
        ),
      )
    },
    [],
  )

  const startUpload = useCallback(
    async (files: FileList | File[], restaurantId: string) => {
      const fileArray = Array.from(files ?? [])
      if (fileArray.length === 0) return

      setIsUploading(true)
      abortRef.current.clear()
      filesDoneRef.current.clear()

      const initialProgress: FileUploadProgress[] = fileArray.map(file => ({
        file,
        progress: 0,
        status: 'pending' as const,
      }))

      setProgressList(initialProgress)

      const results: UploadResult[] = []

      for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i]

        // Mark as uploading
        setProgressList(prev =>
          prev.map(p =>
            p.file === file ? { ...p, status: 'uploading' as const, progress: 0 } : p
          )
        )

        try {
          // Convert to base64
          updateStatus(file, 'uploading')
          const fileContent = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(String(reader.result))
            reader.onerror = reject
          })

          // Use XMLHttpRequest for progress tracking
          const xhr = new XMLHttpRequest()
          const controller = new AbortController()
          abortRef.current.set(file, controller)

          const uploadPayload = JSON.stringify({
            file_content: fileContent,
            restaurant_id: restaurantId,
          })

          xhr.open('POST', '/api/auth/photo')
          xhr.setRequestHeader('Content-Type', 'application/json')

          // Progress tracking
          xhr.upload.onprogress = (e: ProgressEvent) => {
            if (e.lengthComputable) {
              const percent = Math.round((e.loaded / e.total) * 100)
              setProgressList(prev =>
                prev.map(p =>
                  p.file === file ? { ...p, progress: percent } : p
                )
              )
            }
          }

          xhr.onload = () => {
            try {
              const response = JSON.parse(xhr.responseText)
              if (xhr.status >= 200 && xhr.status < 300) {
                updateStatus(file, 'done')
                results.push({ file, success: true })
              } else {
                const errorMsg =
                  (response as { error?: string })?.error ||
                  `Upload failed with status ${xhr.status}`
                updateStatus(file, 'error', errorMsg)
                results.push({ file, success: false, error: errorMsg })
              }
            } catch {
              updateStatus(file, 'error', 'Failed to parse response')
              results.push({
                file,
                success: false,
                error: 'Failed to parse response',
              })
            }
          }

          xhr.onerror = () => {
            const errorMsg = 'Network error occurred'
            updateStatus(file, 'error', errorMsg)
            onUploadError?.(new Error(errorMsg))
            results.push({
              file,
              success: false,
              error: errorMsg,
            })
          }

          xhr.ontimeout = () => {
            const errorMsg = 'Upload timed out'
            updateStatus(file, 'error', errorMsg)
            onUploadError?.(new Error(errorMsg))
            results.push({ file, success: false, error: errorMsg })
          }

          xhr.timeout = 60000 // 60 second timeout

          xhr.send(uploadPayload)
        } catch (error: unknown) {
          const errorMsg =
            error instanceof Error ? error.message : 'Unknown error occurred'
          updateStatus(file, 'error', errorMsg)
          onUploadError?.(new Error(errorMsg))
          results.push({ file, success: false, error: errorMsg })
        }
      }

      // Poll until all uploads reach a terminal state
      const checkComplete = setInterval(() => {
        const doneCount = filesDoneRef.current.size
        if (doneCount >= fileArray.length) {
          clearInterval(checkComplete)
          setIsUploading(false)
          onUploadComplete?.(results)
        }
      }, 500)
    },
    [onUploadComplete, updateStatus]
  )

  const resetProgress = useCallback(() => {
    // Abort any in-flight uploads
    abortRef.current.forEach(controller => {
      controller.abort()
    })
    abortRef.current.clear()
    filesDoneRef.current.clear()
    setProgressList([])
    setIsUploading(false)
  }, [])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      abortRef.current.forEach(controller => {
        controller.abort()
      })
    }
  }, [])

  return {
    progressList,
    isUploading,
    startUpload,
    resetProgress,
    updateStatus,
  }
}

export default usePhotoUpload
