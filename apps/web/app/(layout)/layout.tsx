import './globals.css'
import type { Metadata } from 'next'
import Footer from '../../components/Footer'

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
      <body>
        {children}
        <Footer />
      </body>
    </html>
  )
}
