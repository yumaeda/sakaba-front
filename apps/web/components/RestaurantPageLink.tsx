/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import Link from 'next/link'

interface Props {
    id: string
    area: string
    url: string
    name: string
}

const RestaurantPageLink: React.FC<Props> = (props) => {
    const { id, area, name, url } = props

    return (url == '') ? 
        <Link className="shop-name" href={`/${area}/${id}`} target="_blank">{name}</Link> :
        <Link className="shop-name" href={url} rel="nofollow noopener" target="_blank">{name}</Link>
}

export default RestaurantPageLink
