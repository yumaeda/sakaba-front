/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import HomeAdminPage from './pages/admin/HomeAdminPage'
import MenuAdminPage from './pages/admin/MenuAdminPge'
import PhotoAdminPage from './pages/admin/PhotoAdminPage'
import RestaurantAdminPage from './pages/admin/RestaurantAdminPage'
import RestaurantDrinkAdminPage from './pages/admin/RestaurantDrinkAdminPage'
import RestaurantGenreAdminPage from './pages/admin/RestaurantGenreAdminPage'
import AreaPage from './pages/AreaPage'
import DishRestaurantPage from './pages/DishRestaurantPage'
import DrinkRestaurantPage from './pages/DrinkRestaurantPage'
import GenreRestaurantPage from './pages/GenreRestaurantPage'
import GeolocationPage from './pages/GeolocationPage'
import HomePage from './pages/HomePage'
import MemberPage from './pages/MemberPage'
import RankingPage from './pages/RankingPage'
import RestaurantPage from './pages/RestaurantPage'
import SignInPage from './pages/SignInPage'
import PrivateRoute from './PrivateRoute'
import * as React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const Root: React.FC<{}> = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="geolocation" element={<GeolocationPage />} />
                <Route path="member" element={<MemberPage />} />
                <Route path="signin" element={<SignInPage />} />
                <Route path="admin/index" element={<PrivateRoute><HomeAdminPage /></PrivateRoute>} />
                <Route path="admin/menu" element={<PrivateRoute><MenuAdminPage /></PrivateRoute>} />
                <Route path="admin/photo" element={<PrivateRoute><PhotoAdminPage /></PrivateRoute>} />
                <Route path="admin/restaurant" element={<PrivateRoute><RestaurantAdminPage /></PrivateRoute>} />
                <Route path="admin/restaurant-drink" element={<PrivateRoute><RestaurantDrinkAdminPage /></PrivateRoute>} />
                <Route path="admin/restaurant-genre" element={<PrivateRoute><RestaurantGenreAdminPage /></PrivateRoute>} />
                <Route path="dishes/:id" element={<DishRestaurantPage />} />
                <Route path="drinks/:id" element={<DrinkRestaurantPage />} />
                <Route path="genres/:id" element={<GenreRestaurantPage />} />
                <Route path="ranking" element={<RankingPage />} />
                <Route path=":area/:restaurant" element={<RestaurantPage />} />
                <Route path=":area" element={<AreaPage />} />
            </Routes>
        </Router>
    )
}

export default Root
