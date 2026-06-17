import './globals.css'
import '@/scss/index.scss'
import type { Metadata } from 'next'
import Footer from '../components/Footer'
import { PhotoCacheProvider } from '../components/PhotoCacheContext'

export const metadata: Metadata = {
  title: '酒場 s',
  description: 'Tokyo restaurant takeout platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="body">
        <PhotoCacheProvider>
           {children}
         </PhotoCacheProvider>
        <Footer />
       </body>
     </html>
   )
}
