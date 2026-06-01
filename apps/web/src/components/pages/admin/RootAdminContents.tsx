import * as React from 'react'
import Link from 'next/link'

const RootAdminContents: React.FC = () => {
  return (
             <div className="admin-contents">
                 <ul>
                     <li><Link href="/admin/menu">メニューを管理</Link></li>
                     <li><Link href="/admin/photo">写真を登録</Link></li>
                     <li><Link href="/admin/restaurant-genre">レストランのジャンルを登録</Link></li>
                     <li><Link href="/admin/restaurant-drink">レストランにお酒を登録</Link></li>
                     <li><Link href="/admin/restaurant">レストランを登録</Link></li>
                 </ul>
             </div>
         )
}

export default RootAdminContents
