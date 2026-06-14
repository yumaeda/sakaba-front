import { redirect } from 'next/navigation'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { JWT_KEY } from '@/constants/CookieKeys'
import { jwtDecode } from 'jwt-decode'
import JwtPayload from '@/interfaces/JwtPayload'

export default async function HomeAdminPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get(JWT_KEY)?.value

  if (!token) {
    redirect('/signin')
  }

  let decoded: JwtPayload
  try {
    decoded = jwtDecode(token)
    const currentTime = Math.floor(Date.now() / 1000)

    if (!decoded.exp || decoded.exp < currentTime) {
      redirect('/signin')
    }
  } catch {
    redirect('/signin')
  }

  const userId = (decoded.id.split('@')[0] || '') as string
  console.log(`ユーザーID: ${userId}`)

  return (userId !== 'yumaeda') ? (
    <>
      <header className="admin-header">
        <h1 className="admin-header-title">{`管理者ページ`}</h1>
      </header>
      <div className="admin-contents">
        <h2>管理者ホーム</h2>
        <Link href="/admin/menu">メニューの編集</Link>
      </div>
    </>
  ) : (
    <>
      <header className="admin-header">
        <h1 className="admin-header-title">{`管理者ページ`}</h1>
      </header>
      <div className="admin-contents">
        <ul>
            <li><Link href="/admin/menu">メニューを管理</Link></li>
            <li><Link href="/admin/photo">写真を登録</Link></li>
            <li><Link href="/admin/restaurant-genre">レストランのジャンルを登録</Link></li>
            <li><Link href="/admin/restaurant-drink">レストランにお酒を登録</Link></li>
            <li><Link href="/admin/restaurant">レストランを登録</Link></li>
        </ul>
      </div>
    </>
  )
}
