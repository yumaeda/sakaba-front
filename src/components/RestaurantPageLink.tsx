/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'

interface Props {
    id: string
    area: string
    url: string
    name: string
}

const RestaurantPageLink: React.FC<Props> = (props) => {
    const basePath = 'https://tokyo-takeout.com'
    const { id, area, url, name } = props

    let pageUrl = ''
    if (url == '') {
        pageUrl = `${basePath}/${area}/${atob(id)}`
    }

    return <a className="shop-name" href={pageUrl} rel="nofollow noopener" target="_blank">{name}</a>
}

export default RestaurantPageLink
