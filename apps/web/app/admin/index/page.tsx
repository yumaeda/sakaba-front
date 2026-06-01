import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getCookie } from '../../../utils/CookieUtility'
import { JWT_KEY } from '../../../constants/CookieKeys'
import { jwtDecode } from 'jwt-decode'
import JwtPayload from '../../../interfaces/JwtPayload'
import { getLatitude, getLongitude } from '../../../utils/GeoLocationUtility'
import { API_URL } from '../../../constants/Global'
import Restaurant from '@yumaeda/sakaba-interface'
import camelcaseKeys from 'camelcase-keys'

export default async function HomeAdminPage() {
  const token = getCookie(JWT_KEY)

  if (!token) {
    redirect('/signin')
   }

  try {
    const decoded: JwtPayload = jwtDecode(token)
    const currentTime = Math.floor(Date.now() / 1000)

    if (!decoded.exp || decoded.exp < currentTime) {
      redirect('/signin')
     }
   } catch {
    redirect('/signin')
    }

  const userId = (decoded.id.split('@')[0] || '') as string
  const latitude = getLatitude()
  const longitude = getLongitude()

  let restaurants: Restaurant[] = []

  if (userId === 'yumaeda') {
    try {
      const res = await fetch(`${API_URL}/restaurants/`, { headers: {} })
      const data = await res.json()
      restaurants = camelcaseKeys(JSON.parse(JSON.stringify(data.body)))
      } catch {
      // Handle error
      }
    }

  return (
     <>
       <header className="admin-header">
         <h1 className="admin-header-title">{`管理者ページ`}</h1>
        </header>
        <div className="admin-contents">
          <h2>管理者ホーム</h2>
          <Link href="/admin/menu">メニューの編集</Link>
          {userId === 'yumaeda' && (
             <>
               <h3>レストラン一覧</h3>
               <ul>
                 {restaurants.map((restaurant: Restaurant) => (
                   <li key={restaurant.id}>{restaurant.name}</li>
                   ))}
               </ul>
             </>
          )}
        </div>
      </>
    )
}
