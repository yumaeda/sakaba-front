'use client'

import Link from 'next/link'
import LoadingSpinner from '@/components/UI/LoadingSpinner'

interface ListingPageProps {
  pageTitle: string
  children: React.ReactNode
  error?: Error | null
  loading?: boolean
}

const ListingPage: React.FC<ListingPageProps> = (props) => {
  const { pageTitle, children, error, loading } = props

  if (error) {
    return (
        <>
          <header className="header">
              <p className="header-label">{pageTitle}</p>
              <Link href="/">
                 <span className="list-item">Back</span>
              </Link>
            </header>
            <div className="contents">
               <div>Error: {error.message}</div>
             </div>
           </>
         )
       }

  if (loading) {
    return (
        <>
          <header className="header">
               <p className="header-label">{pageTitle}</p>
               <Link href="/">
                  <span className="list-item">Back</span>
               </Link>
             </header>
             <div className="contents">
                <LoadingSpinner message="Loading..." />
             </div>
           </>
         )
       }

  return (
       <>
          <header className="header">
              <p className="header-label">{pageTitle}</p>
              <Link href="/">
                 <span className="list-item">Back</span>
              </Link>
            </header>
            <div className="contents">
               {children}
             </div>
           </>
         )
}

export default ListingPage
