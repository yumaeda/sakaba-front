/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'

interface Props {
    price: number
    isMinPrice: number
}

const MenuPrice: React.FC<Props> = (props) => {
    const { price, isMinPrice } = props
    let priceText = `￥${price.toLocaleString()}`
    if (isMinPrice) {
        priceText = `${priceText}〜`
    }

    return <div className="menu-price-cell">{priceText}</div>
}

export default MenuPrice
