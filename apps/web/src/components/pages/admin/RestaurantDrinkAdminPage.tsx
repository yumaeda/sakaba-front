/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Restaurant } from '@yumaeda/sakaba-interface'
import { JWT_KEY } from '../../../constants/CookieKeys'
import { API_URL } from '../../../constants/Global'
import Drink from '../../../interfaces/Drink'
import { getCookie } from '../../../utils/CookieUtility'
import Dropdown from '../../Dropdown'
import RestaurantDropDown from '../../RestaurantDropdown'
import camelcaseKeys = require('camelcase-keys')
 
const RestaurantDrinkAdminPage: React.FC = () => {
    const [token, setToken] = React.useState<string>('')
    const [drink, setDrink] = React.useState<number>(0)
    const [restaurants, setRestaurants] = React.useState<Restaurant[]>([])
    const [restaurantId, setRestaurantId] = React.useState<string>('')
    const [drinks, setDrinks] = React.useState<Drink[]>([])
 
    React.useEffect(() => {
        setToken(getCookie(JWT_KEY))
        fetch(`${API_URL}/restaurants/`, { headers: {} })
            .then(res => res.json())
            .then(
                (data) => {
                    const tmpRestaurants = camelcaseKeys(JSON.parse(JSON.stringify(data.body)))
                    setRestaurantId(tmpRestaurants[0].id)
                    setRestaurants(tmpRestaurants)
                },
                (error: Error) => {
                    console.dir(error)
                }
            )

        fetch(`${API_URL}/drinks/`, { headers: {} })
            .then(res => res.json())
            .then(
                (data) => {
                    const tmpDrinks = JSON.parse(JSON.stringify(data.body))
                    setDrink(tmpDrinks[0].id)
                    setDrinks(tmpDrinks)
                },
                (error: Error) => {
                    console.dir(error)
                }
            )
    }, [])

    const handleRestaurantSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRestaurantId(event.currentTarget.value)
    }
 
    const handleDrinkSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDrink(Number(event.currentTarget.value))
    }

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault()

        if (token == '') {
            alert('Token is expired or invalid!')
            return
        }

        if (restaurantId === '' || drink === 0) {
            alert('Please fillout the required fields!')
            return
        }

        const restaurant_drink = {
            restaurant_id: restaurantId,
            drink_id: drink.toString()
        }
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(restaurant_drink)
        }
        fetch(`${API_URL}/auth/restaurant-drink/`, postOptions)
            .then((res) => res.json())
            .then((data) => {
                alert(JSON.stringify(data))
            })
        }
 
        return (
            <>
                <header className="admin-header">
                    <h1 className="admin-header-title">{`管理者ページ`}</h1>
                    <Link to="/admin/index">Home</Link>
                </header>
                <div className="admin-contents">
                    <RestaurantDropDown onSelect={handleRestaurantSelect} restaurantId={restaurantId} restaurants={restaurants} /><br />
                    <Dropdown onSelect={handleDrinkSelect} itemId={drink.toString()} items={drinks} useIdAsValue={true} /><br />
                    <div className="admin-footer"> 
                        <button className="admin-button" type="submit" onClick={handleSubmit}>Save</button>
                    </div>
                </div>
            </>
     )
 }
 
 export default RestaurantDrinkAdminPage
 