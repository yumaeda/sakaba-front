/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { WEB_URL } from '../constants/Global'

interface Props {
    id: string
    area: string
    url: string
    name: string
}

const RestaurantPageLink: React.FC<Props> = (props) => {
    const { id, area, name, url } = props

    return (url == '') ? 
        <a className="shop-name" href={`${WEB_URL}/${area}/${id}`} target="_blank">{name}</a> :
        <a className="shop-name" href={url} rel="nofollow noopener" target="_blank">{name}</a>
}

export default RestaurantPageLink
