/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { Restaurant } from '@yumaeda/sakaba-interface'

interface Props {
    restaurants: Restaurant[]
    restaurantId: string
    onSelect: React.ChangeEventHandler<HTMLSelectElement>
}

const RestaurantDropDown: React.VFC<Props> = props => {
    const { restaurantId, restaurants, onSelect} = props
    if (restaurants.length === 0) {
        return <></>
    }

    return (
        <select onChange={onSelect} value={restaurantId}>
        {
            restaurants ? restaurants.map((restaurant: Restaurant, index: number) => (
                <option value={restaurant.id} key={index}>{restaurant.name}</option>
            )) : ''
        }
        </select>
    )
}
 
export default RestaurantDropDown
 