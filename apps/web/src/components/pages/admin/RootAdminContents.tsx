import * as React from 'react'
import { Link } from 'react-router-dom'
 
const RootAdminContents: React.FC = () => {
    return (
            <div className="admin-contents">
                <ul>
                    <li><Link to="/admin/menu">メニューを管理</Link></li>
                    <li><Link to="/admin/photo">写真を登録</Link></li>
                    <li><Link to="/admin/restaurant-genre">レストランのジャンルを登録</Link></li>
                    <li><Link to="/admin/restaurant-drink">レストランにお酒を登録</Link></li>
                    <li><Link to="/admin/restaurant">レストランを登録</Link></li>
                </ul>
            </div> 
    )
}

export default RootAdminContents
