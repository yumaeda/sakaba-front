/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'

interface LoadingSpinnerProps {
  message?: string
  className?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = (props) => {
  const { message = 'Loading...', className } = props

  return (
     <div className={className}>
        <div className="loading-spinner"></div>
        <p>{message}</p>
      </div>
    )
}

export default LoadingSpinner
